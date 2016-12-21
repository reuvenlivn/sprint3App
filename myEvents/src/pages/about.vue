<template>
    <section>
    <h1>About Us</h1>
    <div class="map" ref="map">
    </div>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae, magnam non vel modi natus mollitia, aperiam saepe quaerat perspiciatis sunt aut, incidunt adipisci itaque hic impedit, consequuntur placeat. Dicta, ut!</p>
    </section>
</template>

<script>
    import GoogleMapsLoader from 'google-maps'; 
    GoogleMapsLoader.KEY = 'AIzaSyCmL3JuRNp83SPzwH1YdKhrqOiqc9pc2IY';

    export default {
        
        mounted() {
            var uluru = {lat: -25.363, lng: 131.044};
            const options = {
                                zoom: 4,
                                center: uluru
                            };
            GoogleMapsLoader.load(google => {
                new google.maps.Map(this.$refs.map, options);
            });
        }
    }

</script>
<style scoped>
.map {
    height: 400px;
}
</style>