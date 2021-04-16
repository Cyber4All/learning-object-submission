import { Router, Request } from "express";
import proxy = require("express-http-proxy");
import { Controller } from "../../../interfaces/Controller";

const LEARNING_OBJECT_SERVICE_URI =
  process.env.LEARNING_OBJECT_SERVICE_URI || 'localhost:5000';

export class OutcomesController implements Controller {
  buildRouter(): Router {
    const router = Router();

    /**
     * @swagger
     * /learning-objects/{learningObjectId}/learning-outcomes:
     *  post:
     *    description: Adds a learning outcome
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: path
     *        name: learningObjectId
     *        schema:
     *          type: string
     *        required: true
     *        description: The id of the learning object
     *    requestBody:
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            description: Partial outcome
     *            $ref: '#/components/schemas/Outcome'
     *    responses:
     *      200:
     *        description: OK
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                id:
     *                  type: string
     *                  description: The id of the new outcome
     *                  example: 000000000000000000000000
     *      400:
     *        description: BAD REQUEST - Request body missing required information to make a outcome
     *      401:
     *        description: UNAUTHENTICATED - User not logged in
     *      403:
     *        description: UNAUTHORIZED - User is not the author or privileged user
     *      404:
     *        description: NOT FOUND - Outcome not found
     */
    router.post('/learning-objects/:learningObjectId/learning-outcomes', this.proxyRequest((req: Request) => `/learning-objects/${encodeURIComponent(req.params.learningObjectId)}/learning-outcomes`));
    
    /**
     * @swagger
     * /learning-objects/{learningObjectId}/learning-outcomes/{outcomeId}:
     *  patch:
     *    description: Updates a outcome
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: path
     *        name: learningObjectId
     *        schema:
     *          type: string
     *        required: true
     *        description: The id of the learning object
     *      - in: path
     *        name: outcomeId
     *        schema:
     *          type: string
     *        required: true
     *        description: The id of the outcome
     *    requestBody:
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            description: Partial outcome
     *            $ref: '#/components/schemas/Outcome'
     *    responses:
     *      200:
     *        description: OK
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              $ref: '#/components/schemas/Outcome'
     *      400:
     *        description: BAD REQUEST - Request body missing required information to update the outcome
     *      401:
     *        description: UNAUTHENTICATED - User not logged in
     *      403:
     *        description: UNAUTHORIZED - User is not the author or privileged user
     *      404:
     *        description: NOT FOUND - Outcome or object not found
     */
    router.patch('/learning-objects/:learningObjectId/learning-outcomes/:outcomeId', this.proxyRequest((req: Request) => `/learning-objects/${encodeURIComponent(req.params.learningObjectId)}/learning-outcomes/${encodeURIComponent(req.params.outcomeId)}`));
    
    /**
     * @swagger
     * /learning-objects/{learningObjectId}/learning-outcomes/{outcomeId}:
     *  delete:
     *    description: Deletes an outcome
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: path
     *        name: learningObjectId
     *        schema:
     *          type: string
     *        required: true
     *        description: The id of the learning object
     *      - in: path
     *        name: outcomeId
     *        schema:
     *          type: string
     *        required: true
     *        description: The id of the outcome
     *    responses:
     *      204:
     *        description: NO CONTENT
     *      401:
     *        description: UNAUTHENTICATED - User not logged in
     *      403:
     *        description: UNAUTHORIZED - User is not the author or privileged user
     *      404:
     *        description: NOT FOUND - Outcome or object not found
     */
    router.delete('/learning-objects/:learningObjectId/learning-outcomes/:outcomeId', this.proxyRequest((req: Request) => `/learning-objects/${encodeURIComponent(req.params.learningObjectId)}/learning-outcomes/${encodeURIComponent(req.params.outcomeId)}`));

    /**
     * @swagger
     * /users/{username}/learning-objects/{learningObjectId}/outcomes:
     *  get:
     *    description: Gets a object's outcomes
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: path
     *        name: learningObjectId
     *        schema:
     *          type: string
     *        required: true
     *        description: The id of the learning object
     *      - in: path
     *        name: username
     *        schema:
     *          type: string
     *        required: true
     *        description: The username of the author
     *    responses:
     *      200:
     *        description: OK
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: '#/components/schemas/Outcome'
     *      404:
     *        description: NOT FOUND - Learning object not found
     */
    router.get('/users/:username/learning-objects/:learningObjectId/outcomes', this.proxyRequest((req: Request) => `/users/${encodeURIComponent(req.params.username)}/learning-objects/${encodeURIComponent(req.params.learningObjectId)}/outcomes`));

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