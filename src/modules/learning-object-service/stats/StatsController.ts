import { Router } from "express";
import proxy = require("express-http-proxy");
import { Controller } from "../../../interfaces/Controller";
import { STATS_ROUTE } from "../../../routes";

const LEARNING_OBJECT_SERVICE_URI =
    process.env.LEARNING_OBJECT_SERVICE_URI || 'localhost:5000';

export class StatsController implements Controller {
    buildRouter(): Router {
        const router = Router();

        // Routes go here

        router.get(
            '/collections/stats',
            proxy(LEARNING_OBJECT_SERVICE_URI, {
                proxyReqPathResolver: req => {
                    return `/collections/stats`;
                },
            }),
        );

        router.get(
            '/stats',
            proxy(LEARNING_OBJECT_SERVICE_URI, {
                proxyReqPathResolver: req => {
                    return STATS_ROUTE.LEARNING_OBJECT_STATS;
                },
            }),
        );

        return router;
    }
}