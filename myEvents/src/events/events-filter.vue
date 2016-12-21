<template>
    <section>
        <h2>Filter</h2>
        <input type="text" @keyup.enter="emitFilter" v-model.lazy="filter.name">
    </section>
</template>


<script>
    export default {
        data() {
            return {
                filter: {name: ''}
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
        padding: 10px;
        border-radius: 5px;
    }

</style>