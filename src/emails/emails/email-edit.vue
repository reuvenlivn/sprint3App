<template>

    <section class="email-edit">
        <h1>Edit email</h1>
        <form>
            <input type="text" name="To "  v-model="emailToEdit.to" placeholder="To" /><br>
            <input type="text" name="Subject " v-model="emailToEdit.subject" placeholder="Subject" /><br>
            <textarea name="Body" rows="10" cols="70" v-model="emailToEdit.body" placeholder="Type your email"></textarea><br>
            <input type="button" @click.prevent="send" value="Send" />
        </form>
    </section>


    <!--<section class="email-edit">
        <form>
            To: <input type="text" v-model="emailToEdit.to"><br>
            Subject: <input type="text" v-model="emailToEdit.subject"><br>
            Body: <br> <textarea rows="10" cols="50" v-model="emailToEdit.body"></textarea><br>
            <button @click.prevent="send">Send</button>
        </form> 
    </section>-->
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

email-edit{
	font: 95% Arial, Helvetica, sans-serif;
	max-width: 400px;
	margin: 10px auto;
	padding: 10px;
	background: #F7F7F7;
}
h1{
	background: rgb(51, 122, 183);
	padding: 10px 0;
	font-size: 140%;
	font-weight: 300;
	text-align: center;
	color: #fff;
	margin: -10px -10px 10px -10px;
}
input[type="text"],
textarea 
{
	outline: none;
	box-sizing: border-box;
	width: 80%;
	background: #fff;
	margin-bottom: 1%;
	border: 1px solid #ccc;
	padding: 1%;
	color: #555;
	font: 95% Arial, Helvetica, sans-serif;
}
input[type="text"]:focus,
textarea:focus,
select:focus
{
	box-shadow: 0 0 5px #43D1AF;
	padding: 2%;
	border: 1px solid #43D1AF;
}

input[type="button"]{
	box-sizing: border-box;
	width: 80%;
	padding: 1%;
	background: rgb(51, 122, 183);
	border-bottom: 2px solid rgb(51, 122, 183);
	border-top-style: none;
	border-right-style: none;
	border-left-style: none;	
	color: #fff;
}
input[type="button"]:hover{
	background: #2EBC99;
} 
</style>