<template>
  <v-app>
    <v-app-bar  app color="primary" dark >
    </v-app-bar>
    <v-toobar-title>As Palavras mais Ultilizadas</v-toobar-title>
    <v-main>
      <Home/>
    </v-main>
  </v-app>
</template>

<script>
import Home from './components/Home'
export default {
  name: 'App',

  components: {
    Home
  },

  data: () => ({
    //
  }),
};
</script>
