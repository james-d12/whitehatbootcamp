function generateID(length=8){
    let id = ""
    for(let i = 0; i < length; i++){
        const num = Math.round(Math.random() * (90 - 65) + 65)
        id += String.fromCharCode(num)
    }
    return id 
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}

module.exports = { generateID, random }