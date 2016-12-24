<template>
    <section>
        <!--<h1>Email List</h1>-->
        <ul>
            <li v-for="(currEmail, idx) in emails">
                <email-preview class="preview"  :email="currEmail"
                             @click.stop.native="$emit('selectEmail',currEmail.id)"
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
           }
        },
        
        components: {
            emailPreview
        }    
    }
</script>

<style scoped>
   ul {
        list-style-type: none;
        width:100%
    }
    .preview{
        border: solid 1px black;
        text-align: left;
        float:left;
        width:100%
    } 
</style>