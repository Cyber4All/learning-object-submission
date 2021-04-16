import { Router, Request } from "express";
import proxy = require("express-http-proxy");
import { Controller } from "../../../interfaces/Controller";
import { STATS_ROUTE } from "../../../routes";

const LEARNING_OBJECT_SERVICE_URI =
    process.env.LEARNING_OBJECT_SERVICE_URI || 'localhost:5000';

export class StatsController implements Controller {
    buildRouter(): Router {
        const router = Router();

        /**
         * @swagger
         * /learning-objects/stats:
         *  get:
         *      description: Gets stats on objects
         *      tags:
         *          - Learning Object Service
         *      responses:
         *          200:
         *              description: OK
         *              content:
         *                  application/json:
         *                      schema:
         *                          $ref: '#/components/schemas/LearningObjectStats'
         */
        router.get('/learning-objects/stats', this.proxyRequest((req: Request) => STATS_ROUTE.LEARNING_OBJECT_STATS));

        return router;
    }

    private proxyRequest(callback: Function) {
        return proxy(LEARNING_OBJECT_SERVICE_URI, {
            proxyReqPathResolver: req => {
                return callback(req);
            },
        });
    }
}