<template>
    <section  v-if="event">
        <div class="event-heading">
            <div>{{event.name}}</div>
            <div>{{readableTime(event.time)}}</div>
        </div>
        <div class="event-panel">   
            <div>{{event.venue.name}}</div>
            <div>{{event.venue.address_1}} , {{event.venue.address_2}}</div>
            <div>{{event.venue.city}} , {{event.venue.localized_country_name}}</div> 

            <div v-html=event.description></div>
            <div <a :href="event.link">Original Event</a>
            </div>
        </div>
        <div class="map" ref="map"></div>

        <!--<button @click="nextEvent">Next</button>-->
    </section>
</template>

<script>

    import GoogleMapsLoader from 'google-maps'; 
    GoogleMapsLoader.KEY = 'AIzaSyA0qEXXktgHc71D-mIUFkBo3VyfeuHRm_Q';

    export default {
        data() {
            return {
                event: null
            }
        },

        methods: {

            readableTime(timestamp)  {
                return (new Date(timestamp));
            } ,

            loadEvent(eventId) {
                this.$http.get(`event/${eventId}`)
                    .then(res => res.json())               
                    .then(event => {
                        this.event = event;
  

                    // console.log('this.event',this.event.venue);
                    let location = { lat: this.event.venue.lat, lng: this.event.venue.lon };

                    const mapOptions = {
                        zoom: 17,
                        center: location
                    };

                    GoogleMapsLoader.load(google => {
                        let myMap = new google.maps.Map(this.$refs.map, mapOptions);
                        const markerOptions = {
                            position: location,
                            map: myMap,
                            title: this.event.venue.name
                        };
                        let marker = new google.maps.Marker(markerOptions);
                    });
                  });

     //             console.log('markerOptions', markerOptions);            
            }
        },

        created() {
     
        },

        mounted() { 
       // console.log('this.$route.params', this.$route.params);
            const eventId = this.$route.params.id;
            this.loadEvent(eventId);
        }

    }
</script>


<style scoped>
    .map {
        height: 400px;
    }
    .event-heading {
        color: rgb(255, 255, 255);
        background-color: rgb(51, 122, 183);
        border-color: rgb(51, 122, 183);
        text-align: left;
    }   
    .event-panel {
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        text-align: left;
        border-color: rgb(51, 122, 183);
        border:1px solid;
        margin:3px;
        padding:20px;
    }   
 
</style>