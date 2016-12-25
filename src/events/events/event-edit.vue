<template>
    <section>
        <form>
            Name: <input type="text" v-model="eventToEdit.name">
            Place: <input type="number" v-model="eventToEdit.place">
            Date: <input type="number" v-model="eventToEdit.date">
            <button @click.prevent="save">Save</button>
        </form>
       
    </section>
</template>

<script>
    export default {
        data() {
            return {
                event: {name: '', place: '', date:'' },
                dataSaved: false
            }
        },

        computed:{
            eventToEdit() {
                let obj = Object.assign({}, this.event);
                return obj;
            }
        },
       
        methods: {
            save() {
                let that = this;
                function handleResult(res) {
                    res.json()
                   .then(res => {
                    //       console.log("Result from server", res);
                        //    that.$emit('done')
                        this.dataSaved = true;
                        this.$router.push('/event');
                       }) 
                }

                console.log('Saving', this.eventToEdit);
                if (this.event.id)  this.$http.put(`event`, this.eventToEdit).then(handleResult);
                else                this.$http.post('event', this.eventToEdit).then(handleResult);
            },

            loadEvent(eventId) {
                this.$http.get(`event/${eventId}`)
                    .then(res => res.json())
                    .then(event => this.event = event);
            }
        },
       
        created() {
             const eventId = this.$route.params.id
             if (eventId)    this.loadEvent(eventId);
        },

        beforeRouteLeave(to, from, next) {
            if  (this.dataSaved) return next();
            if  ((this.event.name  === this.eventToEdit.name) && 
                (this.event.place === this.eventToEdit.place)&&
                (this.event.date === this.eventToEdit.date))
                        return next();

            const ans = confirm('Change will not save!');
            if (ans)        next();
            else            next(false)         
        }        
    }
</script>

<style scoped>
    
</style>