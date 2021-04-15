import * as express from 'express';
import { Router } from 'express';
// tslint:disable-next-line:no-require-imports
import proxy = require('express-http-proxy');
import * as querystring from 'querystring';
import 'dotenv/config';
import {
  BUSINESS_CARD_ROUTES,
  STATS_ROUTE,
  ADMIN_LAMBDA_ROUTES,
} from '../../routes';

const BUSINESS_CARD_API = process.env.BUSINESS_CARD_API || 'localhost:3009';
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

    router.use('/users', this.buildUserRouter());
    router.use(
      '/users/:username/learning-objects',
      this.buildUserLearningObjectRouter,
    );

    router.use('/learning-objects', this.buildPublicLearningObjectRouter());
  }

  /**
   * Route handlers for /users
   *
   * @returns {Router}
   */
  private buildUserRouter() {
    let router: Router = express.Router();

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
