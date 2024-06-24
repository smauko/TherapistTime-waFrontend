<template>
    <v-app style="margin-top: 20px;">
      <header class="custom-header">
      <h1>Zakaži termin</h1>
    </header>

     <v-container fluid style="margin-left: 15px; margin-top: 50px;">
        
      <v-row align="center" style="margin-right: 60px;">
        <v-col
          class="d-flex"
          cols="12"
          sm="6"
        >
        <v-combobox
          :items="vrste_epizoda"
          label="Vrste epizoda/napadaja"
          v-model="vrstaEpizode"
          outlined
        ></v-combobox>
        </v-col>
  
        <v-col
          class="d-flex"
          cols="12"
          sm="6"
        >
        <v-combobox
          :items="this.doktori"
          label="Odabir doktora"
          v-model="doktor"
          outlined
        ></v-combobox>
        </v-col>
  
        <v-col
          class="d-flex"
          cols="12"
          sm="6"
        >
        <v-textarea 
        counter
        label="Kratki opis epizode/napadaja"
        v-model="opisEpizode"
        outlined />
        </v-col>
  
        <v-col
          class="d-flex"
          cols="12"
          sm="6"
        >
        <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
        required
        outlined
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field style="margin-top: -90px;"
            label="Odabir datum termina"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            v-model="datum"
            required
            outlined
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="datum"
          :allowed-dates="allowedDates" 
          @input="menu2 = false"
          required
        ></v-date-picker>
      </v-menu>
        </v-col>
        
         <v-col class="d-flex" cols="12" sm="6"></v-col>

<v-col class="d-flex" cols="12" sm="6">
  <v-combobox style="margin-top: -110px;":items="this.svi_termini" v-model="vrijeme" label="Dostupni termini za odabrani datum" outlined></v-combobox>
</v-col>
        
</v-row>
<v-btn style="margin-top: 30px; margin-left: -70px;"
      outlined
      color="indigo"
      @click="zakaziTermin"
    >
      Zakaži termin
    </v-btn>
      
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
      //// vuetify
      menu2: false,

      ////
      vrste_epizoda: [
        "Poremećaji raspoloženja",
        "Anksiozni poremećaji",
        "Opsesivno-kompulzivni i srodni poremećaji",
        "Poremećaji povezani s traumom i stresom",
        "Poremećaji ličnosti",
        "Psihotični poremećaji",
        "Poremećaji prehrane",
        "Poremećaji pažnje i hiperaktivnosti",
        "Poremećaji iz spektra autizma",
        "Poremećaji spavanja",
        "Poremećaji ovisnosti",
        "Somatoformni poremećaji",
        "Disocijativni poremećaji",
        "Neurokognitivni poremećaji",
        "Poremećaji kontrole impulsa"
      ],
      vrstaEpizode: "",
      opisEpizode: "",
      doktor: "",
      datum: "",
      svi_termini:[],
      vrijeme:"",
      status: "neodrađen",
      zoom: "https://zoom.us/j/1234567890?pwd=dummyZoomLink",
      doktori: [],
      
    };
    
  },
  watch: {
    doktor: 'promjena',
    datum: 'promjena'
  },
  computed: { 
  },
  mounted() {
    this.dohvatiDoktore();
    
  },
  methods: {
    formatDatum(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}.${month}.${year}.`;
},
    promjena(){
      this.svi_termini=[];
      if(this.doktor != "" && this.datum != ""){
        //console.log(this.doktor, this.datum); 
        let paramDoktor = this.doktor.match(/\(([^)]+)\)/)[1];
        let paramDatum = this.formatDatum(this.datum); 
        console.log("primjetio sam promjenu",this.doktor, this.datum);
        axios.get('https://therapisttime-wabackend.onrender.com/zakazitermin/dostupnitermini',{params: {
                param1: paramDoktor,
                param2: paramDatum
            }})
      .then(response => {
      //console.log("uspio sam uzeti podatke", response.data);
      let slobodniTermini = response.data;
      this.svi_termini = slobodniTermini;
      
  })
      .catch(error => {
      console.error('Error:', error.response); 
        })
      }
    },


    allowedDates(date) {
      const today = new Date();
      const twoWeeksFromNow = new Date();
      twoWeeksFromNow.setDate(today.getDate() + 14);

      const parsedDate = new Date(date);
      return parsedDate >= today && parsedDate <= twoWeeksFromNow;
    },
    dohvatiDoktore(){
      this.doktori = [];

      axios.get('https://therapisttime-wabackend.onrender.com/zakazitermin/doktori')
      .then(response => {
      let data = response.data;
      this.doktori = data.map(doktor => `${doktor.Ime} ${doktor.Prezime} (${doktor.Email})`);
      //console.log('Svi doktori:', this.doktori);
  })
      .catch(error => {
      console.error('Error:', error.response); 
        })



    },
    zakaziTermin(){
      let user = JSON.parse(localStorage.getItem('user'));
      let pacijent = user.email;
      if(!this.opisEpizode || 
        !this.vrstaEpizode || 
        !this.datum || 
        !this.vrijeme || 
        !this.doktor){
        alert("Popuni sve podatke prije registracije!");}
        else if (this.opisEpizode.length > 300) {
          alert(
                  "Maksimalan broj znakova za opis epizode je 300 znakova, doktoru ćete kasnije objašnjavati u detalje!"
                );
        } 
        else{
  const terminData ={
    opis_epizode: this.opisEpizode,
    vrsta_epizode: this.vrstaEpizode,
    datum_termina: this.formatDatum(this.datum),
    vrijeme_termina: this.vrijeme,
    doktor: this.doktor.match(/\(([^)]+)\)/)[1],
    pacijent: pacijent,
    status: this.status,
    zoom: this.zoom

  };

  axios.post('https://therapisttime-wabackend.onrender.com/zakazitermin', terminData)
  .then(response => {
    console.log('Response:', response.data);
    alert('Uspješno zakazan termin!');
    this.$router.replace("/zakazanitermini");
  })
  .catch(error => {
    alert('Pokušajte ponovno!');
    console.error('Error:', error.response); 
        })

  
    }
  }
  }
};
</script>