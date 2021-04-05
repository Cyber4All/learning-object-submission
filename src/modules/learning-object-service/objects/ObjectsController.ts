import { Router, Request } from "express";
import proxy = require("express-http-proxy");
import { Controller } from "../../../interfaces/Controller";
import { ADMIN_LEARNING_OBJECT_ROUTES, LEARNING_OBJECT_ROUTES } from "../../../routes";
import * as querystring from 'querystring';

const LEARNING_OBJECT_SERVICE_URI =
  process.env.LEARNING_OBJECT_SERVICE_URI || 'localhost:5000';

export class ObjectsController implements Controller {
  buildRouter(): Router {
    const router = Router();

    // Routes go here

    router.route('/users/:username/learning-objects/:id').all(this.proxyRequest((req: Request) => `/users/${encodeURIComponent(req.params.username)}/learning-objects/${encodeURIComponent(req.params.id)}?${req.query ? querystring.stringify(req.query) : ''}`));

    // Retrieves the materials for a learning object
    router.get('/users/:username/learning-objects/:id/materials', this.proxyRequest((req: Request) => `/users/:username/learning-objects/${encodeURIComponent(req.params.id)}/materials?${querystring.stringify(req.query)}`));

    router.get('/users/:username/learning-objects/:id/children', this.proxyRequest((req: Request) => `/users/:username/learning-objects/${encodeURIComponent(req.params.id)}/children`));

    router.get('/users/:username/learning-objects/:id/parents', this.proxyRequest((req: Request) => `/users/${req.params.username}/learning-objects/${encodeURIComponent(req.params.id)}/parents`));

    router.post('/learning-objects/:username/:learningObjectName/children', this.proxyRequest((req: Request) => `/learning-objects/${req.params.username}/${req.params.learningObjectName}/children`));
    
    router.delete('/learning-objects/:username/:learningObjectName/children', this.proxyRequest((req: Request) => `/learning-objects/${req.params.username}/${req.params.learningObjectName}/children`));

    router.delete('/:learningObjectName', this.proxyRequest((req: Request) => LEARNING_OBJECT_ROUTES.DELETE_LEARNING_OBJECT_BY_NAME(req.params.learningObjectName)));

    router.route('/:learningObjectId')
      .patch(this.proxyRequest((req: Request) => LEARNING_OBJECT_ROUTES.UPDATE_LEARNING_OBJECT({authorUsername: req.params.username, id: req.params.learningObjectId})))
      .delete(this.proxyRequest((req: Request) => LEARNING_OBJECT_ROUTES.DELETE_LEARNING_OBJECT({authorUsername: req.params.username, id: req.params.learningObjectId})));

    router.route('')
      .get(this.proxyRequest((req: Request) => (LEARNING_OBJECT_ROUTES.LOAD_LEARNING_OBJECT_SUMMARY(req.params.username) + '?' + querystring.stringify(req.query))))
      .post(this.proxyRequest((req: Request) => LEARNING_OBJECT_ROUTES.CREATE_LEARNING_OBJECT(req.params.username)));

    router.get('/profile', this.proxyRequest((req: Request) => LEARNING_OBJECT_ROUTES.LOAD_USER_PROFILE(encodeURIComponent(req.params.username))));
    
    router.delete('/multiple/:names', this.proxyRequest((req: Request) => LEARNING_OBJECT_ROUTES.DELETE_MULTIPLE_LEARNING_OBJECTS(req.params.names.split(','))));

    router.get('', this.proxyRequest((req: Request) => `${LEARNING_OBJECT_ROUTES.FETCH_LEARNING_OBJECTS}?${querystring.stringify(req.query)}`));

    // Weird issue with collision (throws 500)
    router.route('/learning-objects/:learningObjectId').get(this.proxyRequest((req: Request) => `/learning-objects/${encodeURIComponent(req.params.learningObjectId)}`));
    
    // WEIRD 404
    router.get('/users/:author', this.proxyRequest((req: Request) => LEARNING_OBJECT_ROUTES.FETCH_USERS_LEARNING_OBJECTS(req.params.author)));
    
    // 401 Error
    router.get('/:id/children/summary', this.proxyRequest((req: Request) => LEARNING_OBJECT_ROUTES.GET_LEARNING_OBJECT_CHILDREN(req.params.id)));

    // // Learning Object Routes
    router.get('/learning-objects', this.proxyRequest((req: Request) => `${ADMIN_LEARNING_OBJECT_ROUTES.FETCH_LEARNING_OBJECTS}?${querystring.stringify(req.query)}`));
    
    router.patch('/learning-objects', this.proxyRequest((req: Request) => ADMIN_LEARNING_OBJECT_ROUTES.UPDATE_OBJECT()));
    
    router.get('/learning-objects/:learningObjectId', this.proxyRequest((req: Request) => ADMIN_LEARNING_OBJECT_ROUTES.GET_FULL_OBJECT(req.params.learningObjectId)));

    router.delete('/users/:username/learning-objects/:learningObjectName', this.proxyRequest((req: Request) => ADMIN_LEARNING_OBJECT_ROUTES.DELETE_LEARNING_OBJECT(req.params.username, req.params.learningObjectName)));
    
    router.delete('/users/:username/learning-objects/multiple/:learningObjectIDs', this.proxyRequest((req: Request) => ADMIN_LEARNING_OBJECT_ROUTES.DELETE_MULTIPLE_LEARNING_OBJECTS(req.params.username, req.params.learningObjectIDs)));

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