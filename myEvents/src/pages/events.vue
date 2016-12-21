<template>
    <section>
        <h1>Cars Page</h1>
        <!--<button @click="goHome">Go Home Ori!</button>-->
        <router-view></router-view>      
    </section>
</template>

<script>
    export default {
        data() {
            return {          
            }
        },
        methods: {
            // goHome() {
            //     this.$router.push('/');
            // }
        },
        components: {           
        }
    }
</script>