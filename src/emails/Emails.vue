<template>
  <div id="app">
      <header>
            <!--<img src="./assets/logo.png">-->
            <h1>Emails</h1>
            <nav>
                <!--For using bootstrap nav add: tag="li"-->
                <!--<router-link to="/" active-class="active" exact>Home</router-link> |-->
                <router-link to="/email" active-class="active">Emails</router-link> |
                <!--<router-link to="/about" active-class="active">About</router-link>-->
            </nav>
      </header>
      <router-view></router-view>
    
      <footer>
          copyrights &copy; 2016 
      </footer>

  </div>
</template>

<script>
import EmailCenter from './emails/email-center.vue';

export default {
  name: 'app',
  data () {
    return {
     
    }
  },
  components: {
      EmailCenter
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}

h1, h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}

header {
    border-bottom: 5px solid #35495e;
}

header img{
    width: 200px;
}

footer {
    width: 100%;
    text-align:center;
    padding: 1em;
    background-color:#42b983; 
}

.active {
    color:blue;
}
</style>
