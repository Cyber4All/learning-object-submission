import { Router, Request } from "express";
import proxy = require("express-http-proxy");
import { Controller } from "../../interfaces/Controller";

const OUTCOME_API = process.env.OUTCOME_API || 'localhost:7000';

export class GuidelineServiceController implements Controller {
    buildRouter(): Router {
        const router = Router();
        
        /**
         * @swagger
         * /users/{username}/learning-objects/{learningObjectId}/outcomes/{outcomeId}/mappings/{mappingId}:
         *  delete:
         *      description: Removes a mapping from a object's outcome
         *      tags:
         *          - Guideline Service
         *      parameters:
         *          - in: path
         *            name: username
         *            schema:
         *                type: string
         *            required: true
         *            description: The username of the author for the learning object
         *          - in: path
         *            name: learningObjectId
         *            schema:
         *                type: string
         *            required: true
         *            description: The id of the learning object (not cuid)
         *          - in: path
         *            name: outcomeId
         *            schema:
         *                type: string
         *            required: true
         *            description: The id of the outcome
         *          - in: path
         *            name: mappingId
         *            schema:
         *                type: string
         *            required: true
         *            description: The id of the mapping
         *      responses:
         *          204:
         *              description: NO CONTENT
         *          404:
         *              description: NOT FOUND - Object, mapping, outcome, or user not found
         *          401:
         *              description: UNAUTHENTICATED - User not logged in
         *          403:
         *              description: UNAUTHORIZED - Another user is trying to access a author's outcome on a object
         */
        router.delete('/users/:username/learning-objects/:learningObjectId/outcomes/:outcomeId/mappings/:mappingId', this.proxyRequest((req: Request) => `/users/${encodeURIComponent(req.params.username)}/learning-objects/${encodeURIComponent(req.params.learningObjectId)}/outcomes/${encodeURIComponent(req.params.outcomeId)}/mappings/${encodeURIComponent(req.params.mappingId)}`));
      
        /**
         * @swagger
         * /outcomes/stats:
         *  get:
         *      description: Gets the stats of outcomes
         *      tags:
         *          - Guideline Service
         *      responses:
         *          200:
         *              description: OK
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         *                          properties:
         *                              apply:
         *                                  type: integer
         *                                  required: true
         *                                  example: 10
         *                              evaluate:
         *                                  type: integer
         *                                  required: true
         *                                  example: 20
         *                              remember:
         *                                  type: integer
         *                                  required: true
         *                                  example: 30
         */
        router.get('/outcomes/stats', this.proxyRequest((req: Request) => `/outcomes/stats`));

        return router;
    }

    private proxyRequest(callback: Function) {
        return proxy(OUTCOME_API, {
            proxyReqPathResolver: req => {
                return callback(req);
            },
        });
    }
}