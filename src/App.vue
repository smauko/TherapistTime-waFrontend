<template>
  <div id="app">
    <nav class="side-navigation" >
      <h2 style="color:white; margin-top: 10px;"><router-link to="/">TherapistTime</router-link></h2>
      <ul>    

        <img v-if="uloga()==false" style="width: 230px;" src="../src/assets/landing.png" alt="Landing Image">
        <li v-if="uloga()=='Pacijent'"><router-link to="/zakazanitermini">Zakazani termini</router-link></li>
        <li v-if="uloga()=='Pacijent'"><router-link to="/zakazitermin">Zakaži termin</router-link></li>
        <li v-if="uloga()=='Pacijent'"><router-link to="/ocijenidoktora">Ocijeni doktora</router-link></li>
        <li v-if="uloga()=='Pacijent'"><router-link to="/pregledprofila">Pregled profila</router-link></li>
        <li v-if="uloga()=='Doktor'"><router-link to="/zakazaniterminD">Zakazani termini</router-link></li>
        <li style="margin-bottom: 10;" v-if="uloga()=='Pacijent' || uloga()=='Doktor'"><a href="#" @click.prevent="logOut()">Log Out</a></li>

      </ul>
    </nav>
    <div class="content">
    <router-view/>
    </div>
</div>
</template>

<script>

export default {
  name: 'App',
  mounted(){
    
  },
  methods:{
    uloga(){
        let user = JSON.parse(localStorage.getItem('user'));
        let uloga;
        if(user != null){
          uloga = user.uloga;
          return uloga;
        }
        return false;
      },

      logOut(){
        localStorage.removeItem('user');
        this.$router.replace("/");
      },
    
    }

      }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.content {
  margin-left: 25%; 
}
.side-navigation {
  width: 25%;
  height: 100vh; 
  position: fixed; 
  background-color: rgb(54, 54, 211);
  top: 0; 
  left: 0; 
  align-self: center; 
  justify-self: center;
}

.side-navigation ul {
  list-style: none;
  padding: 0;
  margin-top: 50%;
  
}

.side-navigation li {
  margin-bottom: 10px;
  
}

.side-navigation a {
  display: block; /* Prikazuje poveznice kao blok elemente */
  padding: 10px;
  text-decoration: none;
  color: white; /* Bijeli tekst */
}

</style>