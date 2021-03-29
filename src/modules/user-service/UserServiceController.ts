import { Router, Request } from "express";
import proxy = require("express-http-proxy");
import { Controller } from "../../interfaces/Controller";
import * as querystring from 'querystring';
import { ADMIN_MAILER_ROUTES, ADMIN_USER_ROUTES, STATS_ROUTE, USER_ROUTES } from "../../routes";
import { SocketInteractor } from "../../interactors/SocketInteractor";

const USERS_API = process.env.USERS_API || 'localhost:4000';

export class UserServiceController implements Controller {
    buildRouter(): Router {
        const router = Router();

        // Routes go here

        // GUIDELINE ROLES
        router.route('/guidelines/members').get(this.proxyRequest((req: Request) => `/guidelines/members`));

        router.route('/guidelines/members/:memberId').put(this.proxyRequest((req: Request) => `/guidelines/members/${encodeURIComponent(req.params.memberId)}`));

        router.route('/guidelines/members/:memberId').delete(this.proxyRequest((req: Request) => `/guidelines/members/${encodeURIComponent(req.params.memberId)}`));

        router.get('/users/identifiers/active', this.proxyRequest((req: Request) => `/users/identifiers/active?${querystring.stringify(req.query)}`));

        router.get('/users/curators/:collection', this.proxyRequest((req: Request) => USER_ROUTES.FETCH_COLLECTION_CURATORS(req.params.collection)));

        router.post('/users/password', this.proxyRequest((req: Request) => `/users/password`));

        router.get('/users/update', this.proxyRequest((req: Request) => `/users/update?${querystring.stringify(req.query)}`));

        router.get('/collections/:collectionName/members', this.proxyRequest((req: Request) => ADMIN_USER_ROUTES.FETCH_COLLECTION_MEMBERS(req.params.collectionName, req.query)));

        router.put('/collections/:collectionName/members/:memberId', this.proxyRequest((req: Request) => ADMIN_USER_ROUTES.ASSIGN_COLLECTION_MEMBERSHIP(req.params.collectionName, req.params.memberId)));

        router.patch('/collections/:collectionName/members/:memberId', this.proxyRequest((req: Request) => ADMIN_USER_ROUTES.EDIT_COLLECTION_MEMBERSHIP(req.params.collectionName, req.params.memberId)));

        router.delete('/collections/:collectionName/members/:memberId', this.proxyRequest((req: Request) => ADMIN_USER_ROUTES.REMOVE_COLLECTION_MEMBERSHIP(req.params.collectionName, req.params.memberId)));

        // Welcome page
        router.route('/users')
            .get(this.proxyRequest((req: Request) => '/users'))
            // Register
            .post(this.proxyRequest((req: Request) => '/users'))
            .patch(this.proxyRequest((req: Request) => '/users'));
        
        router.get('/users/stats', this.proxyRequest((req: Request) => STATS_ROUTE.USER_STATS));
        
        // Login
        router.post('/users/tokens', this.proxyRequest((req: Request) => '/users/tokens'));

        router.get('/users/:id/tokens', this.proxyRequest((req: Request) => `/users/${req.params.id}/tokens?${querystring.stringify(req.query)}`));

        router.route('/users/:username/profile').get(this.proxyRequest((req: Request) => `/users/${req.params.username}/profile`));

        // refresh token
        router.get('/users/tokens/refresh', this.proxyRequest((req: Request) => '/users/tokens/refresh'));

        // Remove account
        router.route('/users/:username').delete(this.proxyRequest((req: Request) => `/users/${encodeURIComponent(req.params.username)}`));

        // Get organizations for typeahead
        router.route('/users/organizations').get(this.proxyRequest((req: Request) => `/users/organizations?${querystring.stringify(req.query)}`));

        // Validate Token
        router.route('/users/tokens').get(this.proxyRequest((req: Request) => `/users/tokens`));
        
        // Logout
        router.delete('/users/:username/tokens', this.proxyRequest((req: Request) => `/users/${encodeURIComponent(req.params.username)}/tokens`));

        router.route('/users/ota-codes').all(
            this.proxyRequestWithDecorator(
                (req: Request) => `/users/ota-codes?${querystring.stringify(req.query)}`,
                (proxyRes: any, proxyResData: any, userReq: any, userRes: any) => {
                    try {
                        let data = JSON.parse(proxyResData.toString('utf8'));
                        if (data.username) {
                            SocketInteractor.init().sendMessage(
                                data.username,
                                'VERIFIED_EMAIL',
                            );
                            userRes.redirect('http://clark.center');
                            return '';
                        } else {
                            return proxyResData;
                        }
                    } catch (e) {
                        return proxyResData;
                    }
                })
        );

        router.get('/users/search', this.proxyRequest((req: Request) => `/users?${querystring.stringify(req.query)}`));

        router.get('/validate-captcha', this.proxyRequest((req: Request) => `/validate-captcha?${querystring.stringify(req.query)}`));

        router.get('/users/:username/notifications', this.proxyRequest((req: Request) => `/users/${encodeURIComponent(req.params.username)}/notifications`));

        router.get('/users/:id/roles', this.proxyRequest((req: Request) => ADMIN_USER_ROUTES.FETCH_USER_ROLES(req.params.id)));

        router.get('/users/:username', this.proxyRequest((req: Request) => USER_ROUTES.FETCH_USER(req.params.username)));

        // User Routes
        router.get('/users', this.proxyRequest((req: Request) => ADMIN_USER_ROUTES.FETCH_USERS_WITH_FILTER(req.query)));

        router.delete('/users/:id', this.proxyRequest((req: Request) => ADMIN_USER_ROUTES.DELETE_USER(req.params.id)));

        // Mailer Routes
        router.post('/admin/mail', this.proxyRequest((req: Request) => ADMIN_MAILER_ROUTES.SEND_BASIC_EMAIL));

        router.route('/admin/mail/templates')
            .get(this.proxyRequest((req: Request) => ADMIN_MAILER_ROUTES.GET_AVAILABLE_TEMPLATES))
            .post(this.proxyRequest((req: Request) => ADMIN_MAILER_ROUTES.SEND_TEMPLATE_EMAIL));

        return router;
    }

    private proxyRequest(callback: Function) {
        return proxy(USERS_API, {
            proxyReqPathResolver: req => {
                return callback(req);
            },
        });
    }

    private proxyRequestWithDecorator(callback: Function, decorator: Function) {
        return proxy(USERS_API, {
            proxyReqPathResolver: req => {
                return callback(req);
            },
            userResDecorator: (proxyRes, proxyResData, userReq, userRes) => decorator(proxyRes, proxyResData, userReq, userRes)
        });
    }
}