const API ='https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductList{
        constructor(container ='.products'){
            this.container=container;
            this.goods=[];
            
            this._getProducts()
            .then(data=>{
                this.handleData(data);
            })
        }

    // _fetchProducts(){
    //     this.goods=[
    //         {id:1, title: "Notebook", price: 2000, img: "./image/notebook.jpg"},
    //         {id:2, title: "Mouse", price: 203, img: "./image/mouse.jpg"},
    //         {id:3, title: "Keyboard", price: 400, img: "./image/keyboard.jpg"},
    //         {id:4, title: "GamePad", price: 500, img: "./image/gamepad.jpg"},      
    //     ];
    // }
        
        handleData(data){
            this.goods=[...data];
            this.render();
        }

        _getProducts(){

            return fetch(`${API}/catalogData.json`)
                .then(result =>result.json())
                .catch(error=>{
                    alert('ERROR');
                })
        }

        

        render(){
            const block = document.querySelector(this.container);
            for(let product of this.goods){
                const productObj =new ProductItem(product);
                block.insertAdjacentHTML('beforeend',productObj.render());
            }
        }

        addPrice(){
            // const list =document.querySelector(this.container);
            // let summ=0;
            // for(let product of this.goods){
            //     summ +=product.price;
            // }
            // console.log(`Сумма всех товаров: ${summ}`);
            
            // let res =this.goods.reduce((sum,item) => sum +=item.price,0);
            // alert(`Сумма всех товаров: ${res}`);
        }
}

class ProductItem{
    constructor(product){
        this.product_name= product.product_name;
        this.price= product.price;
        this.img= product.img;
        this.id_product= product.id_product;
    }
      
    render(){
        return `<div class="products__item">
                <img class="products__item-image" src="./image/notebook.jpg" id=${this.id}>
                <h3 class="products__item-text">${this.product_name}</h3>
                <p class="products__item-price">${this.price}</p>
                <button class="products__item-button" class="buy-btn">Купить</button>
            </div>`
    }

}

let list= new ProductList();
list.render();
list.addPrice();

class Cart extends ProductList{
    constructor(container ='.cart'){
        super(container);
        this._init();
        this._getProducts()
            .then(data=>{
                this.handleData(data.contents);
            })
                
    }

    handleData(data){
        this.goods=[...data];
        this.render();
    }

    _getProducts(){

        return fetch(`${API}/getBasket.json`)
            .then(result =>result.json())
            .catch(error=>{
                alert('ERROR');
            })
    }

    render(){
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const productObj =new cartItem(product);
            block.insertAdjacentHTML('beforeend',productObj.render());
        }
    }

    _init(){
        document.querySelector(".head__left-cart").addEventListener('click', ()=>{
            document.querySelector(this.container).classList.toggle('invinsible');
        })
        
    }
//    addStuff{

//     }

//     removeStuff{

//     }
//     renderStuff{


// class CartStuff{
//    render(){}
}

class cartItem extends ProductItem{
    constructor(product){
        super(product)
        this.quantity=product.quantity;
        
    }
      
    render(){
        return `<div class="cart__item ">
                <img class="cart__item-image" src="./image/notebook.jpg" id=${this.id}>
                <h3 class="cart__item-text">${this.product_name}</h3>
                <p class="cart__item-price">${this.price}</p>
                <p class="cart__item-price">Количество: ${this.quantity}</p>
                <button class="cart__item-delete">&times;</button>
                
            </div>`
    }

}

let cart= new Cart();
cart.render();
