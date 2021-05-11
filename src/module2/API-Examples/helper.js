const fetch = require("node-fetch");

async function fetchJokes() {
    const response = await fetch("https://official-joke-api.appspot.com/jokes/ten")
    return response.json();
}

async function fetchFDAS() {
    const response = await fetch("https://api.fda.gov/food/enforcement.json?limit=10")
    return response.json();
}

async function fetchMemes() {
    const response = await fetch("https://api.imgflip.com/get_memes")
    return response.json();
}

module.exports = { fetchJokes, fetchFDAS, fetchMemes };