<template>
    <section>
        <form>
            Name: <input type="text" v-model="emailToEdit.name">
            Place: <input type="number" v-model="emailToEdit.place">
            Date: <input type="number" v-model="emailToEdit.date">
            <button @click.premail="save">Save</button>
        </form>
       
    </section>
</template>

<script>
    export default {
        data() {
            return {
                email: {name: '', place: '', date='' },
                dataSaved: false,
            }
        },

        computed:{
            emailToEdit() {
                let obj = Object.assign({}, this.email);
                return obj;
            }
        },
       
        methods: {
            save() {
                let that = this;
                function handleResult(res) {
                    res.json()
                   .then(res => {
                           console.log("Result from server", res);
                        //    that.$emit('done')
                        this.dataSaved = true;
                        this.$router.push('/email');
                       }) 
                }

                console.log('Saving', this.emailToEdit);
                if (this.email.id)  this.$http.put(`item`, this.emailToEdit).then(handleResult);
                else                this.$http.post('item', this.emailToEdit).then(handleResult);
            },

            loadEmail(emailId) {
                this.$http.get(`item/${emailId}`)
                    .then(res => res.json())
                    .then(email => this.email = email);
            }
        },
       
        created() {
             const emailId = this.$route.params.id
             if (emailId)    this.loadEmail(emailId);
        },

        beforeRouteLeave(to, from, next) {
            if  (this.dataSaved) return next();
            if  ((this.email.name  === this.emailToEdit.name) && 
                (this.email.place === this.emailToEdit.place)&&
                (this.email.date === this.emailToEdit.date))
                        return next();

            const ans = confirm('Change will not save!');
            if (ans)        next();
            else            next(false)         
        }        
    }
</script>

<style scoped>
    
</style>