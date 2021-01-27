function get(url){
    return fetch(url, {method: "GET"})
}

async function post(url, data) {
    return await fetch(url, {method: "POST", body: JSON.stringify(data)});
}

function isInvalid(parameter){
    return (parameter.length <= 0 || parameter == undefined)
}

async function restaurantForm(restaurantID){
    console.log("test")
    const restaurantName = document.getElementById('restaurant-name').value 
    const restaurantImage = document.getElementById('restaurant-url').value 
    if(isInvalid(restaurantName) || isInvalid(restaurantImage)){ return; }

    console.log("name: " + restaurantName)
    console.log("image: " + restaurantImage)

    const data = {
        name: restaurantName,
        image: restaurantImage
    }

    const url = `/restaurants/${restaurantID}/edit`

    await fetch(url, {
        method: "POST", 
        body: JSON.stringify(data)
    })

}