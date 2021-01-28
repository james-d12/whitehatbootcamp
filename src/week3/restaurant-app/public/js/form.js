const tables = document.getElementsByClassName('table-items')
const menuTitleItems = document.getElementsByClassName('menu-title-class')

function isInvalid(parameter){
    return (parameter.length <= 0 || parameter == undefined)
}

async function restaurantForm(restaurantID){
    let menuItems = {}    

    for(let i = 0; i < tables.length; i++){
        for(let k = 0; k < tables[i].rows.length; k++){
            const row = tables[i].rows[k]
            const itemName = rows.cells[0].innerText
            const itemPrice = Number(rows.cells[0].innerText)
        }
    }

    const restaurantName = document.getElementById('restaurant-name').value 
    const restaurantImage = document.getElementById('restaurant-image').value 
    if(isInvalid(restaurantName) || isInvalid(restaurantImage)){ return; }

    let menus = {}
    for(let i = 0; i < menuTitleItems.length; i++ ){
        const title = menuTitleItems[i].value
        if(isInvalid(title)) { continue; }           
        menus[i] = title

    }

    const data = {
        name: restaurantName,
        image: restaurantImage,
        menus: {
            titles: menus, 
            items: items 
        }
    }

    const url = `/restaurants/${restaurantID}/edit`
    
    fetch(url, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: "PUT", 
        body: JSON.stringify(data)
    }).then(res =>
        window.location = res.url
    );
}