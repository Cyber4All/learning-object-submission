/**
 * @swagger
 * components:
 *      schemas:
 *          Rating:
 *              properties:
 *                  _id:
 *                      type: string
 *                      description: The id of the rating object
 *                      example: 000000000000000000000000
 *                      required: true
 *                  value:
 *                      type: number
 *                      description: The rating value, an integer, out of 5
 *                      example: 4
 *                      required: true
 *                  user:
 *                      type: object
 *                      description: The user who left the rating
 *                      $ref: '#/components/schemas/RatingUser'
 *                      required: false
 *                  comment:
 *                      type: string
 *                      description: The comment the person made on the rating
 *                      example: This is an example comment
 *                      required: true
 *                  date:
 *                      type: number
 *                      description: The date the person created the rating
 *                      example: 0
 *                      required: true
 *                  response:
 *                      type: array
 *                      description: An array of potential responses to the rating
 *                      items:
 *                          $ref: '#/components/schemas/Response'
 *                      required: false
 *                  source:
 *                      type: object
 *                      description: The learning object source information
 *                      $ref: '#/components/schemas/RatingSource'
 *                      required: false
 *          Response:
 *              properties:
 *                  _id:
 *                      type: string
 *                      description: The id of the response object
 *                      example: 000000000000000000000000
 *                      required: true
 *                  user:
 *                      type: object
 *                      description: The user who left the response
 *                      $ref: '#/components/schemas/RatingUser'
 *                      required: true
 *                  comment:
 *                      type: string
 *                      description: The comment the person made on the response
 *                      example: This is an example comment
 *                      required: true
 *                  date:
 *                      type: number
 *                      description: The date the person created the response
 *                      example: 0
 *                      required: true
 *                  source:
 *                      type: object
 *                      description: The learning object source information
 *                      $ref: '#/components/schemas/RatingSource'
 *          Flag:
 *              properties:
 *                  _id:
 *                      type: string
 *                      description: The id of the flag
 *                      example: 000000000000000000000000
 *                      required: true
 *                  comment:
 *                      type: string
 *                      description: The comment for why the rating was flagged
 *                      example: This is a flagged rating
 *                      required: true
 *                  ratingId:
 *                      type: string
 *                      description: The id of the rating flagged
 *                      example: 000000000000000000000000
 *                      required: true
 *                  date:
 *                      type: number
 *                      description: The time when the rating was flagged
 *                      example: 0
 *                      required: true
 *                  username:
 *                      type: string
 *                      description: The username of the person who flagged the rating
 *                      example: jdoe1
 *                      required: true
 *                  concern:
 *                      type: string
 *                      description: The type of the flag
 *                      example: Other
 *                      required: true
 *          RatingUser:
 *              properties:
 *                  username:
 *                      type: string
 *                      description: The username of the person who left the rating
 *                      example: jdoe1
 *                      required: true
 *                  name:
 *                      type: string
 *                      description: The name of the person who left the rating
 *                      example: John Doe
 *                      required: true
 *                  email:
 *                      type: string
 *                      description: The email of the person who left the rating
 *                      example: jdoe1@gmail.com
 *                      required: true
 *          RatingSource:
 *              properties:
 *                  cuid:
 *                      type: string
 *                      description: The cuid of the object
 *                      example: 00000000-1111-2222-3333-444444444444
 *                      required: true
 *                  version:
 *                      type: number
 *                      description: The version of the object
 *                      example: 1
 *                      required: true
 */