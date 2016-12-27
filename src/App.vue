<template>
  <div id="app">
      <header>
            <!--<img src="./assets/logo.png">-->
            <h1>Sprint3App</h1>
            <nav>
                <!--For using bootstrap nav add: tag="li"-->
                <router-link to="/" active-class="active" exact>Home</router-link> |
                <router-link to="/email" active-class="active">Emails</router-link> |
                <router-link to="/event" active-class="active">Events</router-link> |
                <router-link to="/about" active-class="active">About</router-link>
            </nav>
      </header>
      <router-view></router-view>
    
      <footer>
          copyrights &copy; 2016-2017 
      </footer>

  </div>
</template>

<script>
// import CarCenter from './cars/car-center.vue';
import Emails from './emails/emails/email-center.vue';
import Events from './events/events/event-center.vue';

export default {
  name: 'app',
  data () {
    return {
     
    }
  },
  components: {
      Emails,
      Events
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 5px;
}

h1 {
  font-weight: normal;
  margin-bottom:3px;
}

a {
  color: #35495e;
  padding:5px;
  margin:5px;
  font-size:18px
}

header {
    border-bottom: 1px solid #35495e;
}

header img{
    width: 200px;
}

footer {
    width: 100%;
    text-align:center;
    padding: 1em;
    background-color:#35495e;
    color: white;
}

.active {
    color:blue;
}
</style>
