import { Router } from "express";
import proxy = require("express-http-proxy");
import { Controller } from "../../../interfaces/Controller";
import { LEARNING_OBJECT_ROUTES } from "../../../routes";

const LEARNING_OBJECT_SERVICE_URI =
  process.env.LEARNING_OBJECT_SERVICE_URI || 'localhost:5000';

export class ChangelogController implements Controller {
  buildRouter(): Router {
    const router = Router();

    // Routes go here

    router.post(
      '/:userId/learning-objects/:cuid/changelog',
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          return LEARNING_OBJECT_ROUTES.CREATE_CHANGELOG(
            req.params.userId,
            req.params.cuid,
          );
        },
      }),
    );
    router.get(
      '/:userId/learning-objects/:cuid/changelogs',
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          return LEARNING_OBJECT_ROUTES.GET_ALL_CHANGELOGS(
            req.params.userId,
            req.params.cuid,
            req.query,
          );
        },
      }),
    );

    return router;
  }
}