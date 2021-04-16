import { Request, Router } from "express";
import proxy = require("express-http-proxy");
import { Controller } from "../../../interfaces/Controller";
import { LEARNING_OBJECT_ROUTES } from "../../../routes";

const LEARNING_OBJECT_SERVICE_URI =
  process.env.LEARNING_OBJECT_SERVICE_URI || 'localhost:5000';

export class ChangelogController implements Controller {
  buildRouter(): Router {
    const router = Router();

    /**
     * @swagger
     * /users/{userId}/learning-objects/{cuid}/changelog:
     *  post:
     *    description: Creates a changelog
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: path
     *        name: userId
     *        schema:
     *            type: string
     *        required: true
     *        description: The username of the author
     *      - in: path
     *        name: cuid
     *        schema:
     *            type: string
     *        required: true
     *        description: The cuid of the learning object
     *    requestBody:
     *        description: The cuid, version, and author's username
     *        required: true
     *        content:
     *            application/json:
     *                schema:
     *                    type: object
     *                    properties:
     *                        changelogText:
     *                            type: string
     *                            description: This is the text of the changelog
     *                            required: true
     *                            example: This is an example
     *    responses:
     *        200:
     *            description: OK
     *        401:
     *            description: UNAUTHENTICATED - User not logged in
     *        403:
     *            description: UNAUTHORIZED - User is not a admin or editor
     *        404:
     *            description: NOT FOUND - Learning object or user not found
     */
    router.post('/users/:userId/learning-objects/:cuid/changelog', this.proxyRequest((req: Request) => LEARNING_OBJECT_ROUTES.CREATE_CHANGELOG(req.params.userId, req.params.cuid)));
    
    /**
     * @swagger
     * /users/{userId}/learning-objects/{cuid}/changelogs:
     *  get:
     *    description: Gets a changelog for a object
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: path
     *        name: userId
     *        schema:
     *            type: string
     *        required: true
     *        description: The username of the author
     *      - in: path
     *        name: cuid
     *        schema:
     *            type: string
     *        required: true
     *        description: The cuid of the learning object
     *    responses:
     *      200:
     *        description: OK
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              $ref: '#/components/schemas/Changelog'
     */
    router.get('/users/:userId/learning-objects/:cuid/changelogs', this.proxyRequest((req: Request) => LEARNING_OBJECT_ROUTES.GET_ALL_CHANGELOGS(req.params.userId, req.params.cuid, req.query)));

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