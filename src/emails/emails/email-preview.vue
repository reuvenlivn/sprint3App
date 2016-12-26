<template>
    <section :class="{selected: email.isSelected}">
        <button @click.stop="deleteEmail">Delete
        </button>
        <img src="./assets/env.png" width="20" height="20">
        <img src="./assets/envopen.png" width="20" height="20">
        <!--<img v-attr="src: {{email.envurl}}"-->
        {{email.subject}}
        {{email.isRead}}
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
                this.$emit('doDelete', {emailId: this.email.id, timestamp: Date.now()});
            },

            editEmail() {
                this.$emit('doEdit', this.email);
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