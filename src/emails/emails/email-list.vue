<template>
    <!--@click.stop.native="$emit('selectEmail',currEmail.id)"-->
    <section>
        <!--<h1>Email List</h1>-->
        <ul>
            <li v-for="(currEmail, idx) in emails">
                <email-preview class="preview"  :email="currEmail"     
                             @click.stop.native="handleSelect(idx)"
                             @doDelete="propegateDeleteReq"
                             >
                </email-preview>
            </li>         
        </ul>
    </section>
</template>

<script>
    import emailPreview from './email-preview.vue'

    export default {
        props: {
            emails: {
                required: true,
                type: Array
            }
        },

        data(){
            return {          
            }
        },

        methods: {
           propegateDeleteReq(deleteReq) {
               this.$emit('doDelete', deleteReq)
           },

           handleSelect(idx) {
                let currEmail = this.emails[idx];

                // emit the id to the parent
                this.$emit('selectEmail', currEmail.id);

                // set the email as opened by the user.
                currEmail.isRead = true;
                //             this.$http.put('email', currEmail).then(handleResult);

                // send the email to the server.
                this.$http.put('email', currEmail).then(function (res) {
                    res.json()
                        .then(res => {
                            this.dataSaved = true;
                            // this.$router.push('/email');
                        })
                });
            }
        },
                
        components: {
            emailPreview
        }    
    }
</script>

<style scoped>
   ul {
        padding:0px;
        list-style-type: none;
        width:100%
    }
    .preview{
        border: solid 1px darkgrey;
        text-align: left;
        font-size:14px;
        float:left;
        width:100%;
        height:60px;
        overflow:hidden;
    } 

    .bolded {
        font-weight: bold
    }
</style>