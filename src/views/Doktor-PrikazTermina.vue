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
        <b>Podaci o pacijentu:</b> <br>
        <b>Ime:</b> {{ prikazTermina.Ime }}
        <br>
        <b>Prezime:</b> {{ prikazTermina.Prezime }}
        <br>
        <b>Datum rođenja:</b> {{ prikazTermina.DatumRodenja }}<br> </p>
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
    @click="dialog = true"
      
    >
      Napiši sažetak termina    </v-btn>
  
</v-col>
        
</v-row>
<v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ prikazTermina.Ime }} {{ prikazTermina.Prezime }} -> {{ prikazTermina.vrstaEpizode }} </span>
          </v-card-title>
          <v-card-text>
            <p>Napišite kratak sažetak odrađenog termina(300 znakova min.)</p>
            <v-textarea 
        counter
        label="Kratki sažetak termina"
        v-model="sazetakTermina"
        outlined />
    
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text  @click="posaljiSazetak()" >Pošalji</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      
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
      dialog: false,
      sazetakTermina:""
      
    };
    
  },
  watch: {
    
  },
  computed: { 
  },
  async mounted() {
    await this.prikaziTermin();
    
    
  },
  methods: {
    posaljiSazetak(){
        if (this.sazetakTermina.length > 300) {
          alert(
                  "Maksimalan broj znakova za sažetak termina je 300 znakova!"
                );
        }
        else{
        const idTermina = this.$route.params.id;
        let sazetakData= {
            id: idTermina,
            sazetak: this.sazetakTermina    
        };
        console.log(sazetakData);
        axios.post('https://therapisttime-wabackend.onrender.com/dodajsazetak', sazetakData)
  .then(response => {
    console.log('Response:', response.data);
    alert('Uspješno upisan sazetak!');
    this.$router.replace("/zakazaniterminD");
  })
  .catch(error => {
    alert('Pokušajte ponovno!');
    console.error('Error:', error.response); 
        })
    }
    },
    obrisiTermin(){
      const idTermina = this.$route.params.id;
      console.log(idTermina);
      axios.delete('https://therapisttime-wabackend.onrender.com/izbrisitermin' ,{params: {
                param5: idTermina,
            }})
      .then(response => {
      alert("Termin je uspješno otkazan!");
      this.$router.replace("/zakazaniterminD");
  }).catch(error => {
    console.error('Error:', error.response); 
        })
    },

    
    async prikaziTermin(){
      const idTermina = this.$route.params.id;
      console.log(idTermina);
      await axios.get('https://therapisttime-wabackend.onrender.com/prikazterminadoktor' ,{params: {
                param12: idTermina,
            }})
      .then(response => {
      //console.log("1",response.data.doktor);
      this.prikazTermina = response.data;
      //console.log("2",this.prikazTermina.doktor);
      //console.log("Ovo je iz funkcije", this.prikazTermina);
      this.avgOcijena;
      
  }).catch(error => {
    console.error('Error:', error.response); 
        })


    },
   
  }
};
</script>