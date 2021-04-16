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
 *          CollectionMetric:
 *              required:
 *                  - collection
 *                  - metrics
 *              properties:
 *                  collection:
 *                      type: string
 *                      description: The collection pulling metrics from
 *                      example: nccp
 *                  metrics:
 *                      type: object
 *                      description: The metrics
 *                      $ref: '#/components/schemas/CollectionMetricBody'
 *          CollectionMetricBody:
 *              required:
 *                  - saves
 *                  - downloads
 *              properties:
 *                  saves:
 *                      type: integer
 *                      description: The number of saves for a particular collection
 *                      example: 200
 *                  downloads:
 *                      type: integer
 *                      description: The number of downloads for a particular collection
 *                      example: 100
 *                  authors:
 *                      type: array
 *                      description:
 *                      items:
 *                          type: string
 *                          example: 000000000000000000000000
 *                  top5Downloads:
 *                      type: array
 *                      description: The top downloads of a particular collection
 *                      items:
 *                          $ref: '#/components/schemas/Download'
 *                  statusMetrics:
 *                      type: object
 *                      description: The learning object statuses for the collection
 *                      properties:
 *                          _id:
 *                              type: string
 *                              example: nccp
 *                              required: true
 *                              description: The collection name
 *                          count:
 *                              type: number
 *                              example: 0
 *                              required: true
 *                              description: The total number of objects
 *                          released:
 *                              type: number
 *                              example: 0
 *                              required: true
 *                              description: The number of released objects
 *                          waiting:
 *                              type: number
 *                              example: 0
 *                              required: true
 *                              description: The number of in waiting objects
 *                          peerReview:
 *                              type: number
 *                              example: 0
 *                              required: true
 *                              description: The number of in review objects
 *                          proofing:
 *                              type: number
 *                              example: 0
 *                              required: true
 *                              description: The number of in proofing objects
 *          Download:
 *              required:
 *                  - downloads
 *                  - learningObjectCuid
 *              properties:
 *                  downloads:
 *                      type: integer
 *                      description: The number of downloads for a particular learning object
 *                      example: 100
 *                  learningObjectCuid:
 *                      type: string
 *                      description: The cuid of the learning object
 *                      example: 00000000-1111-2222-3333-444444444444
 *          Collection:
 *              properties:
 *                  _id:
 *                      type: string
 *                      example: 000000000000000000000000
 *                      required: true
 *                      description: The collection id
 *                  name:
 *                      type: string
 *                      example: nccp
 *                      required: true
 *                      description: The collection name
 *                  fullName:
 *                      type: string
 *                      example: National Cybersecurity Curriculum Program
 *                      required: false
 *                      description: The collection's full name
 *                  abvName:
 *                      type: string
 *                      example: nccp
 *                      required: true
 *                      description: The collection's abbreviated name
 *                  hasLogo:
 *                      type: boolean
 *                      example: true
 *                      required: true
 *                      description: True if the collection has a logo
 *                  description:
 *                      type: string
 *                      example: This is a collection
 *                      required: true
 *                      description: Description of the collection
 *          FileMetadata:
 *              properties:
 *                  createdDate:
 *                      type: string
 *                      example: 0
 *                      required: true
 *                      description: The date the file was created
 *                  description:
 *                      type: string
 *                      example: This is a description
 *                      required: true
 *                      description: The description of the file
 *                  extension:
 *                      type: string
 *                      example: .pptx
 *                      required: true
 *                      description: The file type
 *                  lastUpdatedDate:
 *                      type: string
 *                      example: 0
 *                      required: true
 *                      description: The date the file was last updated
 *                  learningObjectId:
 *                      type: string
 *                      example: 000000000000000000000000
 *                      required: true
 *                      description: The learning object the file belongs to
 *                  packageable:
 *                      type: boolean
 *                      example: true
 *                      required: true
 *                      description: Whether the file can be packaged in a zip file
 *                  storageRevision:
 *                      type: number
 *                      example: 0
 *                      required: true
 *                      description: The version number of the file in S3
 *                  ETag:
 *                      type: string
 *                      example: 0
 *                      required: true
 *                      description: The server generated hash of the file's content
 *                  fullPath:
 *                      type: string
 *                      example: Labs/lab1.pdf
 *                      required: true
 *                      description: The path of the file (including folders and file name)
 *                  mimeType:
 *                      type: string
 *                      example: video/mp4
 *                      required: true
 *                      description: The mime type of the file
 *                  name:
 *                      type: string
 *                      example: presentation.pptx
 *                      required: true
 *                      description: The name of the file
 *                  size:
 *                      type: number
 *                      example: 1000
 *                      required: true
 *                      description: The file size (in bytes)
 *          File:
 *              properties:
 *                  id:
 *                      type: string
 *                      example: 000000000000000000000000
 *                      required: true
 *                      description: The id of the file
 *                  name:
 *                      type: string
 *                      example: presentation.pptx
 *                      required: true
 *                      description: The name of the file
 *                  fileType:
 *                      type: string
 *                      required: true
 *                      description: The file type
 *                  extension:
 *                      type: string
 *                      example: .pptx
 *                      required: true
 *                      description: The file type
 *                  previewUrl:
 *                      type: string
 *                      required: true
 *                      description: The preview url of the file
 *                  date:
 *                      type: string
 *                      example: 0
 *                      required: true
 *                      description: The date the file was last updated
 *                  fullPath:
 *                      type: string
 *                      example: Labs/lab1.pdf
 *                      required: true
 *                      description: The path of the file (including folders and file name)
 *                  size:
 *                      type: number
 *                      example: 1000
 *                      required: true
 *                      description: The file size (in bytes)
 *                  description:
 *                      type: string
 *                      example: This is a description
 *                      required: true
 *                      description: The description of the file
 *                  packageable:
 *                      type: boolean
 *                      example: true
 *                      required: true
 *                      description: Whether the file can be packaged in a zip file
 *                  storageRevision:
 *                      type: number
 *                      example: 0
 *                      required: true
 *                      description: The version number of the file in S3
 *          Url:
 *              properties:
 *                  title:
 *                      type: string
 *                      example: This is a title
 *                      required: true
 *                      description: The title of the url
 *                  url:
 *                      type: string
 *                      required: true
 *                      description: The url
 *          FolderDescription:
 *              properties:
 *                  path:
 *                      type: string
 *                      required: true
 *                      description: The folder path
 *                  description:
 *                      type: string
 *                      example: This is a description
 *                      required: true
 *                      description: The description of the folder
 *          PDF:
 *              properties:
 *                  name:
 *                      type: string
 *                      required: true
 *                      description: The name of the pdf
 *          LearningObjectStats:
 *              properties:
 *                  downloads:
 *                      type: number
 *                      example: 100
 *                      required: true
 *                      description: The number of object downloads
 *                  saves:
 *                      type: number
 *                      example: 100
 *                      required: true
 *                      description: The number of object library saves
 *                  review:
 *                      type: number
 *                      example: 100
 *                      required: true
 *                      description: The number of in review objects
 *                  total:
 *                      type: number
 *                      example: 100
 *                      required: true
 *                      description: The total number of objects
 *                  released:
 *                      type: number
 *                      example: 100
 *                      required: true
 *                      description: The number of released objects
 *                  lengths:
 *                      type: object
 *                      $ref: '#/components/schemas/LearningObjectStatsLength'
 *                  blooms_distribution:
 *                      type: object
 *                      $ref: '#/components/schemas/LearningObjectStatsBloom'
 *                  status:
 *                      type: object
 *                      $ref: '#/components/schemas/LearningObjectStatsStatus'
 *                  collections:
 *                      type: object
 *                      $ref: '#/components/schemas/LearningObjectStatsCollections'
 *          LearningObjectStatsCollections:
 *              properties:
 *                  numbers:
 *                      type: number
 *                      example: 100
 *                      required: true
 *                      description: The number of collections
 *          LearningObjectStatsStatus:
 *              properties:
 *                  waiting:
 *                      type: number
 *                      example: 100
 *                      required: true
 *                      description: The number of in waiting objects
 *                  peerReview:
 *                      type: number
 *                      example: 100
 *                      required: true
 *                      description: The number of in review objects
 *                  proofing:
 *                      type: number
 *                      example: 100
 *                      required: true
 *                      description: The number of in proofing objects
 *          LearningObjectStatsBloom:
 *              properties:
 *                  apply:
 *                      type: number
 *                      example: 100
 *                      required: true
 *                      description: The number of apply typed outcomes
 *                  evaluate:
 *                      type: number
 *                      example: 100
 *                      required: true
 *                      description: The number of evaluate typed outcomes
 *                  remember:
 *                      type: number
 *                      example: 100
 *                      required: true
 *                      description: The number of remember typed outcomes
 *          LearningObjectStatsLength:
 *              properties:
 *                  nanomodule:
 *                      type: number
 *                      example: 100
 *                      required: true
 *                      description: The number of nanomodule length objects
 *                  micromodule:
 *                      type: number
 *                      example: 100
 *                      required: true
 *                      description: The number of micromodule length objects
 *                  module:
 *                      type: number
 *                      example: 100
 *                      required: true
 *                      description: The number of module length objects
 *                  unit:
 *                      type: number
 *                      example: 100
 *                      required: true
 *                      description: The number of unit length objects
 *                  course:
 *                      type: number
 *                      example: 100
 *                      required: true
 *                      description: The number of course length objects
 *          Outcome:
 *              properties:
 *                  id:
 *                      type: string
 *                      example: 000000000000000000000000
 *                      required: true
 *                      description: The id of the outcome
 *                  bloom:
 *                      type: string
 *                      example: Remember
 *                      required: true
 *                      description: The outcome's bloom type
 *                  verb:
 *                      type: string
 *                      example: Classify
 *                      required: true
 *                      description: The outcome's verb
 *                  text:
 *                      type: string
 *                      example: that you can't divide by 0
 *                      required: true
 *                      description: The outcome's text
 *                  mappings:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/StandardOutcome'
 *          StandardOutcome:
 *              properties:
 *                  id:
 *                      type: string
 *                      example: 000000000000000000000000
 *                      required: true
 *                      description: The id of the standard outcome
 *                  author:
 *                      type: string
 *                      example: CS2013
 *                      required: true
 *                      description: The organization who created the outcome
 *                  source:
 *                      type: string
 *                      example: CS2013
 *                      required: true
 *                      description: The shortened organization who created the outcome
 *                  name:
 *                      type: string
 *                      example: Algorithmic Strategies
 *                      required: true
 *                      description: The type of the outcome
 *                  date:
 *                      type: string
 *                      example: 2013
 *                      required: true
 *                      description: The year the outcome was made
 *                  outcome:
 *                      type: string
 *                      example: This is a outcome
 *                      required: true
 *                      description: The outcome text
 */