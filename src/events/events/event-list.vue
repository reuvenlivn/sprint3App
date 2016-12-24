h<template>
    <section>
        <h1>Event List</h1>
        <ul>
            <li v-for="(currEvent, idx) in events">
                <event-preview class="event-preview" :event="currEvent"
                             @click.stop.native="$emit('selectEvent',currEvent.id)"
                             @doDelete="propegateDeleteReq"
                             @doEdit="$emit('doEdit', $event)"
                             >
                </event-preview>
            </li>  

        </ul>
    </section>
</template>

<script>
    import EventPreview from './event-preview.vue'
    export default {
        props: {
            events: {
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
            'event-preview' : EventPreview
        }    
    }
</script>

<style scoped>
    ul {
    list-style-type: none;
    }
    event-preview{
        border: 1px solid black;
        padding: 4px;
        margin-bottom: 20px;
    }
</style>