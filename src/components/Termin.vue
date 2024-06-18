<template>
   
      <v-card
        style="width: 95%; height: 15%;"
        class="mx-auto my-8"
        elevation="16"
      >
      <router-link
        :to="'/termin/' + info.idTermina"
        style="color: black; text-decoration: none"
      >
        <v-card-item>

          <v-row>
            <v-col cols="8">
              <v-card-title>
                {{ info.vrstaEpizode}}
              </v-card-title>
              <v-card-subtitle style="text-align: left;">
                {{ info.datumTermina}} {{ info.vrijemeTermina }}
              </v-card-subtitle>
            </v-col>
            <v-col cols="4" class="text-right">
              <v-card-subtitle>
                {{ info.status }}
              </v-card-subtitle>
            </v-col>
          </v-row>
        </v-card-item>
    </router-link>
      </v-card>
    
  </template>
  <script>
  export default {
    props: ["info"],
    name: "Termin"
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