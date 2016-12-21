<template>
    <section>
        <h1>email Center</h1>
        <router-link to="/email/edit">New email</router-link>
        <emails-filter @filterChanged="emailsFilter = $email"></emails-filter>
        <email-list :emails="emailsToDisplay" 
            @selectemail="selectemail"
            @doDelete="deleteemail"
            @doEdit="emailToEdit = $email"
            >
    </email-list>
    <emails-status :emailsCount="emailsToDisplay.length"></emails-status>   
    </section>
</template>

<script>
    import emailList from './email-list.vue'
    import emailsStatus from './emails-status.vue'
    import emailsFilter from './emails-filter.vue'
    import emailEdit from './email-edit.vue'

    export default {
        data() {
            return {
                emails: [],
                emailToEdit: undefined,
                emailsFilter: {name: ''},
                showemailEdit: false
            }
        },

        methods: {
            selectemail(emailId){
                // console.log('Selecting ', emailId);
                // this.emails.forEach(email => {
                //     if (email.id === emailId)   email.isSelected = !email.isSelected;
                //     else                    email.isSelected = false;
                // });
                this.$router.push(`/email/${emailId}`);
            },

            deleteEmail(deleteReq) {
                    console.log('Deleting email: ', deleteReq.emailId, ' requested at: ', deleteReq.timestamp);
                    this.emails = this.emails.filter(email => email.id !== deleteReq.emailId);
                    this.$http.delete(`item/${deleteReq.emailId}`);// TODO: change to emails/....
            },
            
            reloadEmails() {
                // fetch('http://localhost:3003/item')
                 this.$http.get('item')
                    .then(res => res.json())
                    .then(emails => this.emails = emails);
                 this.emailToEdit = undefined;   
                 this.showemailEdit = false;
            }
        },

        computed:{
            emailsToDisplay() {
                return this.emails.filter(email => {
                    return email.name.includes(this.emailsFilter.name);
                })
            }
        },

       created() {
           this.reloademails();
            
       }, 

       components:{
           emailList, emailsFilter, emailsStatus, emailEdit
       }
    }
</script>

<style scoped>

</style>