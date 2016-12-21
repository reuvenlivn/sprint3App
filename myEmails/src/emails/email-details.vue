<template>
    <section v-if="email">
        <h1>{{email.name}} </h1>
        <h2>{{email.place}} </h2>
        <h2>{{email.date}} </h2>
        <img :src="`/src/assets/email/${email.id}.png`" alt="">
        <button @click="nextEmail">Next</button>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                email: null
            }
        },

        methods: {
            // nextEmail(){
            //     const nextId = this.email.id+1;
            //     this.$router.push(`/email/${nextId}`);
            //     this.loadEmail(this.email.id+1);
            // },

            loadEmail(emailId) {
                this.$http.get(`item/${emailId}`)
                    .then(res => res.json())
                    .then(email => this.email = email);
            }
        },

        created() {
            // console.log('this.$route.params', this.$route.params);
             const emailId = this.$route.params.id;
             this.loadEmail(emailId);         
        }
    }
</script>

<style scoped>
    img {
        max-width: 400px;
    }    
</style>