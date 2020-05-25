import axios from "axios";
import config from "../config/index";

import Vue from "vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

export default {
  beforeMount() {
    this.cargar_pagina();
  },
  data() {
    return {
      showAdmin: false,
    };
  },
  created() {
    this.guardar_token();

  },
  computed: {

  },
  methods: {
    guardar_token() {
      if (typeof window !== "undefined") {
        this.url = config.url_api;
        this.token = localStorage.getItem("token");
      }
    },
    cargar_pagina() {
      let url = config.url_api + "verify";
      let token = localStorage.getItem("token");
      let rol = localStorage.getItem("rol");
      if(rol == 2){
        this.showAdmin = true
      }
      this.token = token;
      axios
        .get(url, { headers: { token } })
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });

    },
  
  },
};
