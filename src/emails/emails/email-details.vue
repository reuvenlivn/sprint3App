<template>
    <section v-if="email">
        <h2>from: {{email.from}} </h2>
        <h2>to: {{email.to}} </h2>
        <h2>subject: {{email.subject}} </h2>
        <h2>body: {{email.body}} </h2>
        <h2>read?: {{email.isRead}} </h2>
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
                this.$http.get(`email/${emailId}`)
                    .then(res => res.json())
                    .then(email => this.email = email);
                // email.isRead = true;
            }
        },

        created() {
            // console.log('this.$route.params', this.$route.params);
             const emailId = this.$route.params.id;
             console.log('emailId', emailId);       
             this.loadEmail(emailId);         
        }
    }
</script>

<style scoped>
 
</style>