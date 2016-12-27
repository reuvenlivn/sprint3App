<template>
    <section class="email-details" v-if="email">
        <div class="subject">{{email.subject}}</div><hr>
        <div>From: {{email.from}} </div><hr>
        {{email.body}}
    </section>
</template>

<script>
    export default {
        props: {
            emailId: {
                required: true,
                type: Number
            }
        },

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
                    .then(email => {
                        this.email = email;
                        console.log('this.email', this.email);
                });
                // email.isRead = true;
            }
        },

        created() {
            //     mounted() {
            //         debugger
            // console.log('this.$route.params', this.$route.params);
            //  const emailId = this.$route.params.id;
            console.log('emailId email-details', this.emailId);
            this.loadEmail(this.emailId);         
        },
        watch:{
            emailId: function () {this.loadEmail(this.emailId)}
        } 
    }
</script>

<style scoped>
 
.email-details{
    border: solid 1px grey;
    width:65%;
    height:465px;
    margin-right:10px;
    margin-left:10px;
    float:left;
    text-align:left;
    font-size:14px;
    padding:5px;
    overflow-y:scroll;
    overflow-x:hidden  

}
.subject{
    font-weight: bold;
}

</style>