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
      message: "CONSULTAR CONSOLIDADOS",
      token: "",
      url: "",
      showAdmin: false,

      consolidado: {
        fecha_inicial: "",
        fecha_final: "",
      },
      lista_consolidados: [{}],
    };
  },
  created() {
    this.guardar_token();
    this.mostrar_consolidados();
  },
  computed: {
    validar_fecha1() {
      return this.consolidado.fecha_inicial.length > 0;
    },

    validar_fecha2() {
      return this.consolidado.fecha_final.length > 0;
    },
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
      let rol = localStorage.getItem("rol");

      if (rol == 2) {
        this.showAdmin = true;
      } else {
        this.$router.push("/403");
      }
   
      axios
        .get(url, { headers: { token } })
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });
    },

    mostrar_consolidados() {
      axios
        .post(this.url + "consolidados", this.consolidado, {
          headers: { token: this.token },
        })
        .then((response) => {
          console.log(response);
          this.lista_consolidados = response.data.info;
          this.consolidado = {
            fecha_inicial: "",
            fecha_final: "",
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
