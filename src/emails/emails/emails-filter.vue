<template>
    <section>
        <h4>Search</h4>
        <input type="text" @keyup.enter="emitFilter" v-model.lazy="filter.subject">

        <select>
            <option value="all">All</option>
            <option value="read">Read</option>
            <option value="unread">Unread</option>
        </select>
         
    </section>  
</template>


<script>
    export default {

        props:{
            selected: null
        },

        data() {
            return {
                filter: {subject: ''}
            }
        },

        methods: {
            emitFilter() {
                this.$emit('filterChanged', this.filter);
            }
        }
    }

</script>

<style scoped>
    section {
        background-color: lightpink;
        padding: 5px;
        border-radius: 5px;
    }

</style>