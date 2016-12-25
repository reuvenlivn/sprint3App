<template>
    <section>
        <h1>About Us</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae, magnam non vel modi natus mollitia, aperiam saepe quaerat perspiciatis sunt aut, incidunt adipisci itaque hic impedit, consequuntur placeat. Dicta, ut!</p>
        <div class="map" ref="map"> </div>
    </section>
</template>

<script>
    import GoogleMapsLoader from 'google-maps'; 
    GoogleMapsLoader.KEY = 'AIzaSyA0qEXXktgHc71D-mIUFkBo3VyfeuHRm_Q';

    export default {       
        mounted() {
            // habonim 4,ranat gen, israel.
            var uluru = {lat: 32.087893, lng: 34.803038};
            const options = {
                                zoom: 17,
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