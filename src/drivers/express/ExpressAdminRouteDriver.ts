import 'dotenv/config';
import * as express from 'express';
import { Router } from 'express';
import * as proxy from 'express-http-proxy';
import {
  ADMIN_USER_ROUTES,
  ADMIN_MAILER_ROUTES,
} from '../../routes';

const USERS_API = process.env.USERS_API || 'localhost:4000';

/**
 * Serves as a factory for producing a router for the express app.rt
 *
 * @author Gustavus Shaw II
 */
export default class ExpressAdminRouteDriver {
  /**
   * Produces a configured express router
   */
  public static buildRouter() {
    let e = new ExpressAdminRouteDriver();
    let router: Router = express.Router();
    e.setRoutes(router);
    return router;
  }

  private constructor() {}

  /**
   * Defines the active routes for the API. Routes take an async callback function that contains a request and response object.
   * The callback awaits a particular interactor function that executes the connected business use case.
   *
   * @param router the router being used by the webserver
   */
  setRoutes(router: Router) {
    router.get('/', function(req, res) {
      res.json({
        message: 'Welcome to the Admin C.L.A.R.K. Gateway API',
      });
    });

    // User Routes
    router.get(
      '/users',
      proxy(USERS_API, {
        proxyReqPathResolver: req => {
          const route = ADMIN_USER_ROUTES.FETCH_USERS_WITH_FILTER(req.query);
          return route;
        },
      }),
    );
    router.delete(
      '/users/:id',
      proxy(USERS_API, {
        proxyReqPathResolver: req => {
          const route = ADMIN_USER_ROUTES.DELETE_USER(req.params.id);
          return route;
        },
      }),
    );

    // Mailer Routes
    router.post(
      '/mail',
      proxy(USERS_API, {
        proxyReqPathResolver: req => {
          const route = ADMIN_MAILER_ROUTES.SEND_BASIC_EMAIL;
          return route;
        },
      }),
    );
    router
      .route('/mail/templates')
      .get(
        proxy(USERS_API, {
          proxyReqPathResolver: req => {
            const route = ADMIN_MAILER_ROUTES.GET_AVAILABLE_TEMPLATES;
            return route;
          },
        }),
      )
      .post(
        proxy(USERS_API, {
          proxyReqPathResolver: req => {
            const route = ADMIN_MAILER_ROUTES.SEND_TEMPLATE_EMAIL;
            return route;
          },
        }),
      );
  }

}
