import { Router } from "express";
import proxy = require("express-http-proxy");
import { Controller } from "../../../interfaces/Controller";

const LEARNING_OBJECT_SERVICE_URI =
  process.env.LEARNING_OBJECT_SERVICE_URI || 'localhost:5000';

export class OutcomesController implements Controller {
  buildRouter(): Router {
    const router = Router();

    // Routes go here

    router.post(
      '/learning-objects/:learningObjectId/learning-outcomes',
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          return `/learning-objects/${encodeURIComponent(
            req.params.learningObjectId,
          )}/learning-outcomes`;
        },
      }),
    );
    router.patch(
      '/learning-objects/:learningObjectId/learning-outcomes/:outcomeId',
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          return `/learning-objects/${encodeURIComponent(
            req.params.learningObjectId,
          )}/learning-outcomes/${encodeURIComponent(req.params.outcomeId)}`;
        },
      }),
    );
    router.delete(
      '/learning-objects/:learningObjectId/learning-outcomes/:outcomeId',
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          return `/learning-objects/${encodeURIComponent(
            req.params.learningObjectId,
          )}/learning-outcomes/${encodeURIComponent(req.params.outcomeId)}`;
        },
      }),
    );
    // Not in production
    router.post(
      '/users/:username/learning-objects/:learningObjectId/outcomes/:outcomeId/mappings',
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          return `/users/${encodeURIComponent(req.params.username)}/learning-objects/${encodeURIComponent(
            req.params.learningObjectId,
          )}/outcomes/${encodeURIComponent(req.params.outcomeId)}/mappings`;
        },
      }),
    );

    // TODO: Update route in client
    router.get('/:username/learning-objects/:learningObjectId/outcomes', proxy(LEARNING_OBJECT_SERVICE_URI, {
      proxyReqPathResolver: req => {
        return `/users/${encodeURIComponent(
          req.params.username,
        )}/learning-objects/${encodeURIComponent(
          req.params.learningObjectId,
        )}/outcomes`;
      },
    }));

    return router;
  }
}