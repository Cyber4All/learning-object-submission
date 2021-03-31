/**
 * @swagger
 * components:
 *      schemas:
 *          User:
 *              properties:
 *                  id:
 *                      type: string
 *                      description: The id of the user
 *                      example: 000000000000000000000000
 *                      required: true
 *                  bio:
 *                      type: string
 *                      description: The bio of the user
 *                      example: This is a bio
 *                      required: true
 *                  cognitoIdentityId:
 *                      type: string
 *                      description: The cognito id for files
 *                      example: 000000000000000000000000
 *                      required: true
 *                  createdAt:
 *                      type: string
 *                      description: When the user was created
 *                      example: 0
 *                      required: true
 *                  email:
 *                      type: string
 *                      description: The email of the user
 *                      example: jdoe1@gmail.com
 *                      required: true
 *                  emailVerified:
 *                      type: boolean
 *                      description: Whether their email was verified
 *                      example: true
 *                      required: true
 *                  name:
 *                      type: string
 *                      description: The name of the user
 *                      example: John Doe
 *                      required: true
 *                  organization:
 *                      type: string
 *                      description: The name of the organization the user belongs to
 *                      example: Towson University
 *                      required: true
 *                  username:
 *                      type: string
 *                      description: The username of the user
 *                      example: jdoe1
 *                      required: true
 *          UserBody:
 *              properties:
 *                  email:
 *                      type: string
 *                      description: The email of the user
 *                      example: jdoe1@gmail.com
 *                      required: true
 *                  password:
 *                      type: string
 *                      description: The password of the user
 *                      example: M0ckPa$$word
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
 *                  organization:
 *                      type: string
 *                      description: The name of the organization the user belongs to
 *                      example: Towson University
 *                      required: true
 *                  bio:
 *                      type: string
 *                      description: The bio of the user
 *                      example: This is a bio
 *                      required: true
 *          Organization:
 *              properties:
 *                  id:
 *                      type: string
 *                      description: The id of the organization
 *                      example: 000000000000000000000000
 *                      required: true
 *                  institution:
 *                      type: string
 *                      description: The name of the organization
 *                      example: Towson University
 *                      required: true
 */