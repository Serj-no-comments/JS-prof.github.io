const product= [
    {id:1, title: "Notebook", price: 2000, img: "./image/notebook.jpg"},
    {id:2, title: "Mouse", price: 203, img: "./image/mouse.jpg"},
    {id:3, title: "Keyboard", price: 400, img: "./image/keyboard.jpg"},
    {id:4, title: "GamePad", price: 500, img: "./image/gamepad.jpg"},
];

const renderProduct = (product) => {
    return ` <div class="product__item">
                <img class="product__item-image" src="${product.img}">
                <h3 class="product__item-text">${product.title}</h3>
                <p class="product__item-price">${product.price}</p>
                <button class="product__item-button" class="buy-btn">Купить</button>
            </div>`
};

const renderPage = list => {
    document.querySelector('.product').innerHTML = list.map(item => renderProduct(item)).join(' ');
};

renderPage(product);
