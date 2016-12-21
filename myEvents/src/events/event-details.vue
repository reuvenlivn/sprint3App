<template>
    <section v-if="event">
        <h1>{{event.name}} </h1>
        <h2>{{event.place}} </h2>
        <h2>{{event.date}} </h2>
        <img :src="`/src/assets/event/${event.id}.png`" alt="">
        <button @click="nextEvent">Next</button>
    </section>
</template>

<script>
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
                this.$http.get(`item/${eventId}`)
                    .then(res => res.json())
                    .then(event => this.event = event);
            }
        },

        created() {
            // console.log('this.$route.params', this.$route.params);
             const eventId = this.$route.params.id;
             this.loadEvent(eventId);         
        }
    }
</script>

<style scoped>
    img {
        max-width: 400px;
    }    
</style>