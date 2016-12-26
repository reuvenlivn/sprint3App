<template>
    <section class="event-preview" :class="{selected: event.isSelected}">
        <button @click.stop="deleteEvent">Delete</button>
        <router-link :to="`/event/${event.id}/edit`">Edit</router-link>
        <div>{{event.name}}</div>
        <div>{{readableTime(event.time)}}</div>
        <div class = "description" v-html=shortContent(event.description)></div>
        <p class="end-of-preview">Click for more details...</p>

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
    .event-preview{
        display: block;
        padding: 4px;
        margin-bottom: 20px;
        line-height: 1.42857143;
        background-color: #fff;
        border: 1px solid #aaa;
        border-radius: 4px;
        text-align:left;
        max-width:310px;
        height: 300px;
        overflow-y: auto;
        overflow-x: hidden;
        font-size: 14px;
        word-wrap: break-word;
    }

    .end-of-preview{
        color: 1px solid #aaa
    }
    .description{
        max-width:344px; 
    }
    /*.img {
        border-width: 0px;
        border-style: initial;
        border-color: initial;
        border-image: initial;
        width:20%;
    }*/
</style>