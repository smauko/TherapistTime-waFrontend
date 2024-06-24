<template>
    <v-app style="margin-top: 20px;">
      <header class="custom-header">
      <h1> Prikaz profila</h1>
    </header>

     <v-container fluid style="margin-left: 15px; margin-top: 50px;">
        
      <v-row >
        <v-col
        style="text-align: left;"
          class="d-flex"
          cols="12"
          sm="6"
        >
        <img v-if="this.prikazProfila.Uloga=='Pacijent'" src="https://st3.depositphotos.com/6723736/12716/v/450/depositphotos_127168042-stock-illustration-men-of-depression.jpg" alt="Slika" style="height: 300px;" > 
        <img v-if="this.prikazProfila.Uloga=='Doktor'" src="https://media.istockphoto.com/id/1270360391/vector/multiethnic-nurse-characters-group.jpg?s=612x612&w=0&k=20&c=y8B_i0dvvRJCHNveg9Sl4JguYaWMqJmn1X7bNmtNtAk=" alt="Slika" style="height: 300px;" >     
    </v-col>
  
        <v-col style="text-align: left;align-items: left;"
          class="d-flex"
          cols="12"
          sm="6"
        >
        <p  >
        <b>Ime:</b>{{ prikazProfila.Ime }}
        <br><br><br>
        <b>Prezime:</b> {{ prikazProfila.Prezime }}
        <br><br><br>
        <b>Datum rođenja:</b> {{ prikazProfila.DatumRodenja }} <br><br><br>
        <b>Email:</b> {{ prikazProfila.Email }} <br><br><br>
    
        <span v-if="prikazProfila.Uloga=='Doktor'" ><b>Prosječna ocijena doktora:</b> {{ this.ocijena }}</span>  </p>
        </v-col>
  
       
        
         <v-col style="margin-top: 5%;" class="d-flex" cols="12" sm="6"> </v-col>

<v-col class="d-flex" cols="12" sm="6">
  
    <v-btn style="margin-top: 30px; margin-left: -70px;"
      outlined
      color="indigo"
      href="/urediprofil"
    >
      Uredi profil
    </v-btn>
        
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
      prikazProfila: {},
      ocijena:"",
    };
    
  },
  watch: {
    
  },
  computed: { 
  },
  async mounted() {

    await this.pregledProfila();
    console.log(this.prikazProfila.Uloga);
    await this.avgOcijena();
    
  },
  methods: {
    async pregledProfila(){
        let user = JSON.parse(localStorage.getItem('user'));
        let email = user.email;
        await axios.get('https://therapisttime-wabackend.onrender.com/pregledprofila',{params: {
                param15: email,
            }})
      .then(response => {
      console.log("uspio sam uzeti podatke", response.data);
      this.prikazProfila = response.data;
  })
      .catch(error => {
      console.error('Error:', error.response); 
        })
    },
    async avgOcijena(){
        let user = JSON.parse(localStorage.getItem('user'));
      let param10 = user.email;
      console.log("avgocijena:", param10)
     await axios.get('https://therapisttime-wabackend.onrender.com/avgocijene', {params: {
        param10: param10,
      }})
      .then(response => {
      console.log(response.data);
      this.ocijena=response.data.averageOcijena;
      }).catch(error => {
    
    console.error('Error:', error.response); 
        })

      
    },
}
};
</script>