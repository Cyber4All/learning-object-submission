import { Router, Request } from "express";
import proxy = require("express-http-proxy");
import { Controller } from "../../interfaces/Controller";
import * as querystring from 'querystring';

const NOTIFICATION_API = process.env.NOTIFICATION_API || 'localhost:8000';

export class NotificationServiceController implements Controller {
    buildRouter(): Router {
        const router = Router();

        /**
         * @swagger
         * /users/{username}/notifications:
         *  get:
         *      description: Gets a user's update notifications
         *      tags:
         *          - Notification Service
         *      parameters:
         *          - in: path
         *            name: username
         *            schema:
         *                type: string
         *            required: true
         *            description: The username of the user
         *          - in: query
         *            name: page
         *            schema:
         *                type: number
         *            required: true
         *            description: The current page
         *          - in: query
         *            name: limit
         *            schema:
         *                type: number
         *            required: true
         *            description: The notification limit to send back in the request
         *      responses:
         *          200:
         *              description: OK
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         *                          properties:
         *                              lastPage:
         *                                  type: number
         *                                  example: 1
         *                                  required: true
         *                              notifications:
         *                                  type: array
         *                                  items:
         *                                      $ref: '#/components/schemas/Notification'
         *                                  required: true
         *          401:
         *              description: UNAUTHENTICATED - User not logged in
         *          403:
         *              description: UNAUTHORIZED - User is trying to access another user's notifications
         *          400:
         *              description: BAD CONTENT - Page and limit query parameters must be greater then zero
         *          404:
         *              description: NOT FOUND - User not found
         */
        router.route('/users/:username/notifications').get(this.proxyRequest((req: Request) => `/users/${encodeURIComponent(req.params.username)}/notifications?${querystring.stringify(req.query)}`));
  
        /**
         * @swagger
         * /users/{username}/notifications/{id}:
         *  delete:
         *      description: Deletes a notification for a user
         *      tags:
         *          - Notification Service
         *      parameters:
         *          - in: path
         *            name: username
         *            schema:
         *                type: string
         *            required: true
         *            description: The username of the user
         *          - in: path
         *            name: id
         *            schema:
         *                type: string
         *            required: true
         *            description: The id of the notification
         *      responses:
         *          204:
         *              description: NO CONTENT
         *          401:
         *              description: UNAUTHENTICATED - User not logged in
         *          403:
         *              description: UNAUTHORIZED - User is trying to delete another user's notifications
         *          404:
         *              description: NOT FOUND - User or notification not found
         */
        router.route('/users/:username/notifications/:id').delete(this.proxyRequest((req: Request) => `/users/${encodeURIComponent(req.params.username)}/notifications/${encodeURIComponent(req.params.id)}`));

        return router;
    }
    
    private proxyRequest(callback: Function) {
        return proxy(NOTIFICATION_API, {
            proxyReqPathResolver: req => {
                return callback(req);
            },
        });
    }
}