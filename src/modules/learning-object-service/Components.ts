/**
  levels: string[];
 * @swagger
 * components:
 *      schemas:
 *          LearningObject:
 *              properties:
 *                  id:
 *                      type: string
 *                      description: The id of the learning object
 *                      example: 000000000000000000000000
 *                      required: true
 *                  cuid:
 *                      type: string
 *                      description: The cuid of the learning object
 *                      example: 00000000-1111-2222-3333-444444444444
 *                      required: true
 *                  author:
 *                      type: object
 *                      description: A partial user object of the learning object's author
 *                      $ref: '#/components/schemas/User'
 *                      required: true
 *                  collection:
 *                      type: string
 *                      description: The collection the learning object belongs to
 *                      example: nccp
 *                      required: true
 *                  contributors:
 *                      type: array
 *                      description: A optional array of extra contributors to the object
 *                      items:
 *                          $ref: '#/components/schemas/User'
 *                      required: true
 *                  date:
 *                      type: string
 *                      description: The date the learning object was created
 *                      example: 0
 *                      required: true
 *                  description:
 *                      type: string
 *                      description: The description of the learning object
 *                      example: This is a description
 *                      required: true
 *                  length:
 *                      type: string
 *                      description: The length of the learning object
 *                      example: nanomodule
 *                      required: true
 *                  name:
 *                      type: string
 *                      description: The name of the learning object
 *                      example: This is a learning object name
 *                      required: true
 *                  status:
 *                      type: string
 *                      description: The current status of the learning object
 *                      example: released
 *                      required: true
 *                  resourceUris:
 *                      type: object
 *                      description: The extra resource uris of the learning object
 *                      required: false
 *                      $ref: '#/components/schemas/LearningObjectResourceUris'
 *                  revisionUri:
 *                      type: string
 *                      description: The new revision uri of the learning object
 *                      required: true
 *                  version:
 *                      type: integer
 *                      description: The current version of the learning object
 *                      example: 1
 *                      required: true
 *                  levels:
 *                      type: array
 *                      description: An array of appropriate academic levels to the object
 *                      items:
 *                          type: string
 *                          example: undergraduate
 *                      required: true
 *          User:
 *              properties:
 *                  id:
 *                      type: string
 *                      description: The id of the user
 *                      example: 000000000000000000000000
 *                      required: true
 *                  username:
 *                      type: string
 *                      description: The username of the user
 *                      example: jdoe1
 *                      required: true
 *                  name:
 *                      type: string
 *                      description: The name of the user
 *                      example: John Doe
 *                      required: true
 *                  email:
 *                      type: string
 *                      description: The email of the user
 *                      example: jdoe1@gmail.com
 *                      required: true
 *                  emailVerified:
 *                      type: boolean
 *                      description: A boolean representing if the user's email has been verified
 *                      example: true
 *                      required: true
 *                  organization:
 *                      type: string
 *                      description: The organization of the user
 *                      example: Towson University
 *                      required: true
 *                  bio:
 *                      type: string
 *                      description: A short biography of the user
 *                      example: This is a bio
 *                      required: true
 *                  createdAt:
 *                      type: string
 *                      description: The date when the user was created
 *                      example: 0
 *                      required: true
 *          LearningObjectResourceUris:
 *              properties:
 *                  outcomes:
 *                      type: string
 *                      description: The uri for the outcomes of a learning object
 *                      example: https://api-gateway.clark.center/users/jdoe1/learning-objects/000000000000000000000000/outcomes
 *                      required: false
 *                  children:
 *                      type: string
 *                      description: The uri for the children of a learning object
 *                      example: https://api-gateway.clark.center/users/jdoe1/learning-objects/000000000000000000000000/children
 *                      required: false
 *                  materials:
 *                      type: string
 *                      description: The uri for the materials of a learning object
 *                      example: https://api-gateway.clark.center/users/jdoe1/learning-objects/000000000000000000000000/materials
 *                      required: false
 *                  metrics:
 *                      type: string
 *                      description: The uri for the metrics of a learning object
 *                      example: https://api-gateway.clark.center/users/jdoe1/learning-objects/000000000000000000000000/metrics
 *                      required: false
 *                  parents:
 *                      type: string
 *                      description: The uri for the parents of a learning object
 *                      example: https://api-gateway.clark.center/users/jdoe1/learning-objects/000000000000000000000000/parents
 *                      required: false
 *                  ratings:
 *                      type: string
 *                      description: The uri for the ratings of a learning object
 *                      example: https://api-gateway.clark.center/users/jdoe1/learning-objects/000000000000000000000000/ratings
 *                      required: false
 *          Changelog:
 *              properties:
 *                  cuid:
 *                      type: string
 *                      description: The cuid relating to the changelog
 *                      example: 00000000-1111-2222-3333-444444444444
 *                      required: true
 *                  logs:
 *                      type: array
 *                      description: The changes made to the object
 *                      required: true
 *                      items:
 *                          $ref: '#/components/schemas/ChangelogLog'
 *          ChangelogLog:
 *              properties:
 *                  date:
 *                      type: number
 *                      description: The date the changelog was created in ms
 *                      example: 0
 *                      required: true
 *                  text:
 *                      type: string
 *                      description: The changelog text
 *                      example: This is a change
 *                      required: true
 *                  author:
 *                      type: object
 *                      $ref: '#/components/schemas/ChangelogAuthor'
 *          ChangelogAuthor:
 *              properties:
 *                  userId:
 *                      type: string
 *                      description: The id of the changelog author
 *                      example: 000000000000000000000000
 *                      required: true
 *                  name:
 *                      type: string
 *                      description: The name of the changelog author
 *                      example: John Doe
 *                      required: true
 *                  role:
 *                      type: string
 *                      description: The role of the changelog author
 *                      example: admin
 *                      required: true
 *                  profileImage:
 *                      type: string
 *                      description: The profile image of the changelog author
 *                      required: true
 */