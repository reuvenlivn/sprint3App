<template>
    <section class="event-edit">
        <h1>Edit event</h1>
        <form>
            <input type="text" name="Name "  v-model="eventToEdit.name" placeholder="name" /><br>
            <input type="Datetime-local" name="Time " v-model="eventToEdit.time" placeholder="time" /><br>
            <textarea name="Description" rows="10" cols="70" v-model="eventToEdit.description" placeholder="description"></textarea><br>
            <input type="button" @click.prevent="send" value="Send" />
        </form>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                event: {name: '', time: '', description:'' },
                dataSent: false
            }
        },

        computed:{
            eventToEdit() {
                let obj = Object.assign({}, this.event);
                return obj;
            }
        },
       
        methods: {

        send() {
                function handleResult(res) {
                    res.json()
                   .then(res => {
                        this.dataSent = true;
                        this.$router.push('/event');
                       }) 
                }
                console.log('Sending', this.eventToEdit);
                const defaultVenue = {
                    name : '',
                    address_1 : '',
                    address_2 : '',
                    city : 'tel-aviv',
                }
                this.eventToEdit.venue              = defaultVenue ;
                this.eventToEdit.link               ='';
                this.eventToEdit.lat                =32.08530;
                this.eventToEdit.lon                =34.78177;
                
                if (this.event.id)  this.$http.put('event', this.eventToEdit).then(handleResult);
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
            if  (this.dataSent) return next();
            if  ((this.event.name  === this.eventToEdit.name) && 
                (this.event.time === this.eventToEdit.time)&&
                (this.event.description === this.eventToEdit.description))
                        return next();

            const ans = confirm('Change will not save!');
            if (ans)        next();
            else            next(false)         
        }        
    }
</script>

<style scoped>

event-edit{
	font: 95% Arial, Helvetica, sans-serif;
	max-width: 400px;
	margin: 10px auto;
	padding: 10px;
	background: #F7F7F7;
}
h1{
	background: rgb(51, 122, 183);
	padding: 10px 0;
	font-size: 140%;
	font-weight: 300;
	text-align: center;
	color: #fff;
	margin: -10px -10px 10px -10px;
}
input[type="text"],
input[type="datetime-local"],
textarea 
{
	outline: none;
	box-sizing: border-box;
	width: 80%;
	background: #fff;
	margin-bottom: 1%;
	border: 1px solid #ccc;
	padding: 1%;
	color: #555;
	font: 95% Arial, Helvetica, sans-serif;
}
input[type="text"]:focus,
input[type="datetime-local"]:focus,
textarea:focus,
select:focus
{
	box-shadow: 0 0 5px #43D1AF;
	padding: 2%;
	border: 1px solid #43D1AF;
}

input[type="button"]{
	box-sizing: border-box;
	width: 80%;
	padding: 1%;
	background: rgb(51, 122, 183);
	border-bottom: 2px solid rgb(51, 122, 183);
	border-top-style: none;
	border-right-style: none;
	border-left-style: none;	
	color: #fff;
}
input[type="button"]:hover{
	background: #2EBC99;
} 
    
</style>