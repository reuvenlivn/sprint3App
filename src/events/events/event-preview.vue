<template>
    <section :class="{selected: event.isSelected}">
        <div>{{event.name}}</div>
        <div>{{readableTime(event.time)}}</div>
        <div v-html=shortContent(event.description)></div>
        <!--<img :src="`src/assets/event/${event.id}.png`" alt="">-->
        <button @click.stop="deleteEvent">Delete</button>
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
            },

            readableTime(timestamp)  {
                return (new Date(timestamp ));
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

    .thumbnail {
    display: block;
    padding: 4px;
    margin-bottom: 20px;
    line-height: 1.42857143;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    -webkit-transition: border .2s ease-in-out;
    transition: border .2s ease-in-out; 
    }    
</style>