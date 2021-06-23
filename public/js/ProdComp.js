

Vue.component('products', {
    data () {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: []
        }
    },
    mounted () {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
        // this.$parent.getJson(`getProducts.json`)
        //     .then(data => {
        //         for(let el of data){
        //             this.products.push(el);
        //             this.filtered.push(el);
        //         }
        //         console.log (this.filtered)
        //     });
    },
    methods: {
        filter (val) {
			let regExp = new RegExp (val, 'i');
            this.filtered = this.products.filter (el => regExp.test (el.product_name))
        }
    },
    template: `
    <div class="products">
        <product 
        v-for="product of filtered" 
        :key="product.id_product"
        :product="product"
        :img="product.imgProduct"
        ></product>
        
    </div>
    `
})

Vue.component('product',{
    props: [ 'product', 'img'],
    template: `<div class="products__item">
                        <img class="products__item-image" :src="img" alt="Some img">
                        <div class="desc">
                            <h3 class="products__item-text">{{ product.product_name }}</h3>
                            <p class="products__item-price">{{ product.price }} $</p>
                            <button class="products__item-button" @click="$root.$refs.cart.addProduct(product)">Купить</button>
                        </div>
                    </div>`
})