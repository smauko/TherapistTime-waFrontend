<template>
    <v-app style="margin-top: 20px;">
      <header class="custom-header">
      <h1> {{ prikazTermina.vrstaEpizode }}</h1>
    </header>

     <v-container fluid style="margin-left: 15px; margin-top: 50px;">
        
      <v-row >
        <v-col
        style="text-align: left;"
          class="d-flex"
          cols="12"
          sm="6"
        >
       
        <p> <b >Opis epizode:</b> <br> 
          {{ prikazTermina.opisEpizode }}</p>
        </v-col>
  
        <v-col style="text-align: left;"
          class="d-flex"
          cols="12"
          sm="6"
        >
        <p style="margin-left: 20%;" >
        <b>Odabrani doktor:</b> <br>
        <b>Ime:</b> {{ prikazTermina.Ime }}
        <br>
        <b>Prezime:</b> {{ prikazTermina.Prezime }}
        <br>
        <b>Datum rođenja:</b> {{ prikazTermina.DatumRodenja }}<br>
        <b>Prosječna ocijena doktora:</b> {{ avgOcijenaDoktora }}</p>
        </v-col>
  
        <v-col style="margin-top: 5%;"
          class="d-flex"
          cols="12"
          sm="6"
        >

        <b>Zoom link: </b> {{ prikazTermina.zoom }}
        

        </v-col>
  
        <v-col
          class="d-flex"
          cols="12"
          sm="6">
        
        </v-col>
        
         <v-col style="margin-top: 5%;" class="d-flex" cols="12" sm="6"><b>Status:</b> {{ prikazTermina.status }}</v-col>

<v-col class="d-flex" cols="12" sm="6">
  
</v-col>
<v-col
          class="d-flex"
          cols="12"
          sm="6">
          
        
        </v-col>
        <v-col 
        
          class="d-flex"
          cols="12"
          sm="6">
          <v-btn v-if="prikazTermina.status=='neodrađen'"
          style="margin-left: 30%;"
      outlined
      color="indigo"
      @click="obrisiTermin"
      
    >
      Otkaži termin
    </v-btn>
    
        
        </v-col>
        <v-col class="d-flex" cols="12" sm="6">
  
</v-col>
<v-col class="d-flex" cols="12" sm="6">
  <v-btn v-if="prikazTermina.status=='odrađen'" style="margin-left: 30%; margin-top: -20px;"
      outlined
      color="indigo"
      
    >
      Pregled doktorove bilješke    </v-btn>
  
</v-col>
        
</v-row>

      
    </v-container>
   
   
  </v-app>

  </template>
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
          
    
<script>
import axios from 'axios';

  export default {
    data() {
    return {
      prikazTermina: {},
      avgOcijenaDoktora:""
    };
    
  },
  watch: {
    
  },
  computed: { 
  },
  async mounted() {
    console.log(this.prikazTermina);
     await this.prikaziTermin();
    this.avgOcijena();
    console.log("3",this.prikazTermina.doktor);
    
  },
  methods: {
    obrisiTermin(){
      const idTermina = this.$route.params.id;
      console.log(idTermina);
      axios.delete('http://localhost:3000/izbrisitermin' ,{params: {
                param5: idTermina,
            }})
      .then(response => {
      alert("Termin je uspješno otkazan!");
      this.$router.replace("/zakazanitermini");
  }).catch(error => {
    console.error('Error:', error.response); 
        })


    },

    avgOcijena(){
      let param10 = this.prikazTermina.doktor;
      console.log("avgocijena:", param10)
      axios.get('http://localhost:3000/avgocijene', {params: {
        param10: param10,
      }})
      .then(response => {
      console.log(response.data);
      this.avgOcijenaDoktora=response.data.averageOcijena;
      }).catch(error => {
    
    console.error('Error:', error.response); 
        })

      
    },
    async prikaziTermin(){
      const idTermina = this.$route.params.id;
      console.log(idTermina);
      await axios.get('http://localhost:3000/prikaztermina' ,{params: {
                param4: idTermina,
            }})
      .then(response => {
      console.log("1",response.data.doktor);
      this.prikazTermina = response.data;
      console.log("2",this.prikazTermina.doktor);
      console.log("Ovo je iz funkcije", this.prikazTermina);
      this.avgOcijena;
      
  }).catch(error => {
    console.error('Error:', error.response); 
        })


    },
   
  }
};
</script>