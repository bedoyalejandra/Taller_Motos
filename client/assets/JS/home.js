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
      message: "CREACIÓN DE ROLES",
      showAdmin: true
 
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
      this.token = token;
      axios
        .post(
          url,
          {
            Modulo: "Gestión de Roles",
          },
          { headers: { token: token } }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          //this.$router.push("/login");
        });
    },
  
  },
};
