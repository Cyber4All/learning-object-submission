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

        /**
         * @swagger
         * /guidelines/members:
         *  get:
         *      description: Gets users with mapper access group
         *      tags:
         *          - User Service
         *      responses:
         *          200:
         *              description: Gets a list of mappers
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: array
         *                          items:
         *                              $ref: '#/components/schemas/User'
         *          401:
         *              description: UNAUTHENTICATED - User not logged in
         *          403:
         *              description: UNAUTHORIZED - User not an admin
         */
        router.route('/guidelines/members').get(this.proxyRequest((req: Request) => `/guidelines/members`));

        /**
         * @swagger
         * /guidelines/members/{memberId}:
         *  put:
         *      description: Adds a new mapper
         *      tags:
         *          - User Service
         *      parameters:
         *          - in: path
         *            name: memberId
         *            schema:
         *                type: string
         *            required: true
         *            description: The id of the user to give mapper privileges to
         *      responses:
         *          201:
         *              description: CREATED
         *          400:
         *              description: BAD REQUEST - User already has the mapper privilege
         *          401:
         *              description: UNAUTHENTICATED - User not logged in
         *          403:
         *              description: UNAUTHORIZED - User not an admin
         *          404:
         *              description: NOT FOUND - User not found
         */
        router.route('/guidelines/members/:memberId').put(this.proxyRequest((req: Request) => `/guidelines/members/${encodeURIComponent(req.params.memberId)}`));

        /**
         * @swagger
         * /guidelines/members/{memberId}:
         *  delete:
         *      description: Removes the mapper privilege of a user
         *      tags:
         *          - User Service
         *      parameters:
         *          - in: path
         *            name: memberId
         *            schema:
         *                type: string
         *            required: true
         *            description: The id of the user to revoke privileges of
         *      responses:
         *          204:
         *              description: NO CONTENT
         *          400:
         *              description: BAD REQUEST - The user doesn't have the mapper privilege
         *          401:
         *              description: UNAUTHENTICATED - User not logged in
         *          403:
         *              description: UNAUTHORIZED - User not an admin
         *          404:
         *              description: NOT FOUND - User not found
         */
        router.route('/guidelines/members/:memberId').delete(this.proxyRequest((req: Request) => `/guidelines/members/${encodeURIComponent(req.params.memberId)}`));

        /**
         * @swagger
         * /users/identifiers/active:
         *  get:
         *      description: Checks if a current user is using a username
         *      tags:
         *          - User Service
         *      parameters:
         *          - in: query
         *            name: username
         *            schema:
         *                type: string
         *            required: true
         *            description: The username to check if in use
         *      responses:
         *          200:
         *              description: OK
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         *                          properties:
         *                              inUse:
         *                                  type: boolean
         *                                  description: True if username is in use, false otherwise
         *                                  example: true
         *                                  required: true
         */
        router.get('/users/identifiers/active', this.proxyRequest((req: Request) => `/users/identifiers/active?${querystring.stringify(req.query)}`));

        /**
         * @swagger
         * /users/curators/{collection}:
         *  get:
         *      description: Gets curators for a collection
         *      tags:
         *          - User Service
         *      parameters:
         *          - in: path
         *            name: collection
         *            schema:
         *                type: string
         *            required: true
         *            description: The collection
         *      responses:
         *          200:
         *             description: Gets a list of curators for a collection
         *             content:
         *                  application/json:
         *                      schema:
         *                          type: array
         *                          items:
         *                              $ref: '#/components/schemas/User'
         *          404:
         *              description: NOT FOUND - Collection not found
         */
        router.get('/users/curators/:collection', this.proxyRequest((req: Request) => USER_ROUTES.FETCH_COLLECTION_CURATORS(req.params.collection)));

        /**
         * @swagger
         * /users/password:
         *  post:
         *      description: Check if password matches
         *      tags:
         *          - User Service
         *      requestBody:
         *          description: The typed password
         *          required: true
         *          content:
         *              application/json:
         *                  schema:
         *                      type: object
         *                      properties:
         *                          password:
         *                              type: string
         *                              description: The user typed password
         *                              example: M0ckPa$$word
         *                              required: true
         *      responses:
         *          200:
         *              description: OK
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         *                          properties:
         *                              isMatch:
         *                                  type: boolean
         *                                  description: True if the username matches the provided password, false otherwise
         *                                  example: true
         *                                  required: true
         */
        router.post('/users/password', this.proxyRequest((req: Request) => `/users/password`));

        /**
         * @swagger
         * /users/update:
         *  get:
         *      description: Gets a user's information
         *      tags:
         *          - User Service
         *      parameters:
         *          - in: query
         *            name: username
         *            schema:
         *                type: string
         *            required: true
         *            description: The user's username
         *      responses:
         *          200:
         *              description: OK
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         *                          $ref: '#/components/schemas/User'
         */
        router.get('/users/update', this.proxyRequest((req: Request) => `/users/update?${querystring.stringify(req.query)}`));

        /**
         * @swagger
         * /collections/{collectionName}/members:
         *  get:
         *      description: Gets a list of collection reviewers
         *      tags:
         *          - User Service
         *      parameters:
         *          - in: path
         *            name: collectionName
         *            schema:
         *                type: string
         *            required: true
         *            description: The collection's name
         *      responses:
         *          200:
         *              description: OK
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: array
         *                          items:
         *                              $ref: '#/components/schemas/User'
         */
        router.get('/collections/:collectionName/members', this.proxyRequest((req: Request) => ADMIN_USER_ROUTES.FETCH_COLLECTION_MEMBERS(req.params.collectionName, req.query)));

        /**
         * @swagger
         * /collections/{collectionName}/members/{memberId}:
         *  put:
         *      description: Assign a reviewer to a collection
         *      tags:
         *          - User Service
         *      parameters:
         *          - in: path
         *            name: collectionName
         *            schema:
         *                type: string
         *            required: true
         *            description: The collection's name
         *          - in: path
         *            name: memberId
         *            schema:
         *                type: string
         *            required: true
         *            description: The id of the user
         *      responses:
         *          200:
         *              description: OK
         *          401:
         *              description: UNAUTHENTICATED - User not logged in
         *          403:
         *              description: UNAUTHORIZED - User not an admin or collection curator
         *          404:
         *              description: NOT FOUND - User or collection not found
         */
        router.put('/collections/:collectionName/members/:memberId', this.proxyRequest((req: Request) => ADMIN_USER_ROUTES.ASSIGN_COLLECTION_MEMBERSHIP(req.params.collectionName, req.params.memberId)));

        /**
         * @swagger
         * /collections/{collectionName}/members/{memberId}:
         *  patch:
         *      description: Edits a reviewer's privilege in a collection
         *      tags:
         *          - User Service
         *      parameters:
         *          - in: path
         *            name: collectionName
         *            schema:
         *                type: string
         *            required: true
         *            description: The collection's name
         *          - in: path
         *            name: memberId
         *            schema:
         *                type: string
         *            required: true
         *            description: The id of the user
         *      responses:
         *          200:
         *              description: OK
         *          401:
         *              description: UNAUTHENTICATED - User not logged in
         *          403:
         *              description: UNAUTHORIZED - User not an admin or collection curator
         *          404:
         *              description: NOT FOUND - User or collection not found
         */
        router.patch('/collections/:collectionName/members/:memberId', this.proxyRequest((req: Request) => ADMIN_USER_ROUTES.EDIT_COLLECTION_MEMBERSHIP(req.params.collectionName, req.params.memberId)));

        /**
         * @swagger
         * /collections/{collectionName}/members/{memberId}:
         *  delete:
         *      description: Removes a reviewer's privilege in a collection
         *      tags:
         *          - User Service
         *      parameters:
         *          - in: path
         *            name: collectionName
         *            schema:
         *                type: string
         *            required: true
         *            description: The collection's name
         *          - in: path
         *            name: memberId
         *            schema:
         *                type: string
         *            required: true
         *            description: The id of the user
         *      responses:
         *          200:
         *              description: OK
         *          401:
         *              description: UNAUTHENTICATED - User not logged in
         *          403:
         *              description: UNAUTHORIZED - User not an admin or collection curator
         *          404:
         *              description: NOT FOUND - User or collection not found
         */
        router.delete('/collections/:collectionName/members/:memberId', this.proxyRequest((req: Request) => ADMIN_USER_ROUTES.REMOVE_COLLECTION_MEMBERSHIP(req.params.collectionName, req.params.memberId)));

        /**
         * @swagger
         * /users:
         *  get:
         *      description: Gets an array of users
         *      tags:
         *          - User Service
         *      responses:
         *          200:
         *              description: OK
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         *                          properties:
         *                              users:
         *                                  type: array
         *                                  required: true
         *                                  description: An array of user objects
         *                                  items:
         *                                      $ref: '#/components/schemas/User'
         *                              total:
         *                                  type: number
         *                                  required: true
         *                                  example: 10
         *                                  description: The total number of users
         *  post:
         *      description: Creates a user
         *      tags:
         *          - User Service
         *      requestBody:
         *          required: true
         *          content:
         *              application/json:
         *                  schema:
         *                      type: object
         *                      $ref: '#/components/schemas/UserBody'
         *      responses:
         *          200:
         *              description: OK
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         *                          properties:
         *                              user:
         *                                  type: object
         *                                  $ref: '#/components/schemas/UserBody'
         *                              tokens:
         *                                  type: object
         *                                  properties:
         *                                      bearer:
         *                                          type: string
         *                                          required: true
         *                                          description: Bearer token
         *                                      openId:
         *                                          type: string
         *                                          required: true
         *                                          description: The cognito id
         *                                      user:
         *                                          type: object
         *                                          $ref: '#/components/schemas/UserBody'
         *  patch:
         *      description: Edits a user's info
         *      tags:
         *          - User Service
         *      requestBody:
         *          required: true
         *          content:
         *              application/json:
         *                  schema:
         *                      type: object
         *                      $ref: '#/components/schemas/UserBody'
         *      responses:
         *          200:
         *              description: OK
         */
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