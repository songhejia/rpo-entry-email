<template>
  <div id="app">
    <top-logo></top-logo>
    <router-view/>
  </div>
</template>

<script>
import TopLogo from '@/components/TopLogo'
export default {
  name: 'app',
  components: {
    TopLogo
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  /* margin-top: 60px; */
}
</style>
