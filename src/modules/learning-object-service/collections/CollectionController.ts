import { Router, Request } from "express";
import proxy = require("express-http-proxy");
import { Controller } from "../../../interfaces/Controller";
import { LEARNING_OBJECT_ROUTES } from "../../../routes";

const LEARNING_OBJECT_SERVICE_URI =
  process.env.LEARNING_OBJECT_SERVICE_URI || 'localhost:5000';

export class CollectionController implements Controller {
  buildRouter(): Router {
    const router = Router();

    /**
     * @swagger
     * /{collection}/metrics:
     *  get:
     *    description: Gets a collection's metrics
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: path
     *        name: collection
     *        schema:
     *            type: string
     *        required: true
     *        description: The name of the collection
     *    responses:
     *      200:
     *        description: OK
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/CollectionMetricBody'
     *      500:
     *        description: INTERNAL SERVICE ERROR - Collection not found
     */
    router.route('/:collection/metrics').get(this.proxyRequest((req: Request) => `/${encodeURIComponent(req.params.collection)}/metrics`));
    
    /**
     * @swagger
     * /collections/{name}/meta:
     *  get:
     *    description: Gets a collection's meta data
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: path
     *        name: name
     *        schema:
     *            type: string
     *        required: true
     *        description: The name of the collection
     *    responses:
     *      200:
     *        description: OK
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Collection'
     *      404:
     *        description: NOT FOUND - Collection not found
     */
    router.get('/collections/:name/meta', this.proxyRequest((req: Request) => `/collections/${encodeURIComponent(req.params.name)}/meta`));
    
    /**
     * @swagger
     * /collections:
     *  get:
     *    description: Gets a list of collections
     *    tags:
     *      - Learning Object Service
     *    responses:
     *      200:
     *        description: OK
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                properties:
     *                  name:
     *                    type: string
     *                    example: nccp
     *                    required: true
     *                    description: The collection name
     *                  abvName:
     *                    type: string
     *                    example: nccp
     *                    required: true
     *                    description: The collection's abbreviated name
     *                  hasLogo:
     *                    type: boolean
     *                    example: true
     *                    required: true
     *                    description: True if the collection has a logo
     */
    router.get('/collections', this.proxyRequest((req: Request) => LEARNING_OBJECT_ROUTES.GET_COLLECTIONS));

    /**
     * @swagger
     * /learning-objects/{learningObjectId}/collections:
     *  patch:
     *    description: Adds object to collection
     *    tags:
     *      - Learning Object Service
     *    requestBody:
     *      description: The collection
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            properties:
     *              collection:
     *                type: string
     *                example: nccp
     *                description: The collection name
     *                required: true
     *    responses:
     *      200:
     *        description: OK
     *      401:
     *        description: UNAUTHENTICATED - User is not logged in
     */
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