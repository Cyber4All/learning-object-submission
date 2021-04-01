import { Router } from "express";
import proxy = require("express-http-proxy");
import { Controller } from "../../../interfaces/Controller";
import { ADMIN_LEARNING_OBJECT_ROUTES, LEARNING_OBJECT_ROUTES } from "../../../routes";
import * as querystring from 'querystring';

const LEARNING_OBJECT_SERVICE_URI =
  process.env.LEARNING_OBJECT_SERVICE_URI || 'localhost:5000';

export class ObjectsController implements Controller {
  buildRouter(): Router {
    const router = Router();

    // Routes go here

    router.route('/users/:username/learning-objects/:id')
      .all(proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          let uri = `/users/${encodeURIComponent(req.params.username)}/learning-objects/${encodeURIComponent(req.params.id)}`;
          if (req.query) {
            uri += '?' + querystring.stringify(req.query);
          }
          return uri;
        },
      }));

    // Retrieves the materials for a learning object
    router.get(
      '/users/:username/learning-objects/:id/materials',
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          return `/users/:username/learning-objects/${encodeURIComponent(req.params.id)}/materials?${querystring.stringify(
            req.query,
          )}`;
        },
      }),
    );

    router.get(
      '/users/:username/learning-objects/:id/children',
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          return `/users/:username/learning-objects/${encodeURIComponent(req.params.id)}/children`;
        },
      }),
    );

    router.get(
      '/users/:username/learning-objects/:id/parents',
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          return `/users/:username/learning-objects/${encodeURIComponent(req.params.id)}/parents`;
        },
      }),
    );

    router.post(
      '/learning-objects/:username/:learningObjectName/children',
      proxy(LEARNING_OBJECT_SERVICE_URI),
    );
    router.delete(
      '/learning-objects/:username/:learningObjectName/children',
      proxy(LEARNING_OBJECT_SERVICE_URI),
    );

    router.delete(
      '/:learningObjectName',
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          const learningObjectName = req.params.learningObjectName;
          return LEARNING_OBJECT_ROUTES.DELETE_LEARNING_OBJECT_BY_NAME(
            learningObjectName,
          );
        },
      }),
    );

    router
      .route('/:learningObjectId')
      .patch(
        proxy(LEARNING_OBJECT_SERVICE_URI, {
          proxyReqPathResolver: req => {
            const authorUsername = req.params.username;
            const learningObjectId = req.params.learningObjectId;
            return LEARNING_OBJECT_ROUTES.UPDATE_LEARNING_OBJECT({
              authorUsername,
              id: learningObjectId,
            });
          },
        }),
      )
      .delete(
        proxy(LEARNING_OBJECT_SERVICE_URI, {
          proxyReqPathResolver: req => {
            const authorUsername = req.params.username;
            const learningObjectId = req.params.learningObjectId;
            return LEARNING_OBJECT_ROUTES.DELETE_LEARNING_OBJECT({
              authorUsername,
              id: learningObjectId,
            });
          },
        }),
      );

    router
      .route('')
      .get(
        proxy(LEARNING_OBJECT_SERVICE_URI, {
          proxyReqPathResolver: req => {
            return (
              LEARNING_OBJECT_ROUTES.LOAD_LEARNING_OBJECT_SUMMARY(
                req.params.username,
              ) +
              '?' +
              querystring.stringify(req.query)
            );
          },
        }),
      )
      .post(
        proxy(LEARNING_OBJECT_SERVICE_URI, {
          proxyReqPathResolver: req => {
            const authorUsername = req.params.username;
            return LEARNING_OBJECT_ROUTES.CREATE_LEARNING_OBJECT(
              authorUsername,
            );
          },
        }),
      );

    router.get(
      '/profile',
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          return LEARNING_OBJECT_ROUTES.LOAD_USER_PROFILE(
            encodeURIComponent(req.params.username),
          );
        },
      }),
    );
    router.delete(
      '/multiple/:names',
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          let names = req.params.names.split(',');
          return LEARNING_OBJECT_ROUTES.DELETE_MULTIPLE_LEARNING_OBJECTS(names);
        },
      }),
    );

    router.get(
      '',
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          let route = `${LEARNING_OBJECT_ROUTES.FETCH_LEARNING_OBJECTS
            }?${querystring.stringify(req.query)}`;
          return route;
        },
      }),
    );
    router.route('/:learningObjectId').get(
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          return `/learning-objects/${encodeURIComponent(
            req.params.learningObjectId,
          )}`;
        },
      }),
    );

    router.get(
      '/:author/:learningObjectName',
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          let username = req.params.author;
          let learningObjectName = req.params.learningObjectName;
          return LEARNING_OBJECT_ROUTES.LOAD_LEARNING_OBJECT(
            username,
            learningObjectName,
          );
        },
      }),
    );
    router.get(
      '/:author',
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          return LEARNING_OBJECT_ROUTES.FETCH_USERS_LEARNING_OBJECTS(
            req.params.author,
          );
        },
      }),
    );
    router.get(
      '/:id/children/summary',
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          return LEARNING_OBJECT_ROUTES.GET_LEARNING_OBJECT_CHILDREN(
            req.params.id,
          );
        },
      }),
    );

    // Learning Object Routes
    router.get(
      '/learning-objects',
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          const route = `${ADMIN_LEARNING_OBJECT_ROUTES.FETCH_LEARNING_OBJECTS
            }?${querystring.stringify(req.query)}`;
          return route;
        },
      }),
    );
    router.patch(
      '/learning-objects',
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          const route = ADMIN_LEARNING_OBJECT_ROUTES.UPDATE_OBJECT();
          return route;
        },
      }),
    );
    router.get(
      '/learning-objects/:learningObjectId',
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          const route = ADMIN_LEARNING_OBJECT_ROUTES.GET_FULL_OBJECT(
            req.params.learningObjectId,
          );
          return route;
        },
      }),
    );

    router.delete(
      '/users/:username/learning-objects/:learningObjectName',
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          const username = req.params.username;
          const learningObjectName = req.params.learningObjectName;
          return ADMIN_LEARNING_OBJECT_ROUTES.DELETE_LEARNING_OBJECT(
            username,
            learningObjectName,
          );
        },
      }),
    );
    router.delete(
      '/users/:username/learning-objects/multiple/:learningObjectIDs',
      proxy(LEARNING_OBJECT_SERVICE_URI, {
        proxyReqPathResolver: req => {
          const username = req.params.username;
          const learningObjectIDs = req.params.learningObjectIDs;
          return ADMIN_LEARNING_OBJECT_ROUTES.DELETE_MULTIPLE_LEARNING_OBJECTS(
            username,
            learningObjectIDs,
          );
        },
      }),
    );

    return router;
  }
}