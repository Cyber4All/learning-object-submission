import { Router, Request } from "express";
import proxy = require("express-http-proxy");
import { Controller } from "../../../interfaces/Controller";
import { FILE_UPLOAD_ROUTES, LEARNING_OBJECT_ROUTES } from "../../../routes";

const LEARNING_OBJECT_SERVICE_URI =
  process.env.LEARNING_OBJECT_SERVICE_URI || 'localhost:5000';

export class FileManagerController implements Controller {
  buildRouter(): Router {
    const router = Router();

    /**
     * @swagger
     * /{username}/learning-objects/{cuid}/versions/{version}/bundle:
     *  get:
     *    description: Download a object
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: path
     *        name: username
     *        schema:
     *            type: string
     *        required: true
     *        description: The username of the author
     *      - in: path
     *        name: cuid
     *        schema:
     *            type: string
     *        required: true
     *        description: The cuid of the object to download
     *      - in: path
     *        name: version
     *        schema:
     *            type: number
     *        required: true
     *        description: The version number of the object
     *    responses:
     *      200:
     *        description: OK - Downloads a zip file
     *        content:
     *          application/zip:
     *            schema:
     *              type: string
     *              format: binary
     *      401:
     *        description: UNAUTHENTICATED - User is not logged in
     *      403:
     *        description: UNAUTHORIZED - User is trying to access an in review object as a unprivileged user
     *      404:
     *        description: NOT FOUND - Object not found
     */
    router.route('/users/:username/learning-objects/:cuid/versions/:version/bundle').get(this.proxyLearningObjectRequest((req: Request) => `/users/${encodeURIComponent(req.params.username)}/learning-objects/${encodeURIComponent(req.params.cuid)}/versions/${encodeURIComponent(req.params.version)}/bundle`));
    
    /**
     * @swagger
     * /users/{username}/learning-objects/{learningObjectId}/materials/files/{fileId}:
     *  patch:
     *    description: Updates a file metadata
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: path
     *        name: username
     *        schema:
     *            type: string
     *        required: true
     *        description: The username of the author
     *      - in: path
     *        name: learningObjectId
     *        schema:
     *            type: string
     *        required: true
     *        description: The id of the object
     *      - in: path
     *        name: fileId
     *        schema:
     *            type: string
     *        required: true
     *        description: The file's id
     *    requestBody:
     *      content:
     *        application/json:
     *          schema:
     *            type: Object
     *            description: A partial object of type FileMetadata
     *            $ref: '#/components/schemas/FileMetadata'
     *    responses:
     *      204:
     *        description: NO CONTENT
     *      401:
     *        description: UNAUTHENTICATED - User is not logged in
     *      403:
     *        description: UNAUTHORIZED - User does not have permission to update the file
     *      404:
     *        description: NOT FOUND - Object or file not found
     *  delete:
     *    description: Deletes a file from a object
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: path
     *        name: username
     *        schema:
     *            type: string
     *        required: true
     *        description: The username of the author
     *      - in: path
     *        name: learningObjectId
     *        schema:
     *            type: string
     *        required: true
     *        description: The id of the object
     *      - in: path
     *        name: fileId
     *        schema:
     *            type: string
     *        required: true
     *        description: The file's id
     *    responses:
     *      204:
     *        description: NO CONTENT
     *      401:
     *        description: UNAUTHENTICATED - User is not logged in
     *      403:
     *        description: UNAUTHORIZED - User does not have permission to delete the file
     *      404:
     *        description: NOT FOUND - Object or file not found
     */
    router.route('/users/:username/learning-objects/:learningObjectId/materials/files/:fileId')
      .patch(this.proxyLearningObjectRequest((req: Request) => LEARNING_OBJECT_ROUTES.UPDATE_FILE({username: req.params.username, learningObjectId: req.params.learningObjectId, fileId: req.params.fileId})))
      .delete(this.proxyLearningObjectRequest((req: Request) => LEARNING_OBJECT_ROUTES.UPDATE_FILE({username: req.params.username, learningObjectId: req.params.learningObjectId, fileId: req.params.fileId})));
    
    /**
     * @swagger
     * /users/{username}/learning-objects/{id}/pdf:
     *  patch:
     *    description: Update a object's README pdf
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: path
     *        name: username
     *        schema:
     *            type: string
     *        required: true
     *        description: The username of the author
     *      - in: path
     *        name: id
     *        schema:
     *            type: string
     *        required: true
     *        description: The id of the object
     *    responses:
     *      200:
     *        description: OK
     *      401:
     *        description: UNAUTHENTICATED - User is not logged in
     *      403:
     *        description: UNAUTHORIZED - User does not have permission to update the README
     *      404:
     *        description: NOT FOUND - Object not found
     */
    router.patch('/users/:username/learning-objects/:id/pdf', this.proxyLearningObjectRequest((req: Request) => LEARNING_OBJECT_ROUTES.UPDATE_PDF(req.params.id)));
    
    /**
     * @swagger
     * /users/{username}/learning-objects/{id}/files/{fileId}/download:
     *  get:
     *    description: Downloads a file
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: path
     *        name: username
     *        schema:
     *            type: string
     *        required: true
     *        description: The username of the author
     *      - in: path
     *        name: id
     *        schema:
     *            type: string
     *        required: true
     *        description: The id of the object
     *      - in: path
     *        name: fileId
     *        schema:
     *            type: string
     *        required: true
     *        description: The file's id
     *    responses:
     *      200:
     *        description: OK - Downloads a file
     *        content:
     *          application/octet-stream:
     *            schema:
     *              type: string
     *              format: binary
     *      401:
     *        description: UNAUTHENTICATED - User is not logged in
     *      403:
     *        description: UNAUTHORIZED - User is trying to access an in review object as a unprivileged user
     *      404:
     *        description: NOT FOUND - Object or file not found
     */
    router.get('/users/:username/learning-objects/:id/files/:fileId/download', this.proxyLearningObjectRequest((req: Request) => LEARNING_OBJECT_ROUTES.DOWNLOAD_FILE({username: req.params.username, id: req.params.id, fileId: req.params.fileId, query: req.query})));
    
    /**
     * @swagger
     * /users/{username}/learning-objects/{id}/materials:
     *  get:
     *    description: Gets an object's materials
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: path
     *        name: username
     *        schema:
     *            type: string
     *        required: true
     *        description: The username of the author
     *      - in: path
     *        name: id
     *        schema:
     *            type: string
     *        required: true
     *        description: The id of the object
     *    responses:
     *      200:
     *        description: OK
     *        content:
     *          application/json:
     *            schema:
     *              oneOf:
     *                - $ref: '#/components/schemas/File'
     *                - $ref: '#/components/schemas/PDF'
     *                - $ref: '#/components/schemas/Url'
     *                - $ref: '#/components/schemas/FolderDescription'
     *      401:
     *        description: UNAUTHENTICATED - User is not logged in and trying to access a in review object
     *      403:
     *        description: UNAUTHORIZED - User is trying to access an in review object as a unprivileged user
     *      404:
     *        description: NOT FOUND - Object not found
     */
    router.route('/users/:username/learning-objects/:id/materials').get(this.proxyLearningObjectRequest((req: Request) => LEARNING_OBJECT_ROUTES.GET_MATERIALS({username: req.params.username, id: req.params.id, query: req.query})));
    
    /**
     * @swagger
     * /users/{username}/learning-objects/{id}/materials/files:
     *  post:
     *    description: Adds file meta data to a object
     *    tags:
     *      - Learning Object Service
     *    parameters:
     *      - in: path
     *        name: username
     *        schema:
     *            type: string
     *        required: true
     *        description: The username of the author
     *      - in: path
     *        name: id
     *        schema:
     *            type: string
     *        required: true
     *        description: The id of the object
     *    requestBody:
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            properties:
     *              fileMeta:
     *                type: array
     *                items:
     *                  $ref: '#/components/schemas/FileMetadata'
     *    responses:
     *      200:
     *        description: OK
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                files:
     *                  type: array
     *                  items:
     *                    $ref: '#/components/schemas/FileMetadata'
     *      401:
     *        description: UNAUTHENTICATED - User is not logged in
     *      403:
     *        description: UNAUTHORIZED - User is trying to access an in review object as a unprivileged user
     *      404:
     *        description: NOT FOUND - Object not found
     */
    router.route('/users/:username/learning-objects/:id/materials/files').post(this.proxyLearningObjectRequest((req: Request) => LEARNING_OBJECT_ROUTES.ADD_MATERIALS(req.params.username, req.params.id)));

    return router;
  }

  private proxyLearningObjectRequest(callback: Function) {
    return proxy(LEARNING_OBJECT_SERVICE_URI, {
      proxyReqPathResolver: req => {
        return callback(req);
      },
    });
  }
}