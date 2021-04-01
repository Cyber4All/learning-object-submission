import { Router, Request } from "express";
import proxy = require("express-http-proxy");
import { Controller } from "../../../interfaces/Controller";
import { ADMIN_LEARNING_OBJECT_ROUTES, LEARNING_OBJECT_ROUTES } from "../../../routes";

const LEARNING_OBJECT_SERVICE_URI =
  process.env.LEARNING_OBJECT_SERVICE_URI || 'localhost:5000';

export class SubmissionsController implements Controller {
  buildRouter(): Router {
    const router = Router();

    // Routes go here
    router.all(
      '/:userId/learning-objects/:learningObjectId/submissions',
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          return LEARNING_OBJECT_ROUTES.SUBMIT_FOR_REVIEW(
            req.params.userId,
            req.params.learningObjectId,
            req.query,
          );
        },
      }),
    );

    router.patch(
      '/:learningObjectName/publish',
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          return LEARNING_OBJECT_ROUTES.PUBLISH_LEARNING_OBJECT;
        },
      }),
    );
    router.patch(
      '/:learningObjectName/unpublish',
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          return LEARNING_OBJECT_ROUTES.UNPUBLISH_LEARNING_OBJECT;
        },
      }),
    );

    router.patch(
      '/users/:username/learning-objects/:learningObjectName/publish',
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          const username = req.params.username;
          const learningObjectName = req.params.learningObjectName;
          return ADMIN_LEARNING_OBJECT_ROUTES.PUBLISH_LEARNING_OBJECT(
            username,
            learningObjectName,
          );
        },
      }),
    );
    router.patch(
      '/users/:username/learning-objects/:learningObjectName/unpublish',
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          const username = req.params.username;
          const learningObjectName = req.params.learningObjectName;
          return ADMIN_LEARNING_OBJECT_ROUTES.UNPUBLISH_LEARNING_OBJECT(
            username,
            learningObjectName,
          );
        },
      }),
    );
    router.patch(
      '/users/:username/learning-objects/:learningObjectName/lock',
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          const username = req.params.username;
          const learningObjectName = req.params.learningObjectName;
          return ADMIN_LEARNING_OBJECT_ROUTES.LOCK_LEARNING_OBJECT(
            username,
            learningObjectName,
          );
        },
      }),
    );
    router.patch(
      '/users/:username/learning-objects/:learningObjectName/unlock',
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          const username = req.params.username;
          const learningObjectName = req.params.learningObjectName;
          return ADMIN_LEARNING_OBJECT_ROUTES.UNLOCK_LEARNING_OBJECT(
            username,
            learningObjectName,
          );
        },
      }),
    );

    return router;
  }
}