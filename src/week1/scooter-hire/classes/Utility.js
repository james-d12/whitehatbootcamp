/**
 * Generates a number between the specified range.
 * @param {Number} min - The specified minimum number in the range.
 * @param {Number} max - The specified maximum number in the range. 
 * @returns {Number} - Returns the randomly generated number.
 */
function random(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * 
 * @param {Int} length - The length of the ID to generate.
 * @returns {String} - Returns a randomly generated string of the given length.
 */
function generateID(length){
    let id = ""
    for(let i = 0; i < length; i++){
        id += String.fromCharCode(random(65,90))
    }
    return id 
}

module.exports = { generateID, random }