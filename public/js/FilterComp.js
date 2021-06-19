Vue.component('filter_el',{
    data () {
        return {
            userSearch: ''
        }
    },
    template: `
    <form action="#" class="search-form" @submit.prevent='$parent.$refs.products.filter(userSearch)'>
        <input type="text" class="search-field" v-model='userSearch'>
        <button class="btn-search" type="submit">
            <i class="fas fa-search">Найти</i>
        </button>
    </form>
    `
})