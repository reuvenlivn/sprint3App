<template>
    <section :class="{selected: email.isSelected}">
        {{email.from}} ({{email.subject}} {{email.isRead}})
        <!--<img :src="`src/assets/email/${email.id}.png`" alt="">-->
        <button @click.stop="deleteEmail">Delete</button>
        <button @click.stop="editEmail">Edit</button>
       <router-link :to="`/email/${email.id}/edit`">Edit</router-link>
    </section>
</template>

<script>
    export default {
        props: {
            email: {
                required: true,
                type: Object
            }
        },

        data(){
            return {
              isSelected: false
            }
        },

        methods: {
            deleteEmail() {
                this.$emit('doDelete', {emailId: this.email.id, timestamp: Date.now()});// TODO: why timestemp????
            },

            editEmail() {
                this.$emit('doEdit', this.email);
            },        
        }
    }
</script>

<style scoped>
    /*img {
        max-width: 200px;
    }*/
    .selected {
        border: 1px solid darkorchid;
    }
     
</style>