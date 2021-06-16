const product = {
    props: [ 'product'],
    template: `<div class="product-item">
                        <img class="products__item-image" src="./image/notebook.jpg" alt="Some img">
                        <div class="desc">
                            <h3>{{ product.product_name }}</h3>
                            <p>{{ product.price }} $</p>
                            <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
                        </div>
                    </div>`
}

const products = {
    components: {product},
    data () {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: []
        }
    },
    mounted () {
        console.log (this.$root.$refs)

        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
        this.$parent.getJson(`getProducts.json`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
                console.log (this.filtered)
            });
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
        :product="product"></product>
    </div>
    `
}