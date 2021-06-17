import { Router, Request } from "express";
import proxy = require("express-http-proxy");
import { Controller } from "../../../interfaces/Controller";
import { ADMIN_LAMBDA_ROUTES, ADMIN_LEARNING_OBJECT_ROUTES, LEARNING_OBJECT_ROUTES } from "../../../routes";
import * as querystring from 'querystring';

const LEARNING_OBJECT_SERVICE_URI =
  process.env.LEARNING_OBJECT_SERVICE_URI || 'localhost:5000';
const COA_API = process.env.COA_SERVICE || 'localhost:8500';

export class ObjectsController implements Controller {
  buildRouter(): Router {
    const router = Router();

    /**
     * @swagger
     * /users/{username}/learning-objects/{id}:
     *  get:
     *    description: Gets a object by cuid
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: path
     *        name: username
     *        schema:
     *          type: string
     *        required: true
     *        description: The object author's username
     *      - in: path
     *        name: id
     *        schema:
     *          type: string
     *        required: true
     *        description: The object's cuid
     *    responses:
     *      200:
     *        description: OK
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/LearningObject'
     *      401:
     *        description: UNAUTHENTICATED - User not logged in and trying to access in review/unreleased object
     *      403:
     *        description: UNAUTHORIZED - User is not the author and trying to access a unreleased object or is not privileged and trying to access a in review object
     *      404:
     *        description: NOT FOUND - Object not found
     *  patch:
     *    description: Updates a object
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: path
     *        name: username
     *        schema:
     *          type: string
     *        required: true
     *        description: The object author's username
     *      - in: path
     *        name: id
     *        schema:
     *          type: string
     *        required: true
     *        description: The object's cuid
     *    requestbody:
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/LearningObject'
     *    responses:
     *      204:
     *        description: NO CONTENT
     *      400:
     *        description: BAD REQUEST - Object does not exist
     *      401:
     *        description: UNAUTHENTICATED - User not logged in
     *      403:
     *        description: UNAUTHORIZED - User not author making changes to unreleased object or not privileged user making changes to released/in review object
     *  delete:
     *    description: Deletes a object
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: path
     *        name: username
     *        schema:
     *          type: string
     *        required: true
     *        description: The object author's username
     *      - in: path
     *        name: id
     *        schema:
     *          type: string
     *        required: true
     *        description: The object's cuid
     *    responses:
     *      204:
     *        description: NO CONTENT
     *      401:
     *        description: UNAUTHENTICATED - User not logged in
     *      403:
     *        description: UNAUTHORIZED - User not object author deleting unreleased object
     *      404:
     *        description: NOT FOUND - Object not found
     */
    router.route('/users/:username/learning-objects/:id').all(this.proxyRequest((req: Request) => `/users/${encodeURIComponent(req.params.username)}/learning-objects/${encodeURIComponent(req.params.id)}?${req.query ? querystring.stringify(req.query) : ''}`));

    /**
     * @swagger
     * /users/{username}/learning-objects/{id}/children:
     *  get:
     *    description: Gets the children of a object
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: path
     *        name: username
     *        schema:
     *          type: string
     *        required: true
     *        description: The object author's username
     *      - in: path
     *        name: id
     *        schema:
     *          type: string
     *        required: true
     *        description: The object's cuid
     *    responses:
     *      200:
     *        description: OK
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: '#/components/schemas/LearningObject'
     *      404:
     *        description: NOT FOUND - Object not found
     */
    router.get('/users/:username/learning-objects/:id/children', this.proxyRequest((req: Request) => `/users/:username/learning-objects/${encodeURIComponent(req.params.id)}/children`));

    /**
     * @swagger
     * /users/{username}/learning-objects/{id}/parents:
     *  get:
     *    description: Gets a object's parents
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: path
     *        name: username
     *        schema:
     *          type: string
     *        required: true
     *        description: The object author's username
     *      - in: path
     *        name: id
     *        schema:
     *          type: string
     *        required: true
     *        description: The object's cuid
     *    responses:
     *      200:
     *        description: OK
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: '#/components/schemas/LearningObject'
     *      404:
     *        description: NOT FOUND - Object not found
     */
    router.get('/users/:username/learning-objects/:id/parents', this.proxyRequest((req: Request) => `/users/${req.params.username}/learning-objects/${encodeURIComponent(req.params.id)}/parents`));

    /**
     * @swagger
     * /learning-objects/{username}/{learningObjectName}/children:
     *  post:
     *    description: Sets the children of a object
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: path
     *        name: username
     *        schema:
     *          type: string
     *        required: true
     *        description: The object author's username
     *      - in: path
     *        name: learningObjectName
     *        schema:
     *          type: string
     *        required: true
     *        description: The object's id
     *    requestBody:
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            properties:
     *              children:
     *                type: array
     *                description: An array of object ids
     *    responses:
     *      200:
     *        description: OK
     *      401:
     *        description: UNAUTHENTICATED - User not logged in
     *      403:
     *        description: UNAUTHORIZED - User not object author and object is unreleased or user is not privileged
     *      404:
     *        description: NOT FOUND - Object not found
     */
    router.post('/learning-objects/:username/:learningObjectName/children', this.proxyRequest((req: Request) => `/learning-objects/${req.params.username}/${req.params.learningObjectName}/children`));

    /**
     * @swagger
     * /users/{username}/learning-objects:
     *  get:
     *    description: Searches a user's objects
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: path
     *        name: username
     *        schema:
     *          type: string
     *        required: true
     *        description: The author's username
     *    responses:
     *      200:
     *        description: OK
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: '#/components/schemas/LearningObject'
     *      401:
     *        description: UNAUTHENTICATED - User not logged in
     *      403:
     *        description: UNAUTHORIZED - User try to access another author's unreleased objects
     *      404:
     *        description: NOT FOUND - User not found
     *  post:
     *    description: Creates a object
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: path
     *        name: username
     *        schema:
     *          type: string
     *        required: true
     *        description: The author's username
     *    requestBody:
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/LearningObject'
     *    responses:
     *      200:
     *        description: OK
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/LearningObject'
     *      401:
     *        description: UNAUTHENTICATED - User not logged in
     *      403:
     *        description: UNAUTHORIZED - User try to access another author's objects
     *      409:
     *        description: CONFLICT - Object with same name exists under the same author
     */
    router.route('/users/:username/learning-objects')
      .get(this.proxyRequest((req: Request) => (LEARNING_OBJECT_ROUTES.LOAD_LEARNING_OBJECT_SUMMARY(req.params.username) + '?' + querystring.stringify(req.query))))
      .post(this.proxyRequest((req: Request) => LEARNING_OBJECT_ROUTES.CREATE_LEARNING_OBJECT(req.params.username)));

    /**
     * @swagger
     * /users/{username}/learning-objects/profile:
     *  get:
     *    description: Gets a author's objects
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: path
     *        name: username
     *        schema:
     *          type: string
     *        required: true
     *        description: The author's username
     *    responses:
     *      301:
     *        description: MOVED PERMENENTLY - Redirects to GET /users/:username/learning-objects
     */
    router.get('/users/:username/learning-objects/profile', this.proxyRequest((req: Request) => LEARNING_OBJECT_ROUTES.LOAD_USER_PROFILE(encodeURIComponent(req.params.username))));
    
    /**
     * @swagger
     * /learning-objects/multiple/{names}:
     *  delete:
     *    description: Deletes multiple objects
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: path
     *        name: names
     *        schema:
     *          type: string
     *        required: true
     *        description: The ids of the learning objects to delete, separated by commas
     *    responses:
     *      200:
     *        description: OK
     *      401:
     *        description: UNAUTHENTICATED - User not logged in
     *      403:
     *        description: UNAUTHORIZED - User is not author or is trying to delete a in review/released object
     */
    router.delete('/learning-objects/multiple/:names', this.proxyRequest((req: Request) => LEARNING_OBJECT_ROUTES.DELETE_MULTIPLE_LEARNING_OBJECTS(req.params.names.split(','))));

    /**
     * @swagger
     * /learning-objects:
     *  get:
     *    description: Gets learning objects
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: query
     *        name: page
     *        schema:
     *          type: number
     *        required: true
     *        description: The current page
     *      - in: query
     *        name: limit
     *        schema:
     *          type: number
     *        required: true
     *        description: The object return limit
     *      - in: query
     *        name: query
     *        schema:
     *          type: string
     *        required: true
     *        description: The query to search for
     *    responses:
     *      200:
     *        description: OK
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                total:
     *                  type: number
     *                  example: 200
     *                  required: true
     *                  description: The total number of objects
     *                objects:
     *                  type: array
     *                  required: true
     *                  description: The array of objects
     *                  items:
     *                    $ref: '#/components/schemas/LearningObject'
     */
    router.get('/learning-objects', this.proxyRequest((req: Request) => `${LEARNING_OBJECT_ROUTES.FETCH_LEARNING_OBJECTS}?${querystring.stringify(req.query)}`));

    /**
     * @swagger
     * /learning-objects/{learningObjectId}:
     *  get:
     *    description: Gets a learning object by id
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: path
     *        name: learningObjectId
     *        schema:
     *          type: string
     *        required: true
     *        description: The id of the object
     *    responses:
     *      200:
     *        description: OK
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/LearningObject'
     *      401:
     *        description: UNAUTHENTICATED - User not logged in and trying to access a non-released object
     *      403:
     *        description: UNAUTHORIZED - User is not author trying to access a unreleased object or unprivileged user trying to access in review object
     *      404:
     *        description: NOT FOUND - Object is not found
     */
    router.route('/learning-objects/:learningObjectId').get(this.proxyRequest((req: Request) => `/learning-objects/${encodeURIComponent(req.params.learningObjectId)}`));
    
    /**
     * @swagger
     * /learning-objects/{id}/children/summary:
     *  get:
     *    description: Gets an object's children's summaries
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: path
     *        name: id
     *        schema:
     *          type: string
     *        required: true
     *        description: The id of the object
     *    responses:
     *      200:
     *        description: OK
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: '#/components/schemas/LearningObject'
     *      401:
     *        description: UNAUTHENTICATED - User not logged in and trying to access a non-released object
     *      403:
     *        description: UNAUTHORIZED - User is not author trying to access a unreleased object or unprivileged user trying to access in review object
     *      404:
     *        description: NOT FOUND - Object is not found
     */
    router.get('/learning-objects/:id/children/summary', this.proxyRequest((req: Request) => LEARNING_OBJECT_ROUTES.GET_LEARNING_OBJECT_CHILDREN(req.params.id)));

    /**
     * @swagger
     * /admin/learning-objects:
     *  get:
     *    description: Gets privilege access objects
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: query
     *        name: page
     *        schema:
     *          type: number
     *        required: true
     *        description: The current page
     *      - in: query
     *        name: limit
     *        schema:
     *          type: number
     *        required: true
     *        description: The object return limit
     *      - in: query
     *        name: query
     *        schema:
     *          type: string
     *        required: true
     *        description: The query to search for
     *    responses:
     *      301:
     *        description: MOVED PERMENENTLY - Redirects to GET /learning-objects
     *      401:
     *        description: UNAUTHENTICATED - User not logged in
     *      403:
     *        description: UNAUTHORIZED - User is not privileged
     */
    router.get('/admin/learning-objects', this.proxyRequest((req: Request) => `${ADMIN_LEARNING_OBJECT_ROUTES.FETCH_LEARNING_OBJECTS}?${querystring.stringify(req.query)}`));
    
    /**
     * @swagger
     * /admin/learning-objects:
     *  patch:
     *    description: Privileged user update a learning object
     *    tags:
     *      - Learning Object Service
     *    requestBody:
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            properties:
     *              learningObject:
     *                required: true
     *                description: The learning object to update
     *                type: object
     *                $ref: '#/components/schemas/LearningObject'
     *    responses:
     *      301:
     *        description: MOVED PERMENENTLY - Redirects to PATCH /users/:username/learning-objects/:id
     *      401:
     *        description: UNAUTHENTICATED - User not logged in
     *      403:
     *        description: UNAUTHORIZED - User is not privileged
     */
    router.patch('/admin/learning-objects', this.proxyRequest((req: Request) => ADMIN_LEARNING_OBJECT_ROUTES.UPDATE_OBJECT()));
    
    /**
     * @swagger
     * /admin/learning-objects/{learningObjectId}:
     *  get:
     *    description: Privileged user get a learning object
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: path
     *        name: learningObjectId
     *        schema:
     *          type: string
     *        required: true
     *        description: The id of the object
     *    responses:
     *      301:
     *        description: MOVED PERMENENTLY - Redirects to GET /learning-objects/:id
     *      401:
     *        description: UNAUTHENTICATED - User not logged in
     *      403:
     *        description: UNAUTHORIZED - User is not privileged
     */
    router.get('/admin/learning-objects/:learningObjectId', this.proxyRequest((req: Request) => ADMIN_LEARNING_OBJECT_ROUTES.GET_FULL_OBJECT(req.params.learningObjectId)));

    /**
     * @swagger
     * /admin/users/{username}/learning-objects/{learningObjectName}:
     *  delete:
     *    description: Privileged user delete a object
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: path
     *        name: username
     *        schema:
     *          type: string
     *        required: true
     *        description: The username of the author
     *      - in: path
     *        name: learningObjectName
     *        schema:
     *          type: string
     *        required: true
     *        description: The id of the object
     *    responses:
     *      301:
     *        description: MOVED PERMENENTLY - Redirects to DELETE /users/:username/learning-objects/:id
     *      401:
     *        description: UNAUTHENTICATED - User not logged in
     *      403:
     *        description: UNAUTHORIZED - User is not privileged
     */
    router.delete('/admin/users/:username/learning-objects/:learningObjectName', this.proxyRequest((req: Request) => ADMIN_LEARNING_OBJECT_ROUTES.DELETE_LEARNING_OBJECT(req.params.username, req.params.learningObjectName)));
    
    /**
     * @swagger
     * /admin/users/{username}/learning-objects/multiple/{learningObjectIDs}:
     *  delete:
     *    description: Privileged user delete multiple objects
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: path
     *        name: username
     *        schema:
     *          type: string
     *        required: true
     *        description: The username of the author
     *      - in: path
     *        name: learningObjectIDs
     *        schema:
     *          type: string
     *        required: true
     *        description: The ids to delete, separated by commas
     *    responses:
     *      301:
     *        description: MOVED PERMENENTLY - Redirects to DELETE /users/:username/learning-objects/multiple/:learningObjectIDs
     *      401:
     *        description: UNAUTHENTICATED - User not logged in
     *      403:
     *        description: UNAUTHORIZED - User is not privileged
     */
    router.delete('/admin/users/:username/learning-objects/multiple/:learningObjectIDs', this.proxyRequest((req: Request) => ADMIN_LEARNING_OBJECT_ROUTES.DELETE_MULTIPLE_LEARNING_OBJECTS(req.params.username, req.params.learningObjectIDs)));

    /**
     * @swagger
     * /users/{userId}/learning-objects/{learningObjectId}/change-author:
     *  post:
     *    description: Changes a object's author
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: path
     *        name: userId
     *        schema:
     *          type: string
     *        required: true
     *        description: The user id of the object author
     *      - in: path
     *        name: learningObjectId
     *        schema:
     *          type: string
     *        required: true
     *        description: The object id
     *    requestBody:
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            properties:
     *              author:
     *                type: string
     *                description: The new author id
     *                required: true
     *                example: 000000000000000000000000
     *    responses:
     *      200:
     *        description: OK
     *      401:
     *        description: UNAUTHENTICATED - User not logged in
     *      403:
     *        description: UNAUTHORIZED - User is not privileged
     *      404:
     *        description: NOT FOUND - User or object not found
     */
    router.route('/users/:userId/learning-objects/:learningObjectId/change-author').post(this.proxyLambdaRequest((req: Request) => ADMIN_LAMBDA_ROUTES.CHANGE_AUTHOR(req.params.userId, req.params.learningObjectId)));
    

    /**
     * @swagger
     * /users/{username}/learning-objects/{id}/status:
     *  post:
     *    description: Changes the status of a learning-object
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: path
     *        name: username
     *        schema:
     *          type: string
     *        required: true
     *        description: The user id of the object author
     *      - in: path
     *        name: id
     *        schema:
     *          type: string
     *        required: true
     *        description: The object id
     *    requestBody:
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            properties:
     *              status:
     *                type: string
     *                description: The desired status of the learning object
     *                required: true
     *                example: proofing
     *    responses:
     *      200:
     *        description: OK
     *      400:
     *        description: BAD REQUEST - Object is not eligible for the specified status change
     *      401:
     *        description: UNAUTHENTICATED - User not logged in
     *      403:
     *        description: UNAUTHORIZED - User is not privileged
     *      404:
     *        description: NOT FOUND - User or object not found
     */
    router.post('/users/:username/learning-objects/:id/status', this.proxyRequest((req: Request) => `/users/:username/learning-objects/${encodeURIComponent(req.params.id)}/status`));
    return router;
  }

  private proxyRequest(callback: Function) {
    return proxy(LEARNING_OBJECT_SERVICE_URI, {
      proxyReqPathResolver: req => {
        return callback(req);
      },
    });
  }

  private proxyLambdaRequest(callback: Function) {
    return proxy(COA_API, {
      proxyReqPathResolver: req => {
        return callback(req);
      }
    });
  }
}