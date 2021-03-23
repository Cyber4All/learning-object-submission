import { Request, Router } from "express";
import proxy = require("express-http-proxy");
import { Controller } from "../../interfaces/Controller";
import * as querystring from 'querystring';

const CART_API = process.env.CART_API || 'localhost:3006';

export class LibraryServiceController implements Controller {
    buildRouter(): Router {
        const router = Router();

        // Routes go here
        router.get(
            '/learning-objects/metrics',
            this.proxyRequest((req: Request) => '/learning-objects/metrics')
        );
        router.get(
            '/users/:username/learning-objects/:cuid/metrics',
            this.proxyRequest((req: Request) => `/users/${encodeURIComponent(req.params.username)}/learning-objects/${encodeURIComponent(req.params.cuid)}/metrics`)
        );
        router.get(
            '/:username/library/learning-objects',
            this.proxyRequest((req: Request) => `/users/${encodeURIComponent(req.params.username)}/library/learning-objects?${querystring.stringify(req.query)}`)
        );
        router.delete(
            '/:username/library/learning-objects/:cuid',
            this.proxyRequest((req: Request) => `/users/${encodeURIComponent(req.params.username)}/library/learning-objects/${encodeURIComponent(req.params.cuid)}?${querystring.stringify(req.query)}`)
        );
        router.post(
            '/:username/library/learning-objects',
            this.proxyRequest((req: Request) => `/users/${encodeURIComponent(req.params.username)}/library/learning-objects`)
        );

        return router;
    }

    private proxyRequest(callback: Function) {
        return proxy(CART_API, {
            proxyReqPathResolver: req => {
                return callback(req);
            },
        });
    }
}