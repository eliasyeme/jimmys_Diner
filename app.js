import menuArray from "./data.js"

const orderArray = []

document.addEventListener('click', (e) => {
    if(e.target.dataset.add) {
        handleAddBtn(Number(e.target.dataset.add))
    } else if (e.target.dataset.remove) {
        handleRemoveBtn(e.target.dataset.remove)
    }
})

function getMenuById(id) {
    const menuObj = menuArray.filter(menu => menu.id === id)[0]
    return menuObj
}

function handleRemoveBtn(id) {
    if (orderArray.length) {
        const idx = orderArray.indexOf(getMenuById(id))
        const removed = orderArray.splice(idx, 1)
        render()
    }
}

function handleAddBtn(id) {
    const menuObj = getMenuById(id)
    if (menuObj) {
        orderArray.push(menuObj)
        render()
    }
}

function getOrderListHtml(orderList) {
    if (orderList.length) {
        let orderListHtml = ''
        orderList.forEach(order => {
            const {id, name, price } = order
            orderListHtml += `
                <div class="order">
                    <h2 class="order-text">${name}</h2>
                    <button class="remove-order-btn" data-remove="${id}">Remove</button>
                    <h3 class="order-price">$${price}</h3>
                </div>
            `
        })
        const orderHtml = `
                <section class="order-section">
                    <h2 class="order-title">Your order</h2>
                    <div class="orders">
                        ${orderListHtml}
                        <div class="divider"></div>
                        <div class="order">
                            <h2 class="order-text">Total price:</h2>
                            <h3 class="order-price">$${orderArray.reduce((acc, curr) => acc + curr.price, 0)}</h3>
                        </div>
                    <div>
                    <button class="primary-btn">Complete order</button>
                </section>

        `
        return orderHtml
    }
}

function getMenuListHtml(menuList) {
    let menuHtml = ''
    menuList.forEach(menu => {
        const {emoji, id, ingredients, name, price} = menu
        menuHtml += `
            <article>
                <span class="emoji">${emoji}</span>
                <div class="menu-text">
                    <h2 class="menu-name">${name}</h2>
                    <p class="menu-ingredient">${ingredients.join(',')}</p>
                    <h3 class="menu-price">$${price}</h3>
                </div>
                <button class="add-btn" data-add="${id}">+</button>
            </article>
        `
    })
    return menuHtml
}

function render() {
    const menuHtml = getMenuListHtml(menuArray)
    const orderHtml = getOrderListHtml(orderArray)

    let html = menuHtml

    if (orderArray.length) {
        html = [menuHtml, orderHtml].join('')
    }

    document.getElementById('app').innerHTML = html
}

render()