const xhr = new XMLHttpRequest();

function post(url, data) {
    return fetch(url, {method: "POST", body: JSON.stringify(data)});
}

function isInvalid(parameter){
    return (parameter.length <= 0 || parameter == undefined)
}

function restaurantForm(restaurantID){
    const restaurantName = document.getElementById('restaurant-name').value 
    const restaurantImage = document.getElementById('restaurant-url').value 

    if(isInvalid(restaurantName) || isInvalid(restaurantImage)){
        return;
    }

    console.log(restaurantName, restaurantImage)
    console.log(restaurantID)

    post(`/restaurants/${{restaurantID}}/edit`, {name: restaurantName, image: restaurantImage})
}