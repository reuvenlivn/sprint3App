<template>
    <div class="email-container">
        <div class="email-header">
            <!--<h1>email Center</h1>-->
            <router-link to="/email/edit">New email</router-link>
        </div>
        <div class="emails">
            <email-list class="email-list" :emails="emailsToDisplay" 
                @selectEmail="selectEmail"
                @doDelete="deleteEmail"
                >
            </email-list>
            <!--<child v-bind:childMsg="parentMsg"></child>-->
            <email-details :emailId="selectedId"></email-details>      
        </div>
        <div class="email-footer">
            <emails-status 
                :emailsCount="emailsToDisplay.length">
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
                selectedId: 1,
                emailsFilter: {subject: ''},
                showemailEdit: false
            }
        },

        methods: {
            selectEmail(emailId){
                this.selectedId = emailId;
                console.log('email center selectedId',this.selectedId);          
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
    height:480px;
    /*overflow:scroll;*/
}

.email-list{
    border: solid 1px grey;
    width:30%;
    min-width:150px;
    float: left;
    margin-top:0px;
    height:475px;
    overflow:scroll    
}

</style>