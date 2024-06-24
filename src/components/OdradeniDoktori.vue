<template>
    <v-container>
      <v-card
        style="width: 95%;"
        class="mx-auto my-8"
        elevation="4"
        @click="dialog = true"
      >
        <v-card-item>
          <v-row>
            <v-col cols="8">
              <v-card-title>
                {{ info.Ime }} {{ info.Prezime }}
              </v-card-title>
              <v-card-subtitle style="text-align: left;">
                {{ info.Email }}
              </v-card-subtitle>
            </v-col>
            <v-col ><v-card-title>Prosječna ocijena: {{ this.ocijena }}</v-card-title></v-col>
          </v-row>
        </v-card-item>
      </v-card>
  
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ info.Ime }} {{ info.Prezime }} </span>
          </v-card-title>
          <v-card-text>
            <p>Ocijente doktora (1-izrazito loš, 5-izrazito dobar)</p>
            <v-radio-group row v-model="ocijena">
      <v-radio
        v-for="n in 5"
        :key="n"
        :label="`${n}`"
        :value="n"
      ></v-radio>
    </v-radio-group>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text  @click="ocijeniDoktora()" >Ocijeni doktora</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    props: ["info"],
    data() {

      return {
        ocijena:"0",
        dialog: false,
      };
    },
    name: "OdradeniDoktori",
  mounted(){
    this.avgOcijena();
  },
  methods: {
    ocijeniDoktora(){
        let user = JSON.parse(localStorage.getItem('user'));
        let ocijenaData= {
            param7: user.email,
            param8: this.info.Email,
            param9: this.ocijena    
        };
        console.log(ocijenaData);
        axios.post('https://therapisttime-wabackend.onrender.com/ocijenidoktora', ocijenaData)
  .then(response => {
    console.log('Response:', response.data);
    alert('Uspješno ocijenjen doktor!');
    this.$router.replace("/zakazanitermini");
  })
  .catch(error => {
    alert('Pokušajte ponovno!');
    console.error('Error:', error.response); 
        })

  
    },
    avgOcijena(){
      let param10 = this.info.Email;
      console.log("avgocijena:", param10)
      axios.get('https://therapisttime-wabackend.onrender.com/avgocijene', {params: {
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
  