const fetch = require('node-fetch');

class HTTPCHallenge{
    constructor(name, guests, menu){
        this.name = name;
        this.guests = guests 
        this.menu = menu
        this.id = ""
    }

    async getID(){
        const response = await fetch("https://http-challenge.multiverse-coaches.io/apprentices", {
            method: 'POST', 
            headers: {  "Accept": "application/json", 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: this.name }),
        }).catch(err => { console.log(`Failed to get URL with Error: ${err.message}`); })

        const text = await response.text().catch(err => { console.log(`Failed to get URL with Error: ${err.message}`);});
        this.id = text.match(/(?<=\/)[a-zA-Z0-9]+(?=')/)[0];
    }

    async sendPeople(){
        if(this.id === "") { return; }

        let formBody = [];
        const encodedKey = encodeURIComponent('guests');
        const encodedValue = encodeURIComponent(this.guests);
        formBody.push(encodedKey + "=" + encodedValue);
        formBody = formBody.join("&");

        const response = await fetch(`https://http-challenge.multiverse-coaches.io/apprentices/${this.id}`, { 
            method: 'PATCH',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
            body: formBody
        }).catch(err => { console.log(`Failed to get URL with Error: ${err.message}`); })

        const text = await response.text().catch(err => { console.log(`Failed to get URL with Error: ${err.message}`);});
        console.log(text);
    }

    async sendMenu() {
        if(this.id === "") { return; }

        const response = await fetch(`https://http-challenge.multiverse-coaches.io/apprentices/${this.id}/menus?starter=${this.menu['starter']}&main=${this.menu['main']}&dessert=${this.menu['dessert']}`, { 
            method: 'GET'
        }).catch(err => { console.log(`Failed to get URL with Error: ${err.message}`); })
        const text = await response.text().catch(err => { console.log(`Failed to get URL with Error: ${err.message}`);});
        console.log(text);
    }

    async doWashingUp(){
        if(this.id === "") { return; }

        const response = await fetch(`https://http-challenge.multiverse-coaches.io/apprentices/${this.id}`, { 
            method: 'DELETE'
        }).catch(err => { console.log(`Failed to get URL with Error: ${err.message}`); })

        const text = await response.text().catch(err => { console.log(`Failed to get URL with Error: ${err.message}`);});
        console.log(text);
    }

}


async function main(){
    httpChallenge = new HTTPCHallenge("james", "einstein, attenborough, scoobydoo", { starter: "soup", main: "curry", dessert: "tiramasu" });
    await httpChallenge.getID()
    console.log(httpChallenge.id);
    await httpChallenge.sendPeople();
    await httpChallenge.sendMenu();
    await httpChallenge.doWashingUp();
}

main();