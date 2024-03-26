<template>
    <v-app>
    <v-sheet style="margin-top: 10%;"  class="mx-auto" width="300">
      <h2>Registracija</h2>
  <v-form fast-fail @submit.prevent>
    <v-text-field
      v-model="ime"
      :rules="firstNameRules"
      label="Ime"
      required
    ></v-text-field>

    <v-text-field
      v-model="prezime"
      :rules="lastNameRules"
      label="Prezime"
      required
    ></v-text-field>
    <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
        required
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Datum rođenja"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="datum_rodenja"
          @input="menu2 = false"
          required
        ></v-date-picker>
      </v-menu>

    
    <v-radio-group
      v-model="uloga"
      row
      required
    >
    
      <v-radio
        label="Doktor"
        value="Doktor"
        
      ></v-radio>
      <v-radio
        label="Pacijent"
        value="Pacijent"
      ></v-radio>
    </v-radio-group>

    <v-text-field
        v-model="email"
        :rules="[rules.email]"
        label="Email address"
        type="email"
        required
      ></v-text-field>

    <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Lozinka"
            counter
            @click:append="show1 = !show1"
            required
          ></v-text-field>
      

    <v-btn class="mt-2" type="submit" block>Registriraj se</v-btn>
  </v-form>
  <p style="margin-top: 10%;">Imaš račun? <a href="/login">Prijavi se!</a></p>
</v-sheet>  
</v-app>
</template>


<script>

export default {
  data(){
    return{
      ///// podaci za bazu
      ime:"sara",
      prezime:"",
      datum_rodenja:"",
      uloga:"",
      email:"",
      password:"",

      /////ostalo je cisto za vuetify
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu2: false,
      row: null,
      show1: false,
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          email: v => !!(v || '').match(/@/) || 'Please enter a valid email',
          
        },
    ime: '',
    firstNameRules: [
      value => {
        if (value?.length > 3) return true

        return 'First name must be at least 3 characters.'
      },
    ],
    prezime: '',
    lastNameRules: [
      value => {
        if (/[^0-9]/.test(value)) return true

        return 'Last name can not contain digits.'
      },
    ],
  }
  },
  mounted() {
},
  

};
</script>