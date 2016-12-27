<template>
    <section  v-if="event">
        <div class="event-details">
            <div class="event-heading">
                Name: {{event.name}}<br>
                Time: {{readableTime(event.time)}}
            </div>
            <div class="event-panel">   
                {{event.venue.name}}<br>
                {{event.venue.address_1}} , {{event.venue.address_2}}<br>
                {{event.venue.city}} , {{event.venue.localized_country_name}}<br>

                <div v-html=event.description></div>
                <div <a :href="event.link">Original Event</a></div>
            </div>
            <div class="map" ref="map"></div>
        </div>

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
                        zoom: 5,
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
    .event-details{
        width:100%;
        max-width:980px;
        margin: auto;
    }
    .event-heading {
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        color: rgb(255, 255, 255);
        background: rgb(51, 122, 183);
        /*border: solid 1px rgb(51, 122, 183);*/
        /*float: left;*/
        text-align: left;
        padding:30px;
        margin:30px;
        margin-bottom:0;
        /*width: 100%;*/
        /*max-width:860px;*/
        overflow: hidden;
    }
    .event-panel{
        /*border-top-left-radius: 3px;
        border-top-right-radius: 3px;*/
        text-align: left;
        border-color: rgb(51, 122, 183);
        border:1px solid;
        margin:30px;
        margin-bottom:0;
        margin-top:0;
        padding:30px;
        padding-top:0;
    }
   .map{
        height: 400px;
        width:400px;
        margin: auto;
        border: solid 1px rgb(51, 122, 183);
   }

</style>