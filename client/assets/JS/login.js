import axios from "axios";
import config from "../config/index";

export default {
  beforeMount() {
    this.carga_pagina();
  },
  data() {
    return {
      url: "",
      message: "INICIAR SESIÓN",
      mensaje2: "",
      usuario: {
        documento: "",
        clave: "",
      },
    };
  },

  computed: {
    validar_id() {
      return this.usuario.documento.length > 0;
    },

    validar_clave() {
      return this.usuario.clave.length > 0;
    },
  },
  methods: {
    carga_pagina() {
      let url = config.url_api;
      this.url = url;
    },
    login() {
      let url = config.url_api + "login";

      if (this.usuario.documento.length > 0 && this.usuario.clave.length > 0) {
        axios
          .post(url, this.usuario)
          .then((response) => {
            let data = response.data;
            console.log("Data:", data);
            localStorage.setItem("token", data.info);
            localStorage.setItem("documento", this.usuario.documento);
            localStorage.setItem("rol", data.rol);
            console.log("Rol: ", data.rol);
            this.$router.push("/home");
          })
          .catch((error) => {
            this.mensaje2 = error.response.data.message;
            console.log(error.response);
          });
      } else {
        alert("LLene todos los campos correctamente");
      }
    },
  },
};
