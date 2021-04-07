import { Router, Request } from "express";
import proxy = require("express-http-proxy");
import { Controller } from "../../../interfaces/Controller";
import { LEARNING_OBJECT_ROUTES } from "../../../routes";

const LEARNING_OBJECT_SERVICE_URI =
  process.env.LEARNING_OBJECT_SERVICE_URI || 'localhost:5000';

export class RevisionsController implements Controller {
  buildRouter(): Router {
    const router = Router();

    /**
     * @swagger
     * /users/{username}/learning-objects/{cuid}/versions:
     *  post:
     *    description: Creates a object revision
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: path
     *        name: username
     *        schema:
     *          type: string
     *        required: true
     *        description: The learning object's author's username
     *      - in: path
     *        name: cuid
     *        schema:
     *          type: string
     *        required: true
     *        description: The cuid of the learning object
     *    responses:
     *      200:
     *        description: OK
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                revisionUri:
     *                  type: string
     *                  description: The uri of the new object revision
     *                  required: true
     *      400:
     *        description: BAD REQUEST - Revision already exists, object creating revision for is not released, username provided in params in not author username
     *      401:
     *        description: UNAUTHENTICATED - User not logged in
     *      403:
     *        description: UNAUTHORIZED - User not object author or have editor/admin privilege
     *      404:
     *        description: NOT FOUND - Learning object not found
     */
    router.post('/users/:username/learning-objects/:cuid/versions', this.proxyRequest((req: Request) => `/users/${encodeURIComponent(req.params.username)}/learning-objects/${encodeURIComponent(req.params.cuid)}/versions`));

    /**
     * @swagger
     * /users/{username}/learning-objects/{learningObjectId}/revisions/{revisionId}:
     *  get:
     *    description: Gets a object revision
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: path
     *        name: username
     *        schema:
     *          type: string
     *        required: true
     *        description: The learning object's author's username
     *      - in: path
     *        name: learningObjectId
     *        schema:
     *          type: string
     *        required: true
     *        description: The id of the learning object
     *      - in: path
     *        name: revisionId
     *        schema:
     *          type: string
     *        required: true
     *        description: The id of the revision
     *    responses:
     *      200:
     *        description: Gets a learning object revision
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/LearningObject'
     *      401:
     *        description: UNAUTHENTICATED - User not logged in
     *      403:
     *        description: UNAUTHORIZED - User is not the object author or privileged user
     *      404:
     *        description: NOT FOUND - Revision not found
     */
    router.get('/users/:username/learning-objects/:learningObjectId/revisions/:revisionId', this.proxyRequest((req: Request) => LEARNING_OBJECT_ROUTES.GET_LEARNING_OBJECT_REVISION({username: req.params.username, learningObjectId: req.params.learningObjectId, revisionId: req.params.revisionId, query: req.query})));

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