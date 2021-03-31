import { Router, Request } from "express";
import proxy = require("express-http-proxy");
import { Controller } from "../../interfaces/Controller";
import * as querystring from 'querystring';
import { ADMIN_MAILER_ROUTES, ADMIN_USER_ROUTES, STATS_ROUTE, USER_ROUTES } from "../../routes";
import { SocketInteractor } from "../../interactors/SocketInteractor";

const USERS_API = process.env.USERS_API || 'localhost:4000';

export class UserServiceController implements Controller {
    buildRouter(): Router {
        const router = Router();

        // Routes go here

        /**
         * @swagger
         * /guidelines/members:
         *  get:
         *      description: Gets users with mapper access group
         *      tags:
         *          - User Service
         *      responses:
         *          200:
         *              description: Gets a list of mappers
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: array
         *                          items:
         *                              $ref: '#/components/schemas/User'
         *          401:
         *              description: UNAUTHENTICATED - User not logged in
         *          403:
         *              description: UNAUTHORIZED - User not an admin
         */
        router.route('/guidelines/members').get(this.proxyRequest((req: Request) => `/guidelines/members`));

        /**
         * @swagger
         * /guidelines/members/{memberId}:
         *  put:
         *      description: Adds a new mapper
         *      tags:
         *          - User Service
         *      parameters:
         *          - in: path
         *            name: memberId
         *            schema:
         *                type: string
         *            required: true
         *            description: The id of the user to give mapper privileges to
         *      responses:
         *          201:
         *              description: CREATED
         *          400:
         *              description: BAD REQUEST - User already has the mapper privilege
         *          401:
         *              description: UNAUTHENTICATED - User not logged in
         *          403:
         *              description: UNAUTHORIZED - User not an admin
         *          404:
         *              description: NOT FOUND - User not found
         */
        router.route('/guidelines/members/:memberId').put(this.proxyRequest((req: Request) => `/guidelines/members/${encodeURIComponent(req.params.memberId)}`));

        /**
         * @swagger
         * /guidelines/members/{memberId}:
         *  delete:
         *      description: Removes the mapper privilege of a user
         *      tags:
         *          - User Service
         *      parameters:
         *          - in: path
         *            name: memberId
         *            schema:
         *                type: string
         *            required: true
         *            description: The id of the user to revoke privileges of
         *      responses:
         *          204:
         *              description: NO CONTENT
         *          400:
         *              description: BAD REQUEST - The user doesn't have the mapper privilege
         *          401:
         *              description: UNAUTHENTICATED - User not logged in
         *          403:
         *              description: UNAUTHORIZED - User not an admin
         *          404:
         *              description: NOT FOUND - User not found
         */
        router.route('/guidelines/members/:memberId').delete(this.proxyRequest((req: Request) => `/guidelines/members/${encodeURIComponent(req.params.memberId)}`));

        /**
         * @swagger
         * /users/identifiers/active:
         *  get:
         *      description: Checks if a current user is using a username
         *      tags:
         *          - User Service
         *      parameters:
         *          - in: query
         *            name: username
         *            schema:
         *                type: string
         *            required: true
         *            description: The username to check if in use
         *      responses:
         *          200:
         *              description: OK
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         *                          properties:
         *                              inUse:
         *                                  type: boolean
         *                                  description: True if username is in use, false otherwise
         *                                  example: true
         *                                  required: true
         */
        router.get('/users/identifiers/active', this.proxyRequest((req: Request) => `/users/identifiers/active?${querystring.stringify(req.query)}`));

        /**
         * @swagger
         * /users/curators/{collection}:
         *  get:
         *      description: Gets curators for a collection
         *      tags:
         *          - User Service
         *      parameters:
         *          - in: path
         *            name: collection
         *            schema:
         *                type: string
         *            required: true
         *            description: The collection
         *      responses:
         *          200:
         *             description: Gets a list of curators for a collection
         *             content:
         *                  application/json:
         *                      schema:
         *                          type: array
         *                          items:
         *                              $ref: '#/components/schemas/User'
         *          404:
         *              description: NOT FOUND - Collection not found
         */
        router.get('/users/curators/:collection', this.proxyRequest((req: Request) => USER_ROUTES.FETCH_COLLECTION_CURATORS(req.params.collection)));

        /**
         * @swagger
         * /users/password:
         *  post:
         *      description: Check if password matches
         *      tags:
         *          - User Service
         *      requestBody:
         *          description: The typed password
         *          required: true
         *          content:
         *              application/json:
         *                  schema:
         *                      type: object
         *                      properties:
         *                          password:
         *                              type: string
         *                              description: The user typed password
         *                              example: M0ckPa$$word
         *                              required: true
         *      responses:
         *          200:
         *              description: OK
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         *                          properties:
         *                              isMatch:
         *                                  type: boolean
         *                                  description: True if the username matches the provided password, false otherwise
         *                                  example: true
         *                                  required: true
         */
        router.post('/users/password', this.proxyRequest((req: Request) => `/users/password`));

        /**
         * @swagger
         * /users/update:
         *  get:
         *      description: Gets a user's information
         *      tags:
         *          - User Service
         *      parameters:
         *          - in: query
         *            name: username
         *            schema:
         *                type: string
         *            required: true
         *            description: The user's username
         *      responses:
         *          200:
         *              description: OK
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         *                          $ref: '#/components/schemas/User'
         */
        router.get('/users/update', this.proxyRequest((req: Request) => `/users/update?${querystring.stringify(req.query)}`));

        /**
         * @swagger
         * /collections/{collectionName}/members:
         *  get:
         *      description: Gets a list of collection reviewers
         *      tags:
         *          - User Service
         *      parameters:
         *          - in: path
         *            name: collectionName
         *            schema:
         *                type: string
         *            required: true
         *            description: The collection's name
         *      responses:
         *          200:
         *              description: OK
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: array
         *                          items:
         *                              $ref: '#/components/schemas/User'
         */
        router.get('/collections/:collectionName/members', this.proxyRequest((req: Request) => ADMIN_USER_ROUTES.FETCH_COLLECTION_MEMBERS(req.params.collectionName, req.query)));

        /**
         * @swagger
         * /collections/{collectionName}/members/{memberId}:
         *  put:
         *      description: Assign a reviewer to a collection
         *      tags:
         *          - User Service
         *      parameters:
         *          - in: path
         *            name: collectionName
         *            schema:
         *                type: string
         *            required: true
         *            description: The collection's name
         *          - in: path
         *            name: memberId
         *            schema:
         *                type: string
         *            required: true
         *            description: The id of the user
         *      responses:
         *          200:
         *              description: OK
         *          401:
         *              description: UNAUTHENTICATED - User not logged in
         *          403:
         *              description: UNAUTHORIZED - User not an admin or collection curator
         *          404:
         *              description: NOT FOUND - User or collection not found
         */
        router.put('/collections/:collectionName/members/:memberId', this.proxyRequest((req: Request) => ADMIN_USER_ROUTES.ASSIGN_COLLECTION_MEMBERSHIP(req.params.collectionName, req.params.memberId)));

        /**
         * @swagger
         * /collections/{collectionName}/members/{memberId}:
         *  patch:
         *      description: Edits a reviewer's privilege in a collection
         *      tags:
         *          - User Service
         *      parameters:
         *          - in: path
         *            name: collectionName
         *            schema:
         *                type: string
         *            required: true
         *            description: The collection's name
         *          - in: path
         *            name: memberId
         *            schema:
         *                type: string
         *            required: true
         *            description: The id of the user
         *      responses:
         *          200:
         *              description: OK
         *          401:
         *              description: UNAUTHENTICATED - User not logged in
         *          403:
         *              description: UNAUTHORIZED - User not an admin or collection curator
         *          404:
         *              description: NOT FOUND - User or collection not found
         */
        router.patch('/collections/:collectionName/members/:memberId', this.proxyRequest((req: Request) => ADMIN_USER_ROUTES.EDIT_COLLECTION_MEMBERSHIP(req.params.collectionName, req.params.memberId)));

        /**
         * @swagger
         * /collections/{collectionName}/members/{memberId}:
         *  delete:
         *      description: Removes a reviewer's privilege in a collection
         *      tags:
         *          - User Service
         *      parameters:
         *          - in: path
         *            name: collectionName
         *            schema:
         *                type: string
         *            required: true
         *            description: The collection's name
         *          - in: path
         *            name: memberId
         *            schema:
         *                type: string
         *            required: true
         *            description: The id of the user
         *      responses:
         *          200:
         *              description: OK
         *          401:
         *              description: UNAUTHENTICATED - User not logged in
         *          403:
         *              description: UNAUTHORIZED - User not an admin or collection curator
         *          404:
         *              description: NOT FOUND - User or collection not found
         */
        router.delete('/collections/:collectionName/members/:memberId', this.proxyRequest((req: Request) => ADMIN_USER_ROUTES.REMOVE_COLLECTION_MEMBERSHIP(req.params.collectionName, req.params.memberId)));

        /**
         * @swagger
         * /users:
         *  get:
         *      description: Gets an array of users
         *      tags:
         *          - User Service
         *      responses:
         *          200:
         *              description: OK
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         *                          properties:
         *                              users:
         *                                  type: array
         *                                  required: true
         *                                  description: An array of user objects
         *                                  items:
         *                                      $ref: '#/components/schemas/User'
         *                              total:
         *                                  type: number
         *                                  required: true
         *                                  example: 10
         *                                  description: The total number of users
         *  post:
         *      description: Creates a user
         *      tags:
         *          - User Service
         *      requestBody:
         *          required: true
         *          content:
         *              application/json:
         *                  schema:
         *                      type: object
         *                      $ref: '#/components/schemas/UserBody'
         *      responses:
         *          200:
         *              description: OK
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         *                          properties:
         *                              user:
         *                                  type: object
         *                                  $ref: '#/components/schemas/UserBody'
         *                              tokens:
         *                                  type: object
         *                                  properties:
         *                                      bearer:
         *                                          type: string
         *                                          required: true
         *                                          description: Bearer token
         *                                      openId:
         *                                          type: string
         *                                          required: true
         *                                          description: The cognito id
         *                                      user:
         *                                          type: object
         *                                          $ref: '#/components/schemas/UserBody'
         *  patch:
         *      description: Edits a user's info
         *      tags:
         *          - User Service
         *      requestBody:
         *          required: true
         *          content:
         *              application/json:
         *                  schema:
         *                      type: object
         *                      $ref: '#/components/schemas/UserBody'
         *      responses:
         *          200:
         *              description: OK
         */
        router.route('/users')
            .get(this.proxyRequest((req: Request) => '/users'))
            // Register
            .post(this.proxyRequest((req: Request) => '/users'))
            .patch(this.proxyRequest((req: Request) => '/users'));
        
        /**
         * @swagger
         * /users/stats:
         *  get:
         *      description: Gets the stats for a user
         *      tags:
         *          - User Service
         *      parameters:
         *          - in: query
         *            name: username
         *            schema:
         *                type: string
         *            required: true
         *            description: The collection's name
         *      responses:
         *          200:
         *              description: OK
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         *                          properties:
         *                              accounts:
         *                                  type: number
         *                                  example: 1
         *                                  required: true
         *                              organizations:
         *                                  type: number
         *                                  example: 1
         *                                  required: true
         *          500:
         *              description: INTERNAL SERVICE ERROR - Any error is thrown
         */
        router.get('/users/stats', this.proxyRequest((req: Request) => STATS_ROUTE.USER_STATS));
        
        /**
         * @swagger
         * /users/tokens:
         *  post:
         *      description: Login a user
         *      tags:
         *          - User Service
         *      requestBody:
         *          required: true
         *          content:
         *              application/json:
         *                  schema:
         *                      type: object
         *                      properties:
         *                          username:
         *                              description: The user's username
         *                              example: jdoe1
         *                              type: string
         *                              required: true
         *                          password:
         *                              description: The user's password
         *                              example: M0ckPa$$word
         *                              type: string
         *                              required: true
         *      responses:
         *          200:
         *              description: OK
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         *                          properties:
         *                              user:
         *                                  type: object
         *                                  $ref: '#/components/schemas/UserBody'
         *                              tokens:
         *                                  type: object
         *                                  properties:
         *                                      bearer:
         *                                          type: string
         *                                          required: true
         *                                          description: Bearer token
         *                                      openId:
         *                                          type: string
         *                                          required: true
         *                                          description: The cognito id
         *                                      user:
         *                                          type: object
         *                                          $ref: '#/components/schemas/UserBody'
         *          400:
         *              description: BAD REQUEST - Incorrect login credentials
         */
        router.post('/users/tokens', this.proxyRequest((req: Request) => '/users/tokens'));

        /**
         * @swagger
         * /users/{username}/profile:
         *  get:
         *      description: Gets a user's profile
         *      tags:
         *          - User Service
         *      parameters:
         *          - in: path
         *            name: username
         *            schema:
         *                type: string
         *            required: true
         *            description: The user's username
         *      responses:
         *          200:
         *              description: OK
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: array
         *                          items:
         *                              $ref: '#/components/schemas/User'
         */
        router.route('/users/:username/profile').get(this.proxyRequest((req: Request) => `/users/${req.params.username}/profile`));

        /**
         * @swagger
         * /users/tokens/refresh:
         *  get:
         *      description: Refreshes a user's token
         *      tags:
         *          - User Service
         *      responses:
         *          200:
         *              description: OK
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         *                          properties:
         *                              user:
         *                                  type: object
         *                                  $ref: '#/components/schemas/UserBody'
         *                              tokens:
         *                                  type: object
         *                                  properties:
         *                                      bearer:
         *                                          type: string
         *                                          required: true
         *                                          description: Bearer token
         *                                      openId:
         *                                          type: string
         *                                          required: true
         *                                          description: The cognito id
         *                                      user:
         *                                          type: object
         *                                          $ref: '#/components/schemas/UserBody'
         */
        router.get('/users/tokens/refresh', this.proxyRequest((req: Request) => '/users/tokens/refresh'));

        /**
         * @swagger
         * /users/{username}:
         *  delete:
         *      description: Deletes a user by their id
         *      tags:
         *          - User Service
         *      parameters:
         *          - in: path
         *            name: username
         *            schema:
         *                type: string
         *            required: true
         *            description: The user's id
         *      responses:
         *          200:
         *              description: OK
         *          401:
         *              description: UNAUTHENTICATED - User not logged in
         *          403:
         *              description: UNAUTHORIZED - User not an admin
         */
        router.route('/users/:username').delete(this.proxyRequest((req: Request) => `/users/${encodeURIComponent(req.params.username)}`));

        /**
         * @swagger
         * /users/organizations:
         *  get:
         *      description: Searches for an organization
         *      tags:
         *          - User Service
         *      parameters:
         *          - in: query
         *            name: query
         *            schema:
         *                type: string
         *            required: true
         *            description: The search query
         *      responses:
         *          200:
         *              description: OK
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: array
         *                          items:
         *                              $ref: '#/components/schemas/Organization'
         */
        router.route('/users/organizations').get(this.proxyRequest((req: Request) => `/users/organizations?${querystring.stringify(req.query)}`));

        /**
         * @swagger
         * /users/tokens:
         *  get:
         *      description: Gets the current user object
         *      tags:
         *          - User Service
         *      responses:
         *          200:
         *              description: OK
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: array
         *                          items:
         *                              $ref: '#/components/schemas/User'
         *          401:
         *              description: UNAUTHENTICATED - User not logged in
         */
        router.route('/users/tokens').get(this.proxyRequest((req: Request) => `/users/tokens`));
        
        /**
         * @swagger
         * /users/{username}/tokens:
         *  delete:
         *      description: Logs out a user
         *      tags:
         *          - User Service
         *      parameters:
         *          - in: path
         *            name: username
         *            schema:
         *                type: string
         *            required: true
         *            description: The user's username
         *      responses:
         *          200:
         *              description: OK
         *          401:
         *              description: UNAUTHENTICATED - User not logged in
         */
        router.delete('/users/:username/tokens', this.proxyRequest((req: Request) => `/users/${encodeURIComponent(req.params.username)}/tokens`));

        /**
         * @swagger
         * /users/ota-codes:
         *  get:
         *      description: Gets and validates a ota-code then redirects the user
         *      tags:
         *          - User Service
         *      parameters:
         *          - in: query
         *            name: otaCode
         *            schema:
         *                type: string
         *            required: true
         *            description: The ota code to validate
         *      responses:
         *          200:
         *              description: OK - Redirects user to verify email or reset password
         *  post:
         *      description: Sends a ota code email
         *      tags:
         *          - User Service
         *      parameters:
         *          - in: query
         *            name: action
         *            schema:
         *                type: string
         *            required: true
         *            description: The type of action for the email
         *      requestBody:
         *          required: true
         *          content:
         *              application/json:
         *                  schema:
         *                      type: object
         *                      properties:
         *                          email:
         *                              type: string
         *                              required: true
         *                              description: The email to send the ota code to
         *                              example: jdoe1@gmail.com
         *      responses:
         *          200:
         *              description: OK
         *          400:
         *              description: BAD REQUEST - Invalid action type
         *  patch:
         *      description: Resets a user's password
         *      tags:
         *          - User Service
         *      parameters:
         *          - in: query
         *            name: otaCode
         *            schema:
         *                type: string
         *            required: true
         *            description: The ota code to validate
         *      requestBody:
         *          required: true
         *          content:
         *              application/json:
         *                  schema:
         *                      type: object
         *                      properties:
         *                          payload:
         *                              type: string
         *                              required: true
         *                              description: The new password
         *      responses:
         *          200:
         *              description: OK
         */
        router.route('/users/ota-codes').all(
            this.proxyRequestWithDecorator(
                (req: Request) => `/users/ota-codes?${querystring.stringify(req.query)}`,
                (proxyRes: any, proxyResData: any, userReq: any, userRes: any) => {
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
                })
        );

        /**
         * @swagger
         * /users/search:
         *  get:
         *      description: Searches for users given a query
         *      tags:
         *          - User Service
         *      parameters:
         *          - in: query
         *            name: username
         *            schema:
         *                type: string
         *            required: false
         *            description: The username to search for
         *          - in: query
         *            name: name
         *            schema:
         *                type: string
         *            required: false
         *            description: The name to search for
         *          - in: query
         *            name: email
         *            schema:
         *                type: string
         *            required: false
         *            description: The email to search for
         *          - in: query
         *            name: organization
         *            schema:
         *                type: string
         *            required: false
         *            description: The organization of the user to search for
         *          - in: query
         *            name: username
         *            schema:
         *                type: string
         *            required: false
         *            description: The ota code to validate
         *          - in: query
         *            name: orderBy
         *            schema:
         *                type: string
         *            required: false
         *            description: The value of which to order by (ie. username or name, etc.)
         *      responses:
         *          200:
         *              description: OK
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: array
         *                          items:
         *                              $ref: '#/components/schemas/User'
         */
        router.get('/users/search', this.proxyRequest((req: Request) => `/users?${querystring.stringify(req.query)}`));

        /**
         * @swagger
         * /validate-captcha:
         *  get:
         *      description: Validates the user's captcha
         *      tags:
         *          - User Service
         *      parameters:
         *          - in: query
         *            name: token
         *            schema:
         *                type: string
         *            required: false
         *            description: The token to verify
         *      responses:
         *          200:
         *              description: OK
         */
        router.get('/validate-captcha', this.proxyRequest((req: Request) => `/validate-captcha?${querystring.stringify(req.query)}`));

        /**
         * @swagger
         * /users/{id}/roles:
         *  get:
         *      description: Gets the roles a user has
         *      tags:
         *          - User Service
         *      parameters:
         *          - in: path
         *            name: id
         *            schema:
         *                type: string
         *            required: false
         *            description: The id of the user
         *      responses:
         *          200:
         *              description: OK
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: array
         *                          items:
         *                              type: string
         *          401:
         *              description: UNAUTHENTICATED - User not logged in
         *          403:
         *              description: UNAUTHORIZED - User not an admin
         *          404:
         *              description: NOT FOUND - Unable to find user
         */
        router.get('/users/:id/roles', this.proxyRequest((req: Request) => ADMIN_USER_ROUTES.FETCH_USER_ROLES(req.params.id)));

        /**
         * @swagger
         * /users/{username}:
         *  get:
         *      description: Gets a user by their username
         *      tags:
         *          - User Service
         *      parameters:
         *          - in: path
         *            name: username
         *            schema:
         *                type: string
         *            required: false
         *            description: The username of the user
         *      responses:
         *          200:
         *              description: OK
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         *                          $ref: '#/components/schemas/User'
         *          400:
         *              description: BAD REQUEST - Username not provided
         *          401:
         *              description: UNAUTHENTICATED - User not logged in
         *          403:
         *              description: UNAUTHORIZED - User not an admin or editor
         *          404:
         *              description: NOT FOUND - Unable to find user
         */
        router.get('/users/:username', this.proxyRequest((req: Request) => USER_ROUTES.FETCH_USER(req.params.username)));

        /**
         * @swagger
         * /users:
         *  get:
         *      description: Gets a list of users (authenticated)
         *      tags:
         *          - User Service
         *      parameters:
         *          - in: query
         *            name: username
         *            schema:
         *                type: string
         *            required: false
         *            description: The username to search for
         *          - in: query
         *            name: name
         *            schema:
         *                type: string
         *            required: false
         *            description: The name to search for
         *          - in: query
         *            name: email
         *            schema:
         *                type: string
         *            required: false
         *            description: The email to search for
         *          - in: query
         *            name: organization
         *            schema:
         *                type: string
         *            required: false
         *            description: The organization of the user to search for
         *          - in: query
         *            name: username
         *            schema:
         *                type: string
         *            required: false
         *            description: The ota code to validate
         *          - in: query
         *            name: orderBy
         *            schema:
         *                type: string
         *            required: false
         *            description: The value of which to order by (ie. username or name, etc.)
         *      responses:
         *          200:
         *              description: OK
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: array
         *                          items:
         *                              $ref: '#/components/schemas/User'
         *          401:
         *              description: UNAUTHENTICATED - User not logged in
         *          403:
         *              description: UNAUTHORIZED - User not an admin
         */
        router.get('/users', this.proxyRequest((req: Request) => ADMIN_USER_ROUTES.FETCH_USERS_WITH_FILTER(req.query)));

        /**
         * @swagger
         * /users/{id}:
         *  delete:
         *      description: Deletes a user by id
         *      tags:
         *          - User Service
         *      parameters:
         *          - in: path
         *            name: id
         *            schema:
         *                type: string
         *            required: false
         *            description: The id of the user
         *      responses:
         *          200:
         *              description: OK
         *          401:
         *              description: UNAUTHENTICATED - User not logged in
         *          403:
         *              description: UNAUTHORIZED - User not an admin
         */
        router.delete('/users/:id', this.proxyRequest((req: Request) => ADMIN_USER_ROUTES.DELETE_USER(req.params.id)));

        /**
         * @swagger
         * /admin/mail:
         *  post:
         *      description: Sends a simple email
         *      tags:
         *          - User Service
         *      requestBody:
         *          required: true
         *          content:
         *              application/json:
         *                  schema:
         *                      type: object
         *                      properties:
         *                          subject:
         *                              type: string
         *                              required: true
         *                              description: The email subject
         *                              example: Hello World
         *                          message:
         *                              type: string
         *                              required: true
         *                              description: The email message
         *                              example: This is a message body
         *                          email:
         *                              type: string
         *                              required: true
         *                              description: The email to send to
         *                              example: jdoe1@gmail.com
         *      responses:
         *          200:
         *              description: OK
         */
        router.post('/admin/mail', this.proxyRequest((req: Request) => ADMIN_MAILER_ROUTES.SEND_BASIC_EMAIL));

        /**
         * @swagger
         * /admin/mail/templates:
         *  get:
         *      description: Gets the different types of templates
         *      tags:
         *          - User Service
         *      responses:
         *          200:
         *              description: OK
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: array
         *                          items:
         *                              $ref: '#/components/schemas/MailTemplate'
         *          401:
         *              description: UNAUTHENTICATED - User not logged in
         *          403:
         *              description: UNAUTHORIZED - User not an admin
         *  post:
         *      description: Sends a templated email to a user
         *      tags:
         *          - User Service
         *      requestBody:
         *          required: true
         *          content:
         *              application/json:
         *                  schema:
         *                      type: object
         *                      properties:
         *                          subject:
         *                              type: string
         *                              required: true
         *                              description: The email subject
         *                              example: Hello World
         *                          template:
         *                              type: object
         *                              required: true
         *                              $ref: '#/components/schemas/MailTemplate'
         *                          email:
         *                              type: string
         *                              required: true
         *                              description: The email to send to
         *                              example: jdoe1@gmail.com
         *      responses:
         *          200:
         *              description: OK
         *          400:
         *              description: BAD CONTENT - Invalid template name
         *          401:
         *              description: UNAUTHENTICATED - User not logged in
         *          403:
         *              description: UNAUTHORIZED - User not an admin
         */
        router.route('/admin/mail/templates')
            .get(this.proxyRequest((req: Request) => ADMIN_MAILER_ROUTES.GET_AVAILABLE_TEMPLATES))
            .post(this.proxyRequest((req: Request) => ADMIN_MAILER_ROUTES.SEND_TEMPLATE_EMAIL));

        return router;
    }

    private proxyRequest(callback: Function) {
        return proxy(USERS_API, {
            proxyReqPathResolver: req => {
                return callback(req);
            },
        });
    }

    private proxyRequestWithDecorator(callback: Function, decorator: Function) {
        return proxy(USERS_API, {
            proxyReqPathResolver: req => {
                return callback(req);
            },
            userResDecorator: (proxyRes, proxyResData, userReq, userRes) => decorator(proxyRes, proxyResData, userReq, userRes)
        });
    }
}