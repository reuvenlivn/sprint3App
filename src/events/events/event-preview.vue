<template>
    <section :class="{selected: event.isSelected}">
        <div>{{event.name}}</div>
        <div>{{event.venue.address_1}}</div>
        <div>{{event.venue.address_2}}</div>
        <div>{{event.venue.city}}</div>
        <div v-html=shortContent(event.description)></div>
        <!--<img :src="`src/assets/event/${event.id}.png`" alt="">-->
        <button @click.stop="deleteEvent">Delete</button>
        <!--<button @click.stop="editEvent">Edit</button>-->
       <router-link :to="`/event/${event.id}/edit`">Edit</router-link>
    </section>
</template>

<script>
    export default {
        props: {
            event: {
                required: true,
                type: Object
            }
        },

        data(){
            return {
              isSelected: false
            }
        },

        methods: {
            deleteEvent() {
                this.$emit('doDelete', {eventId: this.event.id, timestamp: Date.now()});// TODO: why timestemp????
            },

            editEvent() {
                this.$emit('doEdit', this.event);
            }, 

            shortContent(longStr){
                 return longStr.substring(0, 200);
            }      
        }
    }
</script>

<style scoped>
    /*img {
        max-width: 200px;
    }*/
    .selected {
        border: 1px solid darkorchid;
    }
     
</style>