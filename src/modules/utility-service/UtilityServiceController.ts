import { Router } from "express";
import proxy = require("express-http-proxy");
import { Controller } from "../../interfaces/Controller";
import { UTILITY_ROUTES } from "../../routes";

const UTILITY_API = process.env.UTILITY_URI || 'localhost:9000';

export class UtilityServiceController implements Controller {
    buildRouter(): Router {
        const router = Router();
        
        /**
         * @swagger
         * /status:
         *  get:
         *      description: Gets the status for the banner
         *      tags:
         *          - Utility Service
         *      responses:
         *          200:
         *              description: OK - Returns status report
         *              content:
         *                  application/json:
         *                          schema:
         *                              $ref: '#/components/schemas/Status'
         */
        router.get(
            '/status',
            this.proxyRequest((req: Request) => '/status')
        );

        /**
         * @swagger
         * /maintenance:
         *  get:
         *      description: Gets the maintenance status for maintenance page
         *      tags:
         *          - Utility Service
         *      responses:
         *          200:
         *              description: OK - Returns the maintenance status as a boolean from the mongodb downtime collection
         *                      
         *                  
         */
        router.get(
            `/maintenance`,
            this.proxyRequest((req: Request) => '/maintenance')
        );

         /**
         * @swagger
         * /clientversion/{clientVersion}:
         *  get:
         *      description: Gets the client version to see if there is an update
         *      tags:
         *          - Utility Service
         *      parameters:
         *          - in: path
         *            name: clientVersion
         *            schema:
         *                type: string
         *            required: true
         *            description: The version of the client
         *      responses:
         *          200:
         *              description: OK
         *          401:
         *              description: UNAUTHENTICATED - Thrown when no clientVersion is in params
         *          426:
         *              description: Thrown when the client version is not accurate
         *          500: 
         *              description: INTERNAL - Could not recover the client version
         */
        router.get(
            '/clientversion/:clientVersion',
            //this.proxyRequest((req: Request) => `/clientversion/${encodeURIComponent(req.params.clientVersion)}`)
        );
        
        /**
         * @swagger
         * /outages:
         *  get:
         *      description: Gets the maintenance status for maintenance page
         *      tags:
         *          - Utility Service
         *      parameters:
         *          - in: query
         *            name: pastIssues
         *            schema:
         *                type: boolean
         *            required: false
         *            description: Whether past or active outages should be returned
         *      responses:
         *          200:
         *              description: OK - Returns arrray of outages
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: array
         *                          items:
         *                              $ref: '#/components/schemas/Outage'
         *                          
         *                      
         *          500:
         *              description: INTERNAL - Unable to get system outages
         */
        router.get(
            '/outages',
            //this.proxyRequest((req: Request) => `/outages?pastIssues=${encodeURIComponent(req.query.pastIssues)}`)
        );
        return router;
    }

    private proxyRequest(callback: Function) {
        return proxy(UTILITY_API, {
            proxyReqPathResolver: req => {
                return callback(req);
            },
        });
    }
}