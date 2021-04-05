import { Router, Request } from "express";
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
    router.route('/:collection/metrics').get(this.proxyRequest((req: Request) => `/${encodeURIComponent(req.params.collection)}/metrics`));

    router.get('/collections/:name', this.proxyRequest((req: Request) => `/collections/${encodeURIComponent(req.params.name)}`));
    
    router.get('/collections/:name/meta', this.proxyRequest((req: Request) => `/collections/${encodeURIComponent(req.params.name)}/meta`));
    
    router.get('/collections/:name/learning-objects', this.proxyRequest((req: Request) => `/collections/${encodeURIComponent(req.params.name)}/learning-objects`));
    
    router.get('/collections', this.proxyRequest((req: Request) => LEARNING_OBJECT_ROUTES.GET_COLLECTIONS));

    router.patch('/learning-objects/:learningObjectId/collections', this.proxyRequest((req: Request) => LEARNING_OBJECT_ROUTES.ADD_LEARNING_OBJECT_TO_COLLECTION(req.params.learningObjectId)));

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