<template>
 <v-app>

      <header class="custom-header" style="margin-top: 20px;">
        <h1>Zakazani termini</h1>
      </header>
      <p v-if="this.termini.length==0" style="text-align: middle; ">
        Loše se osjećate? Zakažite prvi termin odmah.
      </p>

  <Termin
          
          v-for="termin in this.termini"
          :key="termin.idTermina"
          :info="termin"
        />

      
    </v-app>
</template>
<script>
import Termin from "@/components/Termin.vue";
import axios from "axios";
export default {
  data() {
    return {
      termini: [],
      
    };

  },
  mounted(){
  this.dohvatiTermine();
  console.log(this.termini.idTermina);
  },
  methods: {
    dohvatiTermine(){
      let user = JSON.parse(localStorage.getItem('user'));
      let pacijent = user.email;
      axios.get('https://therapisttime-wabackend.onrender.com/zakazanitermini',{params: {
                param3: pacijent,
            }})
      .then(response => {
      console.log("uspio sam uzeti podatke", response.data);
      this.termini = response.data;
  })
      .catch(error => {
      console.error('Error:', error.response); 
        })
    }
},
components: {
    Termin
  },
};
</script>

<style scoped>
.custom-header h1 {
    margin-top: 20px;
    text-align: left;
    margin-left: 25px;
    font-size: 3em;
    color: black; 
    font-weight: normal;
  }
</style>  