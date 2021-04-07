/**
 * @swagger
 * components:
 *      schemas:
 *          Status:
 *              properties:
 *                  isUnderMaintenance:
 *                      type: boolean
 *                      description: a boolean that denotes the status for the banner
 *                      example: true
 *                      required: true
 *                  message:
 *                      type: string
 *                      example: Clark is now accepting curriculum submissions to the Plan C collection.
 *                      required: true
 *          Outage:
 *              properties:
 *                  _id:
 *                      type: ObjectId
 *                      description: identifer used my mongo to find document
 *                      example: ObjectId()
 *                      required: true
 *                  name:
 *                      type: String
 *                      description: name of outage
 *                      example: downloads
 *                      required: true
 *                  accessGroups:
 *                      type: array
 *                      items:
 *                          type: string
 *                          example: editor
 *                      required: true
 *                  issues:
 *                      type: array
 *                      items:
 *                          type: string
 *                          example: Should return a status code of OK when downloading waiting objects as a reviewer in their collection
 *                      required: true
 *                  discovered:
 *                      type: time
 *                      description: timestamp of when outage occured
 *                      example: 2020-02-19T20:31:33.852+00:00
 *                      required: true
 *                  links:
 *                      type: array
 *                      items:
 *                          type: string
 *                          example: https://api-gateway.clark.center/users/kkuczynski/learning-objects/220572e9-bcb3-4af9-b2b2-f87a3286a328/versions/0/bundle
 *                      description: links affiliated with the outage
 *                  resolved:
 *                      type: time
 *                      description: timestamp of when outage occured
 *                      example: 2020-02-19T20:45:38.335+00:00
 *                      required: true
 * 
 *                  
 *          
 */