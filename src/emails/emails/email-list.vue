<template>
    <section>
        <h1>Event List</h1>
        <ul>
            <li v-for="(currEvent, idx) in emails">
                <email-preview :email="currEvent"
                             @click.stop.native="$emit('selectEvent',currEvent.id)"
                             @doDelete="propegateDeleteReq"
                             @doEdit="$emit('doEdit', $email)"
                             >
                </email-preview>
            </li>         
        </ul>
    </section>
</template>

<script>
    import EventPreview from './email-preview.vue'
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
               this.$emit('doDelete', deleteReq)//TODO: is it found in emails ?????
           }
        },
        
        components: {
            'email-preview' : EventPreview
        }    
    }
</script>

<style scoped>

</style>