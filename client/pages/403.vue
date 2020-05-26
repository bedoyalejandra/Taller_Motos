<template>
  <div>
    <b-navbar-toggle target="navbar-toggle-collapse">
      <a href="home">
        <b-icon icon="house-fill" variant="warning" font-scale="2"></b-icon>
      </a>
    </b-navbar-toggle>
    <b-container>
      <b-img src="../images/403.png" fluid></b-img>
      <div class="text">
        Lo sentimos, usted no tiene permisos para acceder a este módulo
      </div>
    </b-container>
  </div>
</template>
<script>
import Vue from "vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
export default {};
</script>
<style scoped>
.text {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: stretch;
  color: #ffc400;
  font-size: 25px;
}
</style>
