import 'dotenv/config';
import * as express from 'express';
import { Router } from 'express';

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
  }

}
