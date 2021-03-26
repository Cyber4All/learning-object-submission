/**
 * @swagger
 * components:
 *      schemas:
 *          Notification:
 *              properties:
 *                  id:
 *                      type: string
 *                      description: The id of the notification
 *                      example: 000000000000000000000000
 *                      required: true
 *                  text:
 *                      type: string
 *                      description: The description of the notification
 *                      example: This is an example
 *                      required: true
 *                  timestamp:
 *                      type: string
 *                      description: The timestamp for when the notification was created
 *                      example: 0
 *                      required: true
 *                  link:
 *                      type: string
 *                      description: The link to the object
 *                      example: https://clark.center/details/jdoe1/00000000-1111-2222-3333-444444444444
 *                      required: true
 *                  attributes:
 *                      type: object
 *                      required: true
 *                      additionalProperties:
 *                          type: string
 */