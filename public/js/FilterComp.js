Vue.component('filter_el',{
    data () {
        return {
            userSearch: ''
        }
    },
    template: `
    <form action="#" class="filter" @submit.prevent='$parent.$refs.products.filter(userSearch)'>
        <input type="text" class="filter__input" v-model='userSearch'>
        <button class="filter__button" type="submit">
            <i class="filter__button-text">Найти</i>
        </button>
    </form>
    `
})