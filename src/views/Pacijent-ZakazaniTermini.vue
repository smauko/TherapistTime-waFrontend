<template>
  <v-app>
    <v-container>
      <v-form>
        <v-text-field label="Regular Text Field" />
        <v-textarea label="Textarea" />
        <v-select :items="['Option 1', 'Option 2', 'Option 3']" label="Select" />
        <v-autocomplete :items="['Option 1', 'Option 2', 'Option 3']" label="Autocomplete" />
        <v-checkbox label="Checkbox" v-model="checkbox" />
        <v-radio-group v-model="radioGroup" label="Radio Group">
          <v-radio label="Option 1" value="1"></v-radio>
          <v-radio label="Option 2" value="2"></v-radio>
        </v-radio-group>
        <v-switch label="Switch" v-model="switchValue" />
        <v-file-input label="File input" />
        <v-slider v-model="slider" label="Slider" />
        <v-range-slider v-model="rangeSlider" label="Range slider" />
        <v-date-picker v-model="date" label="Date picker"></v-date-picker>
        <v-time-picker v-model="time" label="Time picker"></v-time-picker>
        <v-color-picker v-model="color" label="Color picker"></v-color-picker>
      </v-form>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      checkbox: false,
      radioGroup: '1',
      switchValue: false,
      slider: 0,
      rangeSlider: [10, 20],
      date: null,
      time: null,
      color: '#ff0000',
    };
  },
};
</script>

<style scoped>
/* Dodajte bilo koje dodatne stilove ovdje */
</style>