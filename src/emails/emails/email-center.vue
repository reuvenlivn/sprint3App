<template>
    <div class="email-container">
        <div class="email-header">
        <h1>email Center</h1>
            <router-link to="/email/edit">New email</router-link>
            <emails-footer @filterChanged="emailsFilter = $event">
            </emails-footer>
        </div>
        <div class="emails">
            <email-list class="email-list" :emails="emailsToDisplay" 
                @selectEmail="selectEmail"
                @doDelete="deleteEmail"
                >
            </email-list>
            <email-details class="email-ditails">
            </email-details>      
        </div>
        <div class="email-footer">
            <emails-status :emailsCount="emailsToDisplay.length">
        </emails-status>   
        </div>
    </div>
</template>

<script>
    import emailList from './email-list.vue'
    import emailsStatus from './emails-status.vue'
    import emailsFilter from './emails-filter.vue'
    import emailEdit from './email-edit.vue'
    import emailDetails from './email-details.vue'

    export default {
        data() {
            return {
                emails: [],
                emailToEdit: undefined,
                emailsFilter: {subject: ''},
                showemailEdit: false
            }
        },

        methods: {
            selectEmail(emailId){
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
                    this.$http.delete(`email/${deleteReq.emailId}`);
            },
            
            reloadEmails() {
                // fetch('http://localhost:3003/item')
                 this.$http.get('email')
                    .then(res => res.json())
                    .then(emails => this.emails = emails);
                 this.emailToEdit = undefined;   
                 this.showemailEdit = false;
            }
        },

        computed:{
            emailsToDisplay() {
                return this.emails.filter(email => {
                    return email.subject.includes(this.emailsFilter.subject);
                })
            }
        },

       created() {
           this.reloadEmails();         
       }, 

       components:{
           emailList, 
           emailsFilter, 
           emailsStatus, 
           emailEdit,
           emailDetails
       }
    }
</script>

<style scoped>
.email-container{
    border: solid 1px black;
    width:100%;
    max-width:980px;
    margin: auto;
}
.email-header{
    width:100%;
}

.email-footer{
    width:100%;
}

.emails{
    width:100%;
}

.email-list{
    border: solid 1px grey;
    width:30%;
    min-width:150px;
    float: left;
}

.email-details{
    border: solid 1px blue;
    width:65%;
    margin-right:10px;
    float:left;
}
</style>