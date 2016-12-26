<template>
    <section class="email-edit">
        <form>
            To: <input type="text" v-model="emailToEdit.to"><br>
            Subject: <input type="text" v-model="emailToEdit.subject"><br>
            Body: <br> <textarea rows="10" cols="50" v-model="emailToEdit.body"></textarea><br>
            <button @click.prevent="send">Send</button>
        </form> 
    </section>
</template>

<script>
    export default {
        data() {
            const ME = 'me@meme.coco';
            return {
                email: {from:ME, to: '', subject:'', body:'', isRead:false },
                dataSent: false
            }
        },

        computed:{
            emailToEdit() {
                let obj = Object.assign({}, this.email);
                return obj;
            }
        },
       
        methods: {
            send() {
                // let that = this;
                function handleResult(res) {
                    res.json()
                   .then(res => {
                        //   console.log("Result from server", res);
                        //    that.$emit('done')
                        this.dataSent = true;
                        this.$router.push('/email');
                       }) 
                }

                console.log('Sending', this.emailToEdit);
                if (this.email.id)  this.$http.put('email', this.emailToEdit).then(handleResult);
                else                this.$http.post('email', this.emailToEdit).then(handleResult);
            },

            loadEmail(emailId) {
                this.$http.get(`item/${emailId}`)
                    .then(res => res.json())
                    .then(email => this.email = email);
            }
        },
       
        created() {
             const emailId = this.$route.params.id;
             console.log('emailId(edit)',emailId);
             
             if (emailId)    this.loadEmail(emailId);
        },

        beforeRouteLeave(to, from, next) {
            if  (this.dataSent) return next();

            if  ((this.email.to  === this.emailToEdit.to) && 
                (this.email.subject === this.emailToEdit.subject)&&
                (this.email.body === this.emailToEdit.body))
                    return next();

            const ans = confirm('Change will not save!');
            if (ans)        next();
            else            next(false)         
        }        
    }
</script>

<style scoped>
.email-edit {
    width:60%;
    align-items:left;
} 
.form {
        align-items:left;

}
.textarea{
	height:200px;
	width: 60%;
} 
.input{
   	width: 60%; 
}
</style>