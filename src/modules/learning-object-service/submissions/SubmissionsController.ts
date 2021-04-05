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
    router.all('/:userId/learning-objects/:learningObjectId/submissions', this.proxyRequest((req: Request) => LEARNING_OBJECT_ROUTES.SUBMIT_FOR_REVIEW(req.params.userId, req.params.learningObjectId, req.query)));

    router.patch('/:learningObjectName/publish', this.proxyRequest((req: Request) => LEARNING_OBJECT_ROUTES.PUBLISH_LEARNING_OBJECT));
    
    router.patch('/:learningObjectName/unpublish', this.proxyRequest((req: Request) => LEARNING_OBJECT_ROUTES.UNPUBLISH_LEARNING_OBJECT));

    router.patch('/users/:username/learning-objects/:learningObjectName/publish', this.proxyRequest((req: Request) => ADMIN_LEARNING_OBJECT_ROUTES.PUBLISH_LEARNING_OBJECT(req.params.username, req.params.learningObjectName)));
    
    router.patch('/users/:username/learning-objects/:learningObjectName/unpublish', this.proxyRequest((req: Request) => ADMIN_LEARNING_OBJECT_ROUTES.UNPUBLISH_LEARNING_OBJECT(req.params.username, req.params.learningObjectName)));
    
    router.patch('/users/:username/learning-objects/:learningObjectName/lock', this.proxyRequest((req: Request) => ADMIN_LEARNING_OBJECT_ROUTES.LOCK_LEARNING_OBJECT(req.params.username, req.params.learningObjectName)));
    
    router.patch('/users/:username/learning-objects/:learningObjectName/unlock', this.proxyRequest((req: Request) => ADMIN_LEARNING_OBJECT_ROUTES.UNLOCK_LEARNING_OBJECT(req.params.username, req.params.learningObjectName)));

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