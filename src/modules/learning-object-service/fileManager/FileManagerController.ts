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
    router.route('/:username/learning-objects/:cuid/versions/:version/bundle').get(
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          return `/users/${encodeURIComponent(
            req.params.username,
          )}/learning-objects/${encodeURIComponent(
            req.params.cuid,
          )}/versions/${encodeURIComponent(
            req.params.version,
          )}/bundle`;
        },
      }),
    );

    // FILE OPERATIONS
    /**
     * TODO: Deprecate in favor of more RESTful `/:learningObjectId/materials/files/:fileId` when clients have updated
     */
    router
      .route('/:learningObjectID/files/:fileId')
      .patch(
        proxy(LEARNING_OBJECT_SERVICE_URI, {
          proxyReqPathResolver: req => {
            const username = req.params.username;
            const learningObjectId = req.params.learningObjectID;
            const fileId = req.params.fileId;
            return LEARNING_OBJECT_ROUTES.UPDATE_FILE({
              username,
              learningObjectId,
              fileId,
            });
          },
        }),
      )
      .delete(
        proxy(LEARNING_OBJECT_SERVICE_URI, {
          proxyReqPathResolver: req => {
            const username = req.params.username;
            const learningObjectId = req.params.learningObjectID;
            const fileId = req.params.fileId;
            return LEARNING_OBJECT_ROUTES.UPDATE_FILE({
              username,
              learningObjectId,
              fileId,
            });
          },
        }),
      );
    router
      .route('/:learningObjectId/materials/files/:fileId')
      .patch(
        proxy(LEARNING_OBJECT_SERVICE_URI, {
          proxyReqPathResolver: req => {
            const username = req.params.username;
            const learningObjectId = req.params.learningObjectId;
            const fileId = req.params.fileId;
            return LEARNING_OBJECT_ROUTES.UPDATE_FILE({
              username,
              learningObjectId,
              fileId,
            });
          },
        }),
      )
      .delete(
        proxy(LEARNING_OBJECT_SERVICE_URI, {
          proxyReqPathResolver: req => {
            const username = req.params.username;
            const learningObjectId = req.params.learningObjectId;
            const fileId = req.params.fileId;
            return LEARNING_OBJECT_ROUTES.UPDATE_FILE({
              username,
              learningObjectId,
              fileId,
            });
          },
        }),
      );
    router.patch(
      '/:id/pdf',
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req =>
          LEARNING_OBJECT_ROUTES.UPDATE_PDF(req.params.id),
      }),
    );
    router.get(
      '/:id/files/:fileId/download',
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          const username = req.params.username;
          return LEARNING_OBJECT_ROUTES.DOWNLOAD_FILE({
            username,
            id: req.params.id,
            fileId: req.params.fileId,
            query: req.query,
          });
        },
      }),
    );
    router.route('/:id/materials').get(
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          const username = req.params.username;
          const id = req.params.id;
          return LEARNING_OBJECT_ROUTES.GET_MATERIALS({
            username,
            id,
            query: req.query,
          });
        },
      }),
    );
    router.route('/:id/materials/files').post(
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          const username = req.params.username;
          const id = req.params.id;
          return LEARNING_OBJECT_ROUTES.ADD_MATERIALS(username, id);
        },
      }),
    );
    /**
     * FIXME: This route should be removed when the API is tested and  client is updated
     */
    router.route('/:objectId/files/:fileId/multipart').all(
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          const username = req.params.username;
          return FILE_UPLOAD_ROUTES.INIT_MULTIPART({
            username,
            objectId: req.params.objectId,
            fileId: req.params.fileId,
          });
        },
      }),
    );

    /**
       * FIXME: The admin suffix should be remove when API is tested and client is updated
       */
    router.route('/:objectId/files/:fileId/multipart/admin').post(
      proxy(FILE_UPLOAD_API, {
        proxyReqPathResolver: req => {
          const username = req.params.username;
          return FILE_UPLOAD_ROUTES.INIT_MULTIPART({
            username,
            objectId: req.params.objectId,
            fileId: req.params.fileId,
          });
        },
      }),
    );
    router
      .route('/:objectId/files/:fileId/multipart/:uploadId/admin')
      .patch(
        proxy(FILE_UPLOAD_API, {
          proxyReqPathResolver: req => {
            const username = req.params.username;
            return FILE_UPLOAD_ROUTES.FINALIZE_MULTIPART({
              username,
              objectId: req.params.objectId,
              fileId: req.params.fileId,
              uploadId: req.params.uploadId,
            });
          },
        }),
      )
      .delete(
        proxy(FILE_UPLOAD_API, {
          proxyReqPathResolver: req => {
            const username = req.params.username;
            return FILE_UPLOAD_ROUTES.ABORT_MULTIPART({
              username,
              objectId: req.params.objectId,
              fileId: req.params.fileId,
              uploadId: req.params.uploadId,
            });
          },
        }),
      );

    return router;
  }
}