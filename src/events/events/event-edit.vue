<template>
    <section>
        <form>
            Name: <br><input type="text" v-model="eventToEdit.name">
            <br><br>
            Time: <br><input type="datetime-local" v-model="eventToEdit.time">
            <br><br>
            <!--Venue Name: <input type="text" v-model="eventToEdit.venue.name">
            Venue Address1: <input type="text" v-model="eventToEdit.venue.address_1">
            Venue Address2: <input type="text" v-model="eventToEdit.venue.address_2">
            Venue City: <input type="text" v-model="eventToEdit.venue.city">-->
            description:<br>
             <textarea rows="10" cols="50" v-model="eventToEdit.description"></textarea>
            <br><br>
            <button @click.prevent="save">Save</button>
        </form>

        <!--<div class="event">
        <div class="event-heading">Edit Event</div>
        <form  name="eventform">
        <label for="field1"><span>Name <span class="required">*</span></span>
            <input type="text" class="input-field" name="field1" v-model="eventToEdit.name" />
        </label>
        <label for="field2"><span>Time <span class="required">*</span></span>
            <input type="text" class="input-field" name="field2" value="" v-model="eventToEdit.time"/>
        </label>
        <label for="field2"><span>Venue name <span class="required">*</span></span>
            <input type="text" class="input-field" name="field2" value="" v-model="eventToEdit.venue.name"/>
        </label>
        <label for="field2"><span>Venue address1 </span>
            <input type="text" class="input-field" name="field2" value="" v-model="eventToEdit.venue.address_1"/>
        </label>
        <label for="field2"><span>Venue address2 </span>
            <input type="text" class="input-field" name="field2" value="" v-model="eventToEdit.venue.address_2"/>
        </label>
        <label for="field2"><span>City </span>
            <input type="text" class="input-field" name="field2" value="" v-model="eventToEdit.venue.city"/>
        </label>
        <label for="field3"><span>Message </span>
            <textarea name="field3" class="textarea-field" v-model="eventToEdit.description"></textarea>
        </label>
        </form>
        </div>-->
    </section>
</template>

<script>
    export default {
        data() {
            return {
                event: {name: '', time: '', description:'' },
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
.event{
	max-width: 500px;
	padding: 20px 12px 10px 20px;
	font: 13px Arial, Helvetica, sans-serif;
}
.event-heading{
	font-weight: bold;
	font-style: italic;
	border-bottom: 2px solid #ddd;
	margin-bottom: 20px;
	font-size: 15px;
	padding-bottom: 3px;
}
.event label{
	display: block;
	margin: 0px 0px 15px 0px;
}
.event label > span{
	width: 100px;
	font-weight: bold;
	float: left;
	padding-top: 8px;
	padding-right: 5px;
}
.event span.required{
	color:red;
}
.event input.input-field{
	width: 48%;	
}

.event input.input-field, 
.event .textarea-field, 
 .event .select-field{
	box-sizing: border-box;
	border: 1px solid #C2C2C2;
	box-shadow: 1px 1px 4px #EBEBEB;
	border-radius: 3px;
	padding: 7px;
	outline: none;
}
.event .input-field:focus, 
.event .textarea-field:focus,  
.event .select-field:focus{
	border: 1px solid #0C0;
}
.event .textarea-field{
	height:100px;
	width: 55%;
}
.event input[type=button]{
	border: none;
	padding: 8px 15px 8px 15px;
	background: #FF8500;
	color: #fff;
	box-shadow: 1px 1px 4px #DADADA;
	border-radius: 3px;
}
.event input[type=button]:hover{
	background: #EA7B00;
	color: #fff;
}
    
</style>