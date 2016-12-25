<template>
    <section :class="{selected: email.isSelected}">
        <button @click.stop="deleteEmail">Delete</button>
      {{toEnvelopeSym(email.isRead)}} &#9993; {{email.subject}}
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

            toEnvelopeSym(isRead) {
                return isRead ? '&#9993;' : '&#9993;'
            }  
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