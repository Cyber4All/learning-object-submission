/**
 * @swagger
 * components:
 *      schemas:
 *          Metric:
 *              required:
 *                  - collection
 *                  - metrics
 *              properties:
 *                  collection:
 *                      type: string
 *                      description: The collection pulling metrics from
 *                      example: learning-objects
 *                  metrics:
 *                      type: object
 *                      description: The metrics
 *                      $ref: '#/components/schemas/MetricBody'
 *          MetricBody:
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
 *                  topDownloads:
 *                      type: array
 *                      description: The top downloads of a particular collection
 *                      items:
 *                          $ref: '#/components/schemas/Download'
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
 */

/**
 * @swagger
 * components:
 *      schemas:
 *          LibraryItem:
 *              properties:
 *                  savedOn:
 *                      type: string
 *                      description: When the object was saved to the user's library
 *                      example: 0
 *                      required: true
 *                  savedBy:
 *                      type: string
 *                      description: The username of the user who saved the object
 *                      example: jdoe1
 *                      required: true
 *                  learningObject:
 *                      type: object
 *                      description: The learning object saved to the library
 *                      $ref: '#/components/schemas/LearningObject'
 */