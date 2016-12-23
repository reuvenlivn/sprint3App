<template>
    <section v-if="event">
        <div>{{event.name}}</div>
        <div>{{readableTime(event.time)}}</div>
               
        <div>{{event.venue.name}}</div>
        <div>{{event.venue.address_1}} , {{event.venue.address_2}}</div>
        <div>{{event.venue.city}} , {{event.venue.localized_country_name}}</div> 

        <div v-html=event.description></div>
        <div 
            <a :href="event.link">Original Event</a>
        </div>
        <div class="map" ref="map"></div>

        <button @click="nextEvent">Next</button>
    </section>
</template>

<script>

    import GoogleMapsLoader from 'google-maps'; 
    GoogleMapsLoader.KEY = 'AIzaSyCmL3JuRNp83SPzwH1YdKhrqOiqc9pc2IY';

    export default {
        data() {
            return {
                event: null
            }
        },

        methods: {
            // nextEvent(){
            //     const nextId = this.event.id+1;
            //     this.$router.push(`/event/${nextId}`);
            //     this.loadEvent(this.event.id+1);
            // },

            loadEvent(eventId) {
                this.$http.get(`event/${eventId}`)
                    .then(res => res.json())
                    .then(event => this.event = event);
                // console.log('this', this);          
            },

            readableTime(timestamp)  {
                return (new Date(timestamp));
            } 
        },

        created() {
            // console.log('this.$route.params', this.$route.params);
             const eventId = this.$route.params.id;
             this.loadEvent(eventId);         
        },

        mounted() {
    // //        var uluru = {lat: -25.363, lng: 131.044};        
    //         var location =  { lat : event.venue.lat, lng: event.venue.lon };
    //         const options = {
    //                             zoom: 4,
    //                             center: location
    //                         };
    //         GoogleMapsLoader.load(google => {
    //             new google.maps.Map(this.$refs.map, options);
    //         });
        }
    }
</script>

<style scoped>
    img {
        max-width: 400px;
    }    
</style>