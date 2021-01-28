const menuTitleItems = document.getElementsByClassName('menu-title-class')

function isInvalid(parameter){
    return (parameter.length <= 0 || parameter == undefined)
}

async function restaurantForm(restaurantID){
    const restaurantName = document.getElementById('restaurant-name').value 
    const restaurantImage = document.getElementById('restaurant-image').value 
    if(isInvalid(restaurantName) || isInvalid(restaurantImage)){ return; }

    let menuItems = {}
    for(let i = 0; i < menuTitleItems.length; i++ ){
        const title = menuTitleItems[i].value
        if(isInvalid(title)) { 
            continue; 
        } else {
            menuItems[i] = title 
        }
    }

    const data = {
        name: restaurantName,
        image: restaurantImage,
        menus: menuItems
    }

    const url = `/restaurants/${restaurantID}/edit`
    
    fetch(url, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: "POST", 
        body: JSON.stringify(data)
    }).then(res =>
        window.location = res.url
    );
}