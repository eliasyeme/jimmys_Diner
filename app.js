import menuArray from "./data.js"

function getMenuListHtml(menuList) {
    let menuHtml = ''
    menuList.forEach(menu => {
        const {emoji, id, ingredients, name, price} = menu
        menuHtml += `
            <article data-id="${id}">
                <span>${emoji}</span>
                <div>
                    <h2>${name}</h2>
                    <p>${ingredients.join(',')}</p>
                    <h3>$${price}</h3>
                </div>
                <button>+</button>
            </article>
        `
    })
    return menuHtml
}

function render() {
    document.getElementById('app').innerHTML = getMenuListHtml(menuArray)
}

render()