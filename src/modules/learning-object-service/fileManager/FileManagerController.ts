import { Router, Request } from "express";
import proxy = require("express-http-proxy");
import { Controller } from "../../../interfaces/Controller";
import { FILE_UPLOAD_ROUTES, LEARNING_OBJECT_ROUTES } from "../../../routes";

const LEARNING_OBJECT_SERVICE_URI =
  process.env.LEARNING_OBJECT_SERVICE_URI || 'localhost:5000';
const FILE_UPLOAD_API = process.env.FILE_UPLOAD_API || 'localhost:5100';

export class FileManagerController implements Controller {
  buildRouter(): Router {
    const router = Router();

    // Routes go here
    router.route('/:username/learning-objects/:cuid/versions/:version/bundle').get(this.proxyLearningObjectRequest((req: Request) => `/users/${encodeURIComponent(req.params.username)}/learning-objects/${encodeURIComponent(req.params.cuid)}/versions/${encodeURIComponent(req.params.version)}/bundle`));

    // FILE OPERATIONS
    /**
     * TODO: Deprecate in favor of more RESTful `/:learningObjectId/materials/files/:fileId` when clients have updated
     */
    router.route('/:learningObjectID/files/:fileId')
      .patch(this.proxyLearningObjectRequest((req: Request) => LEARNING_OBJECT_ROUTES.UPDATE_FILE({username: req.params.username, learningObjectId: req.params.learningObjectID, fileId: req.params.fileId})))
      .delete(this.proxyLearningObjectRequest((req: Request) => LEARNING_OBJECT_ROUTES.UPDATE_FILE({username: req.params.username, learningObjectId: req.params.learningObjectID, fileId: req.params.fileId})));
    
    router.route('/:learningObjectId/materials/files/:fileId')
      .patch(this.proxyLearningObjectRequest((req: Request) => LEARNING_OBJECT_ROUTES.UPDATE_FILE({username: req.params.username, learningObjectId: req.params.learningObjectId, fileId: req.params.fileId})))
      .delete(this.proxyLearningObjectRequest((req: Request) => LEARNING_OBJECT_ROUTES.UPDATE_FILE({username: req.params.username, learningObjectId: req.params.learningObjectId, fileId: req.params.fileId})));
    
    router.patch('/:id/pdf', this.proxyLearningObjectRequest((req: Request) => LEARNING_OBJECT_ROUTES.UPDATE_PDF(req.params.id)));
    
    router.get('/:id/files/:fileId/download', this.proxyLearningObjectRequest((req: Request) => LEARNING_OBJECT_ROUTES.DOWNLOAD_FILE({username: req.params.username, id: req.params.id, fileId: req.params.fileId, query: req.query})));
    
    router.route('/:id/materials').get(this.proxyLearningObjectRequest((req: Request) => LEARNING_OBJECT_ROUTES.GET_MATERIALS({username: req.params.username, id: req.params.id, query: req.query})));
    
    router.route('/:id/materials/files').post(this.proxyLearningObjectRequest((req: Request) => LEARNING_OBJECT_ROUTES.ADD_MATERIALS(req.params.username, req.params.id)));
    
    /**
     * FIXME: This route should be removed when the API is tested and  client is updated
     */
    router.route('/:objectId/files/:fileId/multipart').all(this.proxyLearningObjectRequest((req: Request) => FILE_UPLOAD_ROUTES.INIT_MULTIPART({username: req.params.username, objectId: req.params.objectId, fileId: req.params.fileId})));

    /**
     * FIXME: The admin suffix should be remove when API is tested and client is updated
     */
    router.route('/:objectId/files/:fileId/multipart/admin').post(this.proxyFileUploadRequest((req: Request) => FILE_UPLOAD_ROUTES.INIT_MULTIPART({username: req.params.username, objectId: req.params.objectId, fileId: req.params.fileId})));
    
    router.route('/:objectId/files/:fileId/multipart/:uploadId/admin')
      .patch(this.proxyFileUploadRequest((req: Request) => FILE_UPLOAD_ROUTES.FINALIZE_MULTIPART({username: req.params.username, objectId: req.params.objectId, fileId: req.params.fileId, uploadId: req.params.uploadId})))
      .delete(this.proxyFileUploadRequest((req: Request) => FILE_UPLOAD_ROUTES.ABORT_MULTIPART({username: req.params.username, objectId: req.params.objectId, fileId: req.params.fileId, uploadId: req.params.uploadId})));

    return router;
  }

  private proxyLearningObjectRequest(callback: Function) {
    return proxy(LEARNING_OBJECT_SERVICE_URI, {
      proxyReqPathResolver: req => {
        return callback(req);
      },
    });
  }

  private proxyFileUploadRequest(callback: Function) {
    return proxy(FILE_UPLOAD_API, {
      proxyReqPathResolver: req => {
        return callback(req);
      },
    });
  }
}