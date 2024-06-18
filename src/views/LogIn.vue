<template>
    <v-app>
    <v-sheet style="margin-top:20% ;"class="mx-auto" width="300">
      <h2>Prijava</h2>
  <v-form fast-fail>
    
    <v-text-field
            v-model="email"
            :rules="[rules.required, rules.email]"
            label="E-mail adresa"
            required
          ></v-text-field>

    <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Lozinka"
            counter
            required
            @click:append="show1 = !show1"
          ></v-text-field>
    <v-btn class="mt-2" @click="logIn" block>Prijavi se</v-btn>
    
  </v-form>
  <p style="margin-top: 10%;">Nemaš račun? <a href="/signup">Registriraj se!</a></p>
</v-sheet>  
</v-app>
</template>



 <script>
 import axios from 'axios';

  export default {
    data () {
      return {
        email:"",
        password:"",

        ///// za vuetify
        show1: false,
        rules: {
          required: value => !!value || 'Required.',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
        },
      }
    },
    methods:{
      logIn(){
        const userData = {
          email: this.email,
          password: this.password
        }
      axios.post('http://localhost:3000/login', userData)
      .then(response => {
      localStorage.setItem('user', JSON.stringify(response.data));
      alert("Uspješno ste ulogirani!")
      console.log('Response:', response.data);
      this.$router.replace("/zakazanitermini");
      
      })
      .catch(error => {
      alert("Pokušajte ponovno!")
      console.error('Error:', error); 
  });}

      }
    }
  
</script>
