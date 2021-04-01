import { Router, Request } from "express";
import proxy = require("express-http-proxy");
import { Controller } from "../../../interfaces/Controller";
import { LEARNING_OBJECT_ROUTES } from "../../../routes";

const LEARNING_OBJECT_SERVICE_URI =
  process.env.LEARNING_OBJECT_SERVICE_URI || 'localhost:5000';

export class RevisionsController implements Controller {
  buildRouter(): Router {
    const router = Router();

    // Routes go here
    router.post('/:username/learning-objects/:cuid/versions', proxy(LEARNING_OBJECT_SERVICE_URI, {
      proxyReqPathResolver: req => {
        return `/users/${encodeURIComponent(
          req.params.username,
        )}/learning-objects/${encodeURIComponent(
          req.params.cuid,
        )}/versions`;
      },
    }));

    router.post(
      '/:learningObjectId/revisions',
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          return LEARNING_OBJECT_ROUTES.CREATE_LEARNING_OBJECT_REVISION(
            req.params.username,
            req.params.learningObjectId,
          );
        },
      }),
    );

    router.get(
      '/:learningObjectId/revisions/:revisionId',
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          return LEARNING_OBJECT_ROUTES.GET_LEARNING_OBJECT_REVISION({
            username: req.params.username,
            learningObjectId: req.params.learningObjectId,
            revisionId: req.params.revisionId,
            query: req.query,
          });
        },
      }),
    );

    return router;
  }
}