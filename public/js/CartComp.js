
Vue.component('cart',{
    data () {
        return {
            cartShown: false,
            cartItems: []
        }
    },
    methods: {
        addProduct (product) {
            let find = this.cartItems.find( el => el.id_product === product.id_product );
            if ( find ) {
                this.$parent.putJson( `/api/cart/${ product.id_product }/${ product.product_name }`, { quantity: 1 } )
                    .then( data => {
                        if ( data.result ) {
                            find.quantity++;
                        }
                    } )
            } else {
                let prod = Object.assign( { quantity: 1 }, product );
                this.$parent.postJson( `api/cart/${ product.id_product }/${ product.product_name }`, prod )
                    .then( data => {
                        if ( data.result ) {
                            this.cartItems.push( prod );
                        }
                    } )
            }
        },
        remove (product) {
            this.$parent.getJson(`/api/cart/`)
            .then(data => {
                if(data.result){
                    if (product.quantity > 1) {
                        product.quantity-- 
                    } else {
                        this.cartItems.splice (this.cartItems.indexOf (product), 1)
                    }
                }
            })
        }
        
    },
    mounted () {
        this.$parent.getJson(`/api/cart`)
        .then(data => {
            for(let el of data.contents){
                this.cartItems.push(el);
            }
        })
    },
    template: `
    <div>
        <button class="cart " type="button" @click="cartShown = !cartShown">Корзина</button>
        <div class="cart__block " v-show="cartShown">
            <p v-if="!cartItems.length">В корзине нет товаров</p>
            <cart-item v-for="item of cartItems"
            :key="product.id_product"
            :cart_item="product"
            :img="item.imgCart"
            </cart-item>
            
        </div>
    </div>`
})
const cartItem = {
    props: ['cart_item'],
    template: `
            <div class="cart-item">
                <div class="product-bio">
                    <img class="products__item-image" :src="img" alt="Some image">
                    <div class="product-desc">
                        <p class="product-title">{{ cart_item.product_name }}</p>
                        <p class="product-quantity">Quantity: {{ cart_item.quantity }}</p>
                        <p class="product-single-price">$ {{ cart_item.price }} rf-woods</p>
                    </div>
                </div>
                <div class="right-block">
                    <p class="product-price">{{ cart_item.quantity * cart_item.price }}</p>
                    <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                </div>
            </div>
        `
}