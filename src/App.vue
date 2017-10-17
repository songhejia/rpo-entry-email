<template>
  <div>
    <top-logo></top-logo>
    <el-card class="app-body" :body-style="{ padding: '10px 20px'}">
      <router-view/>
    </el-card>
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
  background-color: #ECEEF0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  /* margin-top: 60px; */
}

.app-body {
  width: 60%;
  margin: 0 auto;
  margin-top: 50px;
}
</style>
