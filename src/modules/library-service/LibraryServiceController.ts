import { Request, Router } from "express";
import proxy = require("express-http-proxy");
import { Controller } from "../../interfaces/Controller";
import * as querystring from 'querystring';

const CART_API = process.env.CART_API || 'localhost:3006';

export class LibraryServiceController implements Controller {
    buildRouter(): Router {
        const router = Router();

        /**
         * @swagger
         * /learning-objects/metrics:
         *  get:
         *      description: Gets the learning object metrics for CLARK
         *      tags:
         *          - Library Service
         *      responses:
         *          200:
         *              description: OK
         *              content:
         *                  application/json:
         *                      schema:
         *                          $ref: '#/components/schemas/Metric'
         *          404:
         *              description: NOT FOUND - No metrics were found
         */
        router.get(
            '/learning-objects/metrics',
            this.proxyRequest((req: Request) => '/learning-objects/metrics')
        );

        /**
         * @swagger
         * /users/{username}/learning-objects/{cuid}/metrics:
         *  get:
         *      description: Gets the metrics for a learning object
         *      tags:
         *          - Library Service
         *      parameters:
         *          - in: path
         *            name: username
         *            schema:
         *                type: string
         *            required: true
         *            description: The author's username
         *          - in: path
         *            name: cuid
         *            schema:
         *                type: string
         *            required: true
         *            description: The cuid of the learning object
         *      responses:
         *          200:
         *              description: OK
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         *                          properties:
         *                              saves:
         *                                  type: integer
         *                                  description: The number of saves for a particular object
         *                                  example: 200
         *                              downloads:
         *                                  type: integer
         *                                  description: The number of downloads for a particular object
         *                                  example: 100
         *          404:
         *              description: NOT FOUND - No metrics were found for the specific username and cuid
         */
        router.get(
            '/users/:username/learning-objects/:cuid/metrics',
            this.proxyRequest((req: Request) => `/users/${encodeURIComponent(req.params.username)}/learning-objects/${encodeURIComponent(req.params.cuid)}/metrics`)
        );

        /**
         * @swagger
         * /{username}/library/learning-objects:
         *  get:
         *      description: Gets a user's library
         *      tags:
         *          - Library Service
         *      parameters:
         *          - in: path
         *            name: username
         *            schema:
         *                type: string
         *            required: true
         *            description: The username of the user's library
         *          - in: query
         *            name: page
         *            schema:
         *                type: integer
         *            required: true
         *            description: The current page of the library
         *          - in: query
         *            name: limit
         *            schema:
         *                type: integer
         *            required: true
         *            description: The number of objects to return
         *      responses:
         *          200:
         *              description: OK
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         *                          properties:
         *                              userLibraryItems:
         *                                  type: array
         *                                  items:
         *                                      $ref: '#/components/schemas/LibraryItem'
         *                                  required: true
         *                              lastPage:
         *                                  type: integer
         *                                  required: false
         *                                  example: 2
         *          404:
         *              description: NOT FOUND - User not found
         *          401:
         *              description: UNAUTHENTICATED - User not logged in
         *          403:
         *              description: UNAUTHORIZED - User is trying to access another user's library
         */
        router.get(
            '/users/:username/library/learning-objects',
            this.proxyRequest((req: Request) => `/users/${encodeURIComponent(req.params.username)}/library/learning-objects?${querystring.stringify(req.query)}`)
        );

        /**
         * @swagger
         * /{username}/library/learning-objects/{cuid}:
         *  delete:
         *      description: Deletes an item from the user's library
         *      tags:
         *          - Library Service
         *      parameters:
         *          - in: path
         *            name: username
         *            schema:
         *                type: string
         *            required: true
         *            description: The username of the user's library
         *          - in: path
         *            name: cuid
         *            schema:
         *                type: string
         *            required: true
         *            description: The cuid of the learning object to remove
         *      responses:
         *          204:
         *              description: NO CONTENT - Successfully deleted from library
         *          404:
         *              description: NOT FOUND - User or learning object not found
         *          401:
         *              description: UNAUTHENTICATED - User not logged in
         *          403:
         *              description: UNAUTHORIZED - User is trying to access and modify another user's library
         */
        router.delete(
            '/users/:username/library/learning-objects/:cuid',
            this.proxyRequest((req: Request) => `/users/${encodeURIComponent(req.params.username)}/library/learning-objects/${encodeURIComponent(req.params.cuid)}?${querystring.stringify(req.query)}`)
        );

        /**
         * @swagger
         * /{username}/library/learning-objects:
         *  post:
         *      description: Adds a learning object to the user's library
         *      tags:
         *          - Library Service
         *      parameters:
         *          - in: path
         *            name: username
         *            schema:
         *                type: string
         *            required: true
         *            description: The username of the user's library
         *      requestBody:
         *          description: The cuid, version, and author's username
         *          required: true
         *          content:
         *              application/json:
         *                  schema:
         *                      type: object
         *                      properties:
         *                          cuid:
         *                              type: string
         *                              description: The cuid of the learning object to save
         *                              required: true
         *                              example: 00000000-1111-2222-3333-444444444444
         *                          version:
         *                              type: integer
         *                              description: The version of the learning object
         *                              required: true
         *                              example: 1
         *                          authorUsername:
         *                              type: string
         *                              description: The username of the object's author
         *                              required: true
         *                              example: jdoe1
         *      responses:
         *          201:
         *              description: CREATED - Successfully added to library
         *          404:
         *              description: NOT FOUND - User or learning object not found
         *          401:
         *              description: UNAUTHENTICATED - User not logged in
         *          403:
         *              description: UNAUTHORIZED - User is trying to access and modify another user's library
         */
        router.post(
            '/users/:username/library/learning-objects',
            this.proxyRequest((req: Request) => `/users/${encodeURIComponent(req.params.username)}/library/learning-objects`)
        );

        return router;
    }

    private proxyRequest(callback: Function) {
        return proxy(CART_API, {
            proxyReqPathResolver: req => {
                return callback(req);
            },
        });
    }
}