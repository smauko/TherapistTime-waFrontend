<template>
  <div id="app">
    <nav class="side-navigation" >
      <h2 style="color:white; margin-top: 10px;"><router-link to="/">TherapistTime</router-link></h2>
      <ul>    

        <img v-if="uloga()==False" style="width: 230px;" src="../src/assets/landing.png" alt="Landing Image">
        <li v-if="uloga()=='Pacijent'"><router-link to="/zakazanitermini">Zakazani termini</router-link></li>
        <li v-if="uloga()=='Pacijent'"><router-link to="/zakazitermin">Zakaži termin</router-link></li>
        <li v-if="uloga()=='Pacijent'"><router-link to="/ocijenidoktora">Ocijeni doktora</router-link></li>
        <li v-if="uloga()=='Pacijent'"><router-link to="/pregledprofila">Pregled profila</router-link></li>
        <li style="margin-bottom: 10;" v-if="uloga()=='Pacijent' || uloga()=='Doktor'"><router-link to="/">Log Out</router-link></li>

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
  margin-left: 25%; /* Pomičite sadržaj za 25% širine bočnog navigacijskog menija */
}
.side-navigation {
  width: 25%;
  height: 100vh; /* Visina je 100% visine zaslona */
  position: fixed; /* Fiksirana pozicija da se ne pomiče s ostatkom stranice */
  background-color: rgb(54, 54, 211); /* Plava boja pozadine */
  top: 0; /* Postavite na vrh zaslona */
  left: 0; /* Postavite lijevo */
  align-self: center; /* Centrirajte stavke vertikalno */
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