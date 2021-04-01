import * as express from 'express';
import { Router } from 'express';
// tslint:disable-next-line:no-require-imports
import proxy = require('express-http-proxy');
import * as querystring from 'querystring';
import 'dotenv/config';
import {
  BUSINESS_CARD_ROUTES,
  STATS_ROUTE,
  ADMIN_USER_ROUTES,
  USER_ROUTES,
  UTILITY_ROUTES,
  ADMIN_LAMBDA_ROUTES,
} from '../../routes';
import { SocketInteractor } from '../../interactors/SocketInteractor';

const USERS_API = process.env.USERS_API || 'localhost:4000';
const BUSINESS_CARD_API = process.env.BUSINESS_CARD_API || 'localhost:3009';
const UTILITY_API = process.env.UTILITY_URI || 'localhost:9000';
const COA_API = process.env.COA_SERVICE || 'localhost:8500';

/**
 * Serves as a factory for producing a router for the express app.rt
 *
 * @author Sean Donnelly
 */
export default class ExpressRouteDriver {
  /**
   * Produces a configured express router
   */
  public static buildRouter() {
    let e = new ExpressRouteDriver();
    let router: Router = express.Router();
    e.setRoutes(router);
    return router;
  }

  private constructor() { }

  /**
   * Defines the active routes for the API. Routes take an async callback function that contains a request and response object.
   * The callback awaits a particular interactor function that executes the connected business use case.
   *
   * @param router the router being used by the webserver
   */
  setRoutes(router: Router) {
    router.get('/', function (req, res) {
      res.json({
        message: 'Welcome to the C.L.A.R.K. Gateway API',
      });
    });

     // Lambda routes
    router.route('/users/:userId/learning-objects/:learningObjectId/change-author').post(
      proxy(COA_API, {
        proxyReqPathResolver: req => {
        const userId = req.params.userId;
        const learningObjectId = req.params.learningObjectId;
        const route = ADMIN_LAMBDA_ROUTES.CHANGE_AUTHOR(userId, learningObjectId);
        return route;
        },
      }),
    );

    // GUIDELINE ROLES
    router.route('/guidelines/members').get(
      proxy(USERS_API, {
        proxyReqPathResolver: req => {
          return `/guidelines/members`;
        },
      }),
    );

    router.route('/guidelines/members/:memberId').put(
      proxy(USERS_API, {
        proxyReqPathResolver: req => {
          return `/guidelines/members/${encodeURIComponent(req.params.memberId)}`;
        },
      }),
    );

    router.route('/guidelines/members/:memberId').delete(
      proxy(USERS_API, {
        proxyReqPathResolver: req => {
          return `/guidelines/members/${encodeURIComponent(req.params.memberId)}`;
        },
      }),
    );

    router.use('/users', this.buildUserRouter());
    router.use(
      '/users/:username/learning-objects',
      this.buildUserLearningObjectRouter,
    );

    router.use('/learning-objects', this.buildPublicLearningObjectRouter());

    router.get(
      '/users/identifiers/active',
      proxy(USERS_API, {
        proxyReqPathResolver: req => {
          return `/users/identifiers/active?${querystring.stringify(
            req.query,
          )}`;
        },
      }),
    );

    router.get(
      '/users/curators/:collection',
      proxy(USERS_API, {
        proxyReqPathResolver: req => {
          return USER_ROUTES.FETCH_COLLECTION_CURATORS(req.params.collection);
        },
      }),
    );

    router.post(
      '/users/password',
      proxy(USERS_API, {
        proxyReqPathResolver: req => {
          return `/users/password`;
        },
      }),
    );

    router.get(
      '/users/update',
      proxy(USERS_API, {
        proxyReqPathResolver: req => {
          return `/users/update?${querystring.stringify(req.query)}`;
        },
      }),
    );

    router.get(
      '/collections/:collectionName/members',
      proxy(USERS_API, {
        proxyReqPathResolver: req => {
          return ADMIN_USER_ROUTES.FETCH_COLLECTION_MEMBERS(
            req.params.collectionName,
            req.query,
          );
        },
      }),
    );

    router.put(
      '/collections/:collectionName/members/:memberId',
      proxy(USERS_API, {
        proxyReqPathResolver: req => {
          return ADMIN_USER_ROUTES.ASSIGN_COLLECTION_MEMBERSHIP(
            req.params.collectionName,
            req.params.memberId,
          );
        },
      }),
    );

    router.patch(
      '/collections/:collectionName/members/:memberId',
      proxy(USERS_API, {
        proxyReqPathResolver: req => {
          return ADMIN_USER_ROUTES.EDIT_COLLECTION_MEMBERSHIP(
            req.params.collectionName,
            req.params.memberId,
          );
        },
      }),
    );

    router.delete(
      '/collections/:collectionName/members/:memberId',
      proxy(USERS_API, {
        proxyReqPathResolver: req => {
          return ADMIN_USER_ROUTES.REMOVE_COLLECTION_MEMBERSHIP(
            req.params.collectionName,
            req.params.memberId,
          );
        },
      }),
    );
    // get the status for the banner
    router.get(
      '/status',
      proxy(UTILITY_API, {
        proxyReqPathResolver: req => {
          return UTILITY_ROUTES.STATUS;
        },
      }),
    );
    // get the maintenace status for maintenance page
    router.get(
      `/maintenance`,
      proxy(UTILITY_API, {
        proxyReqPathResolver: req => {
          return UTILITY_ROUTES.MAINTENANCE;
        },
      }),
    );
    // get the client version to see if there is an update
    router.get(
      '/clientversion/:clientVersion',
      proxy(UTILITY_API, {
        proxyReqPathResolver: req => {
          return `/clientversion/${encodeURIComponent(req.params.clientVersion)}`;
        },
      }),
    );
    router.get(
      '/outages',
      proxy(UTILITY_API, {
        proxyReqPathResolver: req => {
          return `/outages?pastIssues=${encodeURIComponent(req.query.pastIssues)}`
        },
      }),
    );
  }

  /**
   * Route handlers for /users
   *
   * @returns {Router}
   */
  private buildUserRouter() {
    let router: Router = express.Router();

    // Welcome page
    router
      .route('')
      .get(
        proxy(USERS_API, {
          proxyReqPathResolver: req => {
            return '/users';
          },
        }),
      )
      // Register
      .post(
        proxy(USERS_API, {
          proxyReqPathResolver: req => {
            return '/users';
          },
        }),
      )
      .patch(
        proxy(USERS_API, {
          proxyReqPathResolver: req => {
            return '/users';
          },
        }),
      );
    router.get(
      '/stats',
      proxy(USERS_API, {
        proxyReqPathResolver: req => {
          return STATS_ROUTE.USER_STATS;
        },
      }),
    );
    // Login
    router.post(
      '/tokens',
      proxy(USERS_API, {
        proxyReqPathResolver: req => {
          return '/users/tokens';
        },
      }),
    );

    router.get(
      '/:id/tokens',
      proxy(USERS_API, {
        proxyReqPathResolver: req => {
          return `/users/${req.params.id}/tokens?${querystring.stringify(
            req.query,
          )}`;
        },
      }),
    );

    router.route('/:username/profile').get(
      proxy(USERS_API, {
        proxyReqPathResolver: req => {
          return `/users/${req.params.username}/profile`;
        },
      }),
    );

    // refresh token
    router.get(
      '/tokens/refresh',
      proxy(USERS_API, {
        proxyReqPathResolver: req => {
          return '/users/tokens/refresh';
        },
      }),
    );
    // Remove account
    router.route('/:username').delete(
      proxy(USERS_API, {
        proxyReqPathResolver: req => {
          return `/users/${encodeURIComponent(req.params.username)}`;
        },
      }),
    );

    // Get organizations for typeahead
    router.route('/organizations').get(
      proxy(USERS_API, {
        proxyReqPathResolver: req => {
          return `/users/organizations?${querystring.stringify(req.query)}`;
        },
      }),
    );

    router
      .route('/tokens')
      // Validate Token
      .get(
        proxy(USERS_API, {
          proxyReqPathResolver: req => {
            return `/users/tokens`;
          },
        }),
      );
    // Logout
    router.delete(
      '/:username/tokens',
      proxy(USERS_API, {
        proxyReqPathResolver: req => {
          return `/users/${encodeURIComponent(req.params.username)}/tokens`;
        },
      }),
    );
    router.route('/ota-codes').all(
      proxy(USERS_API, {
        proxyReqPathResolver: req => {
          return `/users/ota-codes?${querystring.stringify(req.query)}`;
        },
        // @ts-ignore
        userResDecorator: function (proxyRes, proxyResData, userReq, userRes) {
          try {
            let data = JSON.parse(proxyResData.toString('utf8'));
            if (data.username) {
              SocketInteractor.init().sendMessage(
                data.username,
                'VERIFIED_EMAIL',
              );
              userRes.redirect('http://clark.center');
              return '';
            } else {
              return proxyResData;
            }
          } catch (e) {
            return proxyResData;
          }
        },
      }),
    );

    router.get(
      '/search',
      proxy(USERS_API, {
        proxyReqPathResolver: req => {
          return `/users?${querystring.stringify(req.query)}`;
        },
      }),
    );
    router.get(
      '/validate-captcha',
      proxy(USERS_API, {
        proxyReqPathResolver: req => {
          return `/validate-captcha?${querystring.stringify(req.query)}`;
        },
      }),
    );

    // BUSINESS CARDS
    router.get(
      '/:username/cards',
      proxy(BUSINESS_CARD_API, {
        proxyReqPathResolver: req => {
          const username = req.params.username;
          return BUSINESS_CARD_ROUTES.CARD(username, req.query);
        },
      }),
    );

    router.get(
      '/:username/notifications',
      proxy(USERS_API, {
        proxyReqPathResolver: req => {
          return `/users/${encodeURIComponent(
            req.params.username,
          )}/notifications`;
        },
      }),
    );
    router.get(
      '/:id/roles',
      proxy(USERS_API, {
        proxyReqPathResolver: req => {
          return ADMIN_USER_ROUTES.FETCH_USER_ROLES(req.params.id);
        },
      }),
    );

    router.get(
      '/:username',
      proxy(USERS_API, {
        proxyReqPathResolver: req => {
          return USER_ROUTES.FETCH_USER(req.params.username);
        },
      }),
    );

    return router;
  }

  /**
   * Route handlers for /users/:username/learning-objects
   *
   * @returns {Router}
   */
  private buildUserLearningObjectRouter(
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    let router: Router = express.Router({ mergeParams: true });
    const parentParams = _req.params;
    return router(_req, res, next);
  }

  /**
   * Route handlers for /learning-objects
   *
   * @private
   * @returns {Router}
   * @memberof ExpressRouteDriver
   */
  private buildPublicLearningObjectRouter() {
    let router: Router = express.Router();
    
    return router;
  }
}
