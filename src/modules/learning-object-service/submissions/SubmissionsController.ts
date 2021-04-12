import { Router, Request } from "express";
import proxy = require("express-http-proxy");
import { Controller } from "../../../interfaces/Controller";
import { ADMIN_LEARNING_OBJECT_ROUTES, LEARNING_OBJECT_ROUTES } from "../../../routes";

const LEARNING_OBJECT_SERVICE_URI =
  process.env.LEARNING_OBJECT_SERVICE_URI || 'localhost:5000';

export class SubmissionsController implements Controller {
  buildRouter(): Router {
    const router = Router();

    /**
     * @swagger
     * /users/{userId}/learning-objects/{learningObjectId}/submissions:
     *  get:
     *    description: Gets if this is the first time the object has been submitted
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: path
     *        name: userId
     *        schema:
     *          type: string
     *        required: true
     *        description: The object author's user id
     *      - in: path
     *        name: learningObjectId
     *        schema:
     *          type: string
     *        required: true
     *        description: The id of the object
     *      - in: query
     *        name: collection
     *        schema:
     *          type: string
     *        required: true
     *        description: The collection submitting to
     *      - in: path
     *        name: hasSubmission
     *        schema:
     *          type: boolean
     *        required: true
     *        description: Whether the object has a submission
     *    responses:
     *      200:
     *        description: OK
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                isFirstSubmission:
     *                  type: boolean
     *                  required: true
     *                  example: true
     *                  description: Returns true if this is the first time the object has been submitted to a collection for review, false otherwise
     *      401:
     *        description: UNAUTHENTICATED - User not logged in
     *      403:
     *        description: UNAUTHORIZED - User email not verified
     *      501:
     *        description: NOT IMPLEMENTED - User is missing query parameters hasSubmission and collection
     *  post:
     *    description: Submits a object for review
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: path
     *        name: userId
     *        schema:
     *          type: string
     *        required: true
     *        description: The object author's user id
     *      - in: path
     *        name: learningObjectId
     *        schema:
     *          type: string
     *        required: true
     *        description: The id of the object
     *    requestBody:
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            properties:
     *              collection:
     *                type: string
     *                required: true
     *                description: The collection submitting to
     *                example: nccp
     *    responses:
     *      200:
     *        description: OK
     *      401:
     *        description: UNAUTHENTICATED - User not logged in
     *      403:
     *        description: UNAUTHORIZED - User is not the object author
     *      404:
     *        description: NOT FOUND - Object not found
     *  delete:
     *    description: Deletes a object submission
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: path
     *        name: userId
     *        schema:
     *          type: string
     *        required: true
     *        description: The object author's user id
     *      - in: path
     *        name: learningObjectId
     *        schema:
     *          type: string
     *        required: true
     *        description: The id of the object
     *    responses:
     *      200:
     *        description: OK
     *      400:
     *        description: BAD REQUEST - Object has already been canceled
     *      401:
     *        description: UNAUTHENTICATED - User not logged in
     *      403:
     *        description: UNAUTHORIZED - User is not the object author
     *      409:
     *        description: CONFLICT - Object is not in waiting
     */
    router.all('/users/:userId/learning-objects/:learningObjectId/submissions', this.proxyRequest((req: Request) => LEARNING_OBJECT_ROUTES.SUBMIT_FOR_REVIEW(req.params.userId, req.params.learningObjectId, req.query)));

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