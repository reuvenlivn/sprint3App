<template>
    <section>
        <h1>event Center</h1>
        <router-link to="/event/edit">New event</router-link>
        <events-filter @filterChanged="eventsFilter = $event"></events-filter>
        <event-list :events="eventsToDisplay" 
            @selectevent="selectevent"
            @doDelete="deleteevent"
            @doEdit="eventToEdit = $event"
            >
    </event-list>
    <events-status :eventsCount="eventsToDisplay.length"></events-status>   
    </section>
</template>

<script>
    import eventList from './event-list.vue'
    import eventsStatus from './events-status.vue'
    import eventsFilter from './events-filter.vue'
    import eventEdit from './event-edit.vue'

    export default {
        data() {
            return {
                events: [],
                eventToEdit: undefined,
                eventsFilter: {name: ''},
                showeventEdit: false
            }
        },

        methods: {
            selectevent(eventId){
                // console.log('Selecting ', eventId);
                // this.events.forEach(event => {
                //     if (event.id === eventId)   event.isSelected = !event.isSelected;
                //     else                    event.isSelected = false;
                // });
                this.$router.push(`/event/${eventId}`);
            },

            deleteEvent(deleteReq) {
                    console.log('Deleting event: ', deleteReq.eventId, ' requested at: ', deleteReq.timestamp);
                    this.events = this.events.filter(event => event.id !== deleteReq.eventId);
                    this.$http.delete(`item/${deleteReq.eventId}`);// TODO: change to events/....
            },
            
            reloadEvents() {
                // fetch('http://localhost:3003/item')
                 this.$http.get('item')
                    .then(res => res.json())
                    .then(events => this.events = events);
                 this.eventToEdit = undefined;   
                 this.showeventEdit = false;
            }
        },

        computed:{
            eventsToDisplay() {
                return this.events.filter(event => {
                    return event.name.includes(this.eventsFilter.name);
                })
            }
        },

       created() {
           this.reloadevents();
            
       }, 

       components:{
           eventList, eventsFilter, eventsStatus, eventEdit
       }
    }
</script>

<style scoped>

</style>