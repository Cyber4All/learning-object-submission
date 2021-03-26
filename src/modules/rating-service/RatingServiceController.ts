import { Request, Router } from "express";
import proxy = require("express-http-proxy");
import { Controller } from "../../interfaces/Controller";

const RATING_API = process.env.RATING_API || 'localhost:3004';

export class RatingServiceController implements Controller {
    buildRouter(): Router {
        const router = Router();

        /**
         * @swagger
         * /users/{username}/learning-objects/{CUID}/version/{version}/ratings:
         *  get:
         *      description: Gets the ratings for a learning object
         *      tags:
         *          - Rating Service
         *      parameters:
         *          - in: path
         *            name: username
         *            schema:
         *                type: string
         *            required: true
         *            description: The username of the object's author
         *          - in: path
         *            name: CUID
         *            schema:
         *                type: string
         *            required: true
         *            description: The cuid of the object
         *          - in: path
         *            name: version
         *            schema:
         *                type: number
         *            required: true
         *            description: The version number of the object
         *      responses:
         *          200:
         *              description: OK
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         *                          properties:
         *                              _id:
         *                                  type: string
         *                                  description: The cuid of the object
         *                                  example: 00000000-1111-2222-3333-444444444444
         *                              avgValue:
         *                                  type: number
         *                                  description: The average rating value
         *                                  example: 5
         *                              ratings:
         *                                  type: array
         *                                  description: The array of ratings left on the object
         *                                  items:
         *                                      $ref: '#/components/schemas/Rating'
         *          404:
         *              description: NOT FOUND - Learning object not found
         */
        router.route('/users/:username/learning-objects/:CUID/version/:version/ratings').get(
            this.proxyRequest((req: Request) => `/users/${encodeURIComponent(req.params.username)}/learning-objects/${encodeURIComponent(req.params.CUID)}/version/${encodeURIComponent(req.params.version)}/ratings`)
        );
  
        /**
         * @swagger
         * /ratings/{ratingId}:
         *  get:
         *      description: Gets a specific rating by id
         *      tags:
         *          - Rating Service
         *      parameters:
         *          - in: path
         *            name: ratingId
         *            schema:
         *                type: string
         *            required: true
         *            description: The rating id
         *      responses:
         *          200:
         *              description: OK
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         *                          $ref: '#/components/schemas/Rating'
         *          404:
         *              description: NOT FOUND - Rating was not found
         */
        router.route('/ratings/:ratingId').get(
            this.proxyRequest((req: Request) => `/ratings/${encodeURIComponent(req.params.ratingId)}`)
        );

        /**
         * @swagger
         * /users/{username}/learning-objects/{CUID}/version/{version}/ratings/{ratingID}:
         *  patch:
         *      description: Updates a rating on a object
         *      tags:
         *          - Rating Service
         *      parameters:
         *          - in: path
         *            name: username
         *            schema:
         *                type: string
         *            required: true
         *            description: The username of the object's author
         *          - in: path
         *            name: CUID
         *            schema:
         *                type: string
         *            required: true
         *            description: The cuid of the object
         *          - in: path
         *            name: version
         *            schema:
         *                type: number
         *            required: true
         *            description: The version number of the object
         *          - in: path
         *            name: ratingID
         *            schema:
         *                type: string
         *            required: true
         *            description: The id of the rating to update
         *      requestBody:
         *          description: The rating information to update
         *          required: true
         *          content:
         *              application/json:
         *                  schema:
         *                      type: object
         *                      $ref: '#/components/schemas/Rating'
         *      responses:
         *          200:
         *              description: OK
         *          401:
         *              description: UNAUTHENTICATED - User not logged in
         *          403:
         *              description: UNAUTHORIZED - User is trying to access and modify another user's rating
         *          404:
         *              description: NOT FOUND - Rating or object was not found
         */
        router.route('/users/:username/learning-objects/:CUID/version/:version/ratings/:ratingID').patch(
            this.proxyRequest((req: Request) => `/users/${encodeURIComponent(req.params.username)}/learning-objects/${encodeURIComponent(req.params.CUID)}/version/${encodeURIComponent(req.params.version)}/ratings/${encodeURIComponent(req.params.ratingID)}`)
        );

        /**
         * @swagger
         * /users/{username}/learning-objects/{CUID}/version/{version}/ratings/{ratingID}:
         *  delete:
         *      description: Deletes a rating from a learning object
         *      tags:
         *          - Rating Service
         *      parameters:
         *          - in: path
         *            name: username
         *            schema:
         *                type: string
         *            required: true
         *            description: The username of the object's author
         *          - in: path
         *            name: CUID
         *            schema:
         *                type: string
         *            required: true
         *            description: The cuid of the object
         *          - in: path
         *            name: version
         *            schema:
         *                type: number
         *            required: true
         *            description: The version number of the object
         *          - in: path
         *            name: ratingID
         *            schema:
         *                type: string
         *            required: true
         *            description: The id of the rating to delete
         *      responses:
         *          200:
         *              description: OK
         *          401:
         *              description: UNAUTHENTICATED - User not logged in
         *          403:
         *              description: UNAUTHORIZED - User is trying to access and modify another user's rating
         *          404:
         *              description: NOT FOUND - Rating or object was not found
         */
        router.route('/users/:username/learning-objects/:CUID/version/:version/ratings/:ratingID').delete(
            this.proxyRequest((req: Request) => `/users/${encodeURIComponent(req.params.username)}/learning-objects/${encodeURIComponent(req.params.CUID)}/version/${encodeURIComponent(req.params.version)}/ratings/${encodeURIComponent(req.params.ratingID)}`)
        );

        /**
         * @swagger
         * /users/{username}/learning-objects/{CUID}/version/{version}/ratings:
         *  post:
         *      description: Creates a rating on a object
         *      tags:
         *          - Rating Service
         *      parameters:
         *          - in: path
         *            name: username
         *            schema:
         *                type: string
         *            required: true
         *            description: The username of the object's author
         *          - in: path
         *            name: CUID
         *            schema:
         *                type: string
         *            required: true
         *            description: The cuid of the object
         *          - in: path
         *            name: version
         *            schema:
         *                type: number
         *            required: true
         *            description: The version number of the object
         *      requestBody:
         *          description: The rating information to create
         *          required: true
         *          content:
         *              application/json:
         *                  schema:
         *                      type: object
         *                      $ref: '#/components/schemas/Rating'
         *      responses:
         *          204:
         *              description: NO CONTENT
         *          401:
         *              description: UNAUTHENTICATED - User not logged in
         *          403:
         *              description: UNAUTHORIZED - Object attempting to rate is in review (not released)
         *          404:
         *              description: NOT FOUND - Learning object was not found
         */
        router.route('/users/:username/learning-objects/:CUID/version/:version/ratings').post(
            this.proxyRequest((req: Request) => `/users/${encodeURIComponent(req.params.username)}/learning-objects/${encodeURIComponent(req.params.CUID)}/version/${encodeURIComponent(req.params.version)}/ratings`)
        );
  
        /**
         * @swagger
         * /users/{username}/learning-objects/{CUID}/version/{version}/ratings/{ratingID}/flags:
         *  post:
         *      description: Flags a rating to be reviewed
         *      tags:
         *          - Rating Service
         *      parameters:
         *          - in: path
         *            name: username
         *            schema:
         *                type: string
         *            required: true
         *            description: The username of the object's author
         *          - in: path
         *            name: CUID
         *            schema:
         *                type: string
         *            required: true
         *            description: The cuid of the object
         *          - in: path
         *            name: version
         *            schema:
         *                type: number
         *            required: true
         *            description: The version number of the object
         *          - in: path
         *            name: ratingID
         *            schema:
         *                type: string
         *            required: true
         *            description: The id of the rating
         *      requestBody:
         *          description: The flag information to create
         *          required: true
         *          content:
         *              application/json:
         *                  schema:
         *                      type: object
         *                      $ref: '#/components/schemas/Flag'
         *      responses:
         *          204:
         *              description: NO CONTENT
         *          401:
         *              description: UNAUTHENTICATED - User not logged in
         *          403:
         *              description: UNAUTHORIZED - Author is attempting to flag a rating
         *          404:
         *              description: NOT FOUND - Learning object or rating was not found
         */
        router.route('/users/:username/learning-objects/:CUID/version/:version/ratings/:ratingID/flags').post(
            this.proxyRequest((req: Request) => `/users/${encodeURIComponent(req.params.username)}/learning-objects/${encodeURIComponent(req.params.CUID)}/version/${encodeURIComponent(req.params.version)}/ratings/${encodeURIComponent(req.params.ratingID)}/flags`)
        );
  
        /**
         * @swagger
         * /users/{username}/learning-objects/{CUID}/version/{version}/ratings/{ratingID}/responses:
         *  post:
         *      description: Creates a response to a rating
         *      tags:
         *          - Rating Service
         *      parameters:
         *          - in: path
         *            name: username
         *            schema:
         *                type: string
         *            required: true
         *            description: The username of the object's author
         *          - in: path
         *            name: CUID
         *            schema:
         *                type: string
         *            required: true
         *            description: The cuid of the object
         *          - in: path
         *            name: version
         *            schema:
         *                type: number
         *            required: true
         *            description: The version number of the object
         *          - in: path
         *            name: ratingID
         *            schema:
         *                type: string
         *            required: true
         *            description: The id of the rating
         *      requestBody:
         *          description: The flag information to create
         *          required: true
         *          content:
         *              application/json:
         *                  schema:
         *                      type: object
         *                      $ref: '#/components/schemas/Response'
         *      responses:
         *          200:
         *              description: OK
         *          401:
         *              description: UNAUTHENTICATED - User not logged in
         *          403:
         *              description: UNAUTHORIZED - Is not author or contributor
         *          404:
         *              description: NOT FOUND - Learning object or rating was not found
         */
        router.route('/users/:username/learning-objects/:CUID/version/:version/ratings/:ratingID/responses').post(
            this.proxyRequest((req: Request) => `/users/${encodeURIComponent(req.params.username)}/learning-objects/${encodeURIComponent(req.params.CUID)}/version/${encodeURIComponent(req.params.version)}/ratings/${encodeURIComponent(req.params.ratingID)}/responses`)
        );
  
        /**
         * @swagger
         * /users/{username}/learning-objects/{CUID}/version/{version}/ratings/{ratingID}/responses/{responseID}:
         *  delete:
         *      description: Deletes a response
         *      tags:
         *          - Rating Service
         *      parameters:
         *          - in: path
         *            name: username
         *            schema:
         *                type: string
         *            required: true
         *            description: The username of the object's author
         *          - in: path
         *            name: CUID
         *            schema:
         *                type: string
         *            required: true
         *            description: The cuid of the object
         *          - in: path
         *            name: version
         *            schema:
         *                type: number
         *            required: true
         *            description: The version number of the object
         *          - in: path
         *            name: ratingID
         *            schema:
         *                type: string
         *            required: true
         *            description: The id of the rating
         *          - in: path
         *            name: responseID
         *            schema:
         *                type: string
         *            required: true
         *            description: The id of the response
         *      responses:
         *          200:
         *              description: OK
         *          401:
         *              description: UNAUTHENTICATED - User not logged in
         *          403:
         *              description: UNAUTHORIZED - Is not the creator of the response
         *          404:
         *              description: NOT FOUND - Learning object, rating, or response was not found
         */
        router.route('/users/:username/learning-objects/:CUID/version/:version/ratings/:ratingID/responses/:responseID').delete(
            this.proxyRequest((req: Request) => `/users/${encodeURIComponent(req.params.username)}/learning-objects/${encodeURIComponent(req.params.CUID)}/version/${encodeURIComponent(req.params.version)}/ratings/${encodeURIComponent(req.params.ratingID)}/responses/${encodeURIComponent(req.params.responseID)}`)
        );
  
        /**
         * @swagger
         * /users/{username}/learning-objects/{CUID}/version/{version}/ratings/{ratingID}/responses/{responseID}:
         *  patch:
         *      description: Updates a response
         *      tags:
         *          - Rating Service
         *      parameters:
         *          - in: path
         *            name: username
         *            schema:
         *                type: string
         *            required: true
         *            description: The username of the object's author
         *          - in: path
         *            name: CUID
         *            schema:
         *                type: string
         *            required: true
         *            description: The cuid of the object
         *          - in: path
         *            name: version
         *            schema:
         *                type: number
         *            required: true
         *            description: The version number of the object
         *          - in: path
         *            name: ratingID
         *            schema:
         *                type: string
         *            required: true
         *            description: The id of the rating
         *          - in: path
         *            name: responseID
         *            schema:
         *                type: string
         *            required: true
         *            description: The id of the response
         *      requestBody:
         *          description: The flag information to create
         *          required: true
         *          content:
         *              application/json:
         *                  schema:
         *                      type: object
         *                      $ref: '#/components/schemas/Response'
         *      responses:
         *          200:
         *              description: OK
         *          401:
         *              description: UNAUTHENTICATED - User not logged in
         *          403:
         *              description: UNAUTHORIZED - Is not the creator of the response
         *          404:
         *              description: NOT FOUND - Learning object, rating, or response was not found
         */
        router.route('/users/:username/learning-objects/:CUID/version/:version/ratings/:ratingID/responses/:responseID').patch(
            this.proxyRequest((req: Request) => `/users/${encodeURIComponent(req.params.username)}/learning-objects/${encodeURIComponent(req.params.CUID)}/version/${encodeURIComponent(req.params.version)}/ratings/${encodeURIComponent(req.params.ratingID)}/responses/${encodeURIComponent(req.params.responseID)}`)
        );

        return router;
    }

    private proxyRequest(callback: Function) {
        return proxy(RATING_API, {
            proxyReqPathResolver: req => {
                return callback(req);
            },
        });
    }
}