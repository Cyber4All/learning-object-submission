import { Router } from "express";
import proxy = require("express-http-proxy");
import { Controller } from "../../../interfaces/Controller";
import { LEARNING_OBJECT_ROUTES } from "../../../routes";

const LEARNING_OBJECT_SERVICE_URI =
  process.env.LEARNING_OBJECT_SERVICE_URI || 'localhost:5000';

export class CollectionController implements Controller {
  buildRouter(): Router {
    const router = Router();

    // Routes go here

    // Retrieves the metrics for a collection
    router.route('/:collection/metrics').get(
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          console.log(req.params.collection);
          return `/${encodeURIComponent(req.params.collection)}/metrics`;
        },
      }),
    );

    router.get(
      '/collections/:name',
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          return `/collections/${encodeURIComponent(req.params.name)}`;
        },
      }),
    );
    router.get(
      '/collections/:name/meta',
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          return `/collections/${encodeURIComponent(req.params.name)}/meta`;
        },
      }),
    );
    router.get(
      '/collections/:name/learning-objects',
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          return `/collections/${encodeURIComponent(
            req.params.name,
          )}/learning-objects`;
        },
      }),
    );
    router.get(
      '/collections',
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          return LEARNING_OBJECT_ROUTES.GET_COLLECTIONS;
        },
      }),
    );

    router.patch(
      '/learning-objects/:learningObjectId/collections',
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          return LEARNING_OBJECT_ROUTES.ADD_LEARNING_OBJECT_TO_COLLECTION(
            req.params.learningObjectId,
          );
        },
      }),
    );

    return router;
  }
}