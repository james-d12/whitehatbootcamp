/**
 * @swagger
 *   components:
 *     schemas:
 *       Airport:
 *         type: object
 *         properties:
 *           origin:
 *             type: string
 *           destination:
 *             type: string
 *           flight_number:
 *             type: string
 *         example:
 *           origin: "London"
 *           destination: "Dubai"
 *           flight_number: "04OKFS4"
 */

module.exports = class Plane {
    origin = ""
    destination = ""
    flight_number = ""

    constructor(data) {
        Object.assign(this, data)
    }
}