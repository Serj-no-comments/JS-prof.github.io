class ProductList{
        constructor(container ='.products'){
            this.container=container;
            this.goods=[];
            this._fetchProducts();
    }

    _fetchProducts(){
        this.goods=[
            {id:1, title: "Notebook", price: 2000, img: "./image/notebook.jpg"},
            {id:2, title: "Mouse", price: 203, img: "./image/mouse.jpg"},
            {id:3, title: "Keyboard", price: 400, img: "./image/keyboard.jpg"},
            {id:4, title: "GamePad", price: 500, img: "./image/gamepad.jpg"},      
        ];
    }
    
    render(){
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const productObj =new ProductItem(product);
            block.insertAdjacentHTML('beforeend',productObj.render());
        }
    }

    addPrice(){
        const list =document.querySelector(this.container);
        let summ=0;
        for(let product of this.goods){
            summ +=product.price;
        }
        alert(`Сумма всех товаров: ${summ}`);
    }
}

class ProductItem{
    constructor(product){
        this.title= product.title;
        this.price= product.price;
        this.img= product.img;
        this.id= product.id;
    }
      
    render(){
        return ` <div class="products__item">
                <img class="products__item-image" src="${this.img}" id=${this.id}>
                <h3 class="products__item-text">${this.title}</h3>
                <p class="products__item-price">${this.price}</p>
                <button class="products__item-button" class="buy-btn">Купить</button>
            </div>`
    }

}

let  list= new ProductList();
list.render();
list.addPrice();
// class Cart{
//    addStuff{

//     }

//     removeStuff{

//     }
//     renderStuff{

//     }
// }

// class CartStuff{
//    render(){}
// }