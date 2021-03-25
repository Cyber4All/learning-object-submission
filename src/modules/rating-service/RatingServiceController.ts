import { Request, Router } from "express";
import proxy = require("express-http-proxy");
import { Controller } from "../../interfaces/Controller";

const RATING_API = process.env.RATING_API || 'localhost:3004';

export class RatingServiceController implements Controller {
    buildRouter(): Router {
        const router = Router();

        // GET RATINGS FOR LEARNING OBJECT
        router.route('/users/:username/learning-objects/:CUID/version/:version/ratings').get(
            this.proxyRequest((req: Request) => `/users/${encodeURIComponent(req.params.username)}/learning-objects/${encodeURIComponent(req.params.CUID)}/version/${encodeURIComponent(req.params.version)}/ratings`)
        );
  
        // GET RATING
        router.route('/ratings/:ratingId').get(
            this.proxyRequest((req: Request) => `/ratings/${encodeURIComponent(req.params.ratingId)}`)
        );

        // EDIT RATING
        router.route('/users/:username/learning-objects/:CUID/version/:version/ratings/:ratingID').patch(
            this.proxyRequest((req: Request) => `/users/${encodeURIComponent(req.params.username)}/learning-objects/${encodeURIComponent(req.params.CUID)}/version/${encodeURIComponent(req.params.version)}/ratings/${encodeURIComponent(req.params.ratingID)}`)
        );

        // DELETE RATING
        router.route('/users/:username/learning-objects/:CUID/version/:version/ratings/:ratingID').delete(
            this.proxyRequest((req: Request) => `/users/${encodeURIComponent(req.params.username)}/learning-objects/${encodeURIComponent(req.params.CUID)}/version/${encodeURIComponent(req.params.version)}/ratings/${encodeURIComponent(req.params.ratingID)}`)
        );

        // CREATE RATING
        router.route('/users/:username/learning-objects/:CUID/version/:version/ratings').post(
            this.proxyRequest((req: Request) => `/users/${encodeURIComponent(req.params.username)}/learning-objects/${encodeURIComponent(req.params.CUID)}/version/${encodeURIComponent(req.params.version)}/ratings`)
        );
  
        // FLAG A RATING
        router.route('/users/:username/learning-objects/:CUID/version/:version/ratings/:ratingID/flags').post(
            this.proxyRequest((req: Request) => `/users/${encodeURIComponent(req.params.username)}/learning-objects/${encodeURIComponent(req.params.CUID)}/version/${encodeURIComponent(req.params.version)}/ratings/${encodeURIComponent(req.params.ratingID)}/flags`)
        );
  
        // CREATE A RESPONSE
        router.route('/users/:username/learning-objects/:CUID/version/:version/ratings/:ratingID/responses').post(
            this.proxyRequest((req: Request) => `/users/${encodeURIComponent(req.params.username)}/learning-objects/${encodeURIComponent(req.params.CUID)}/version/${encodeURIComponent(req.params.version)}/ratings/${encodeURIComponent(req.params.ratingID)}/responses`)
        );
  
        // DELETE A RESPONSE
        router.route('/users/:username/learning-objects/:CUID/version/:version/ratings/:ratingID/responses/:responseID').delete(
            this.proxyRequest((req: Request) => `/users/${encodeURIComponent(req.params.username)}/learning-objects/${encodeURIComponent(req.params.CUID)}/version/${encodeURIComponent(req.params.version)}/ratings/${encodeURIComponent(req.params.ratingID)}/responses/${encodeURIComponent(req.params.responseID)}`)
        );
  
        // EDIT A RESPONSE
        router.route('/users/:username/learning-objects/:CUID/version/:version/ratings/:ratingID/responses/:responseID').patch(
            this.proxyRequest((req: Request) => `/users/${encodeURIComponent(req.params.username)}/learning-objects/${encodeURIComponent(req.params.CUID)}/version/${encodeURIComponent(req.params.version)}/ratings/${encodeURIComponent(req.params.ratingID)}/responses/${encodeURIComponent(req.params.responseID)}`)
        );

        return router;
    }

    private proxyRequest(callback: Function) {
        return proxy(RATING_API, {
            proxyReqPathResolver: req => {
                return callback(req);
            },
        });
    }
}