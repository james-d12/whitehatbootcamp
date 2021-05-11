const fetch = require('node-fetch');

class HTTPCHallenge{
    constructor(name, guests, menu){
        this.name = name;
        this.guests = guests 
        this.menu = menu
        this.id = ""
        this.url = "https://http-challenge.multiverse-coaches.io/apprentices";
    }

    async sendResponse(url, method, headers=null, body=null) {
        const response = await fetch(url, {
            method: method, 
            headers: headers,
            body: body,
        })
        return response;
    }

    async getID(){
        const url = this.url;
        const method = 'POST';
        const headers = {  "Accept": "application/json", 'Content-Type': 'application/json' };
        const body = JSON.stringify({ name: this.name })

        try {
            const response = await this.sendResponse(url, method, headers, body);
            const text = await response.text()
            this.id = text.match(/(?<=\/)[a-zA-Z0-9]+(?=')/)[0];
        } catch (err) {
            console.log(`Error whilst fetching URL with Error: ${err.message}.`);
        }
    }

    async sendPeople(){
        if(this.id === "") { return; }

        let formBody = [];
        const encodedKey = encodeURIComponent('guests');
        const encodedValue = encodeURIComponent(this.guests);
        formBody.push(encodedKey + "=" + encodedValue);
        formBody = formBody.join("&");

        const url = `${this.url}/${this.id}`;
        const method = 'PATCH';
        const headers = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' };
        const body = formBody;

        try {
            const response = await this.sendResponse(url, method, headers, body);
            const text = await response.text()
            console.log(text);
        } catch(err){
            console.log(`Error whilst fetching URL with Error: ${err.message}.`);
        }
    }

    async sendMenu() {
        if(this.id === "") { return; }

        const url = `${this.url}/${this.id}/menus?starter=${this.menu['starter']}&main=${this.menu['main']}&dessert=${this.menu['dessert']}`
        const method = 'GET';

        try {
            const response = await this.sendResponse(url, method);
            const text = await response.text();
            console.log(text);
        } catch (err) {
            console.log(`Error whilst fetching URL with Error: ${err.message}.`);
        }
    }

    async doWashingUp(){
        if(this.id === "") { return; }

        const url = `${this.url}/${this.id}`;
        const method = 'DELETE';

        try {
            const response = await this.sendResponse(url, method);
            const text = await response.text()
            console.log(text);
        } catch(err) {
            console.log(`Error whilst fetching URL with Error: ${err.message}.`);
        }
    }

}

async function main(){
    const name = "james";
    const guests = "einstein, attenborough, scoobydoo";
    const menus = { starter: "soup", main: "curry", dessert: "tiramasu" };

    httpChallenge = new HTTPCHallenge(name, guests, menus);
    
    await httpChallenge.getID()
    await httpChallenge.sendPeople();
    await httpChallenge.sendMenu();
    await httpChallenge.doWashingUp();
}

main();