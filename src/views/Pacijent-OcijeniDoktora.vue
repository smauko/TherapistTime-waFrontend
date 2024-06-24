<template >
    <v-app>
   
   <header class="custom-header" style="margin-top: 20px;">
     <h1>Ocijeni doktora</h1>
   </header>
   <p v-if="this.doktori.length==0" style="text-align: middle; ">
      Ne vidite doktore na listi? To vam je prvi znak da zakažete termin!
   </p>

<OdradeniDoktori
       
       v-for="doktor in this.doktori"
       :key="doktor.Email"
       :info="doktor"
     />

   
 </v-app>
 </template>
       

   <script>
   import OdradeniDoktori from "@/components/OdradeniDoktori.vue";
   import axios from "axios";
   export default {
     data() {
       return {
        dialog: false,
        doktori:[]
       };
   
     },
     mounted(){
     this.dohvatiTermine();
     },
     methods: {
        dohvatiTermine(){
      let user = JSON.parse(localStorage.getItem('user'));
      let pacijent = user.email;
      console
      axios.get('https://therapisttime-wabackend.onrender.com/odradenidoktori',{params: {
                param6: pacijent,
            }})
      .then(response => {
      console.log("uspio sam uzeti podatke", response.data);
      this.doktori = response.data;
  })
      .catch(error => {
      console.error('Error:', error.response); 
        })
    }
},
    
   components: {
    OdradeniDoktori,

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