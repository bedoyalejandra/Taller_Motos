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
      message: "ADMINISTRACIÓN DE VEHÍCULOS",
      inEdition: false,
      showTable: false,
      show: false,
      showAdmin: false,
      validacion_actualizar: "",
      token: "",
      url: "",
      moto: {
        placa: "",
        estado: "",
        clase: "",
        marca: "",
        modelo: "",
        color: "",
        cilindraje: "",
        id_propietario: "",
        nro_soat: "",
        vencimiento_soat: "",
        nro_tecnomecanica: "",
        vencimiento_tecnomecanica: "",
        acciones: true,
      },
      lista_motos: [{}],
    };
  },
  created() {
    this.guardar_token();
    this.mostrar_motos();
  },
  computed: {
    validar_estado() {
      return this.moto.estado.length > 0;
    },

    validar_placa() {
      if (this.validacion_actualizar) return true;
      return this.moto.placa.length > 0;
    },

    validar_clase() {
      return this.moto.clase.length > 0;
    },

    validar_marca() {
      return this.moto.marca.length > 0;
    },

    validar_modelo() {
      return this.moto.modelo.length > 0;
    },

    validar_color() {
      return this.moto.color.length > 0;
    },

    validar_id_propietario() {
      return this.moto.id_propietario.length > 0;
    },

    validar_cilindraje() {
      return this.moto.cilindraje.length > 0;
    },

    validar_nro_soat() {
      return this.moto.nro_soat.length > 0;
    },

    validar_vencimiento_soat() {
      return this.moto.vencimiento_soat.length > 0;
    },

    validar_vencimiento_tecnomecanica() {
      return this.moto.vencimiento_tecnomecanica.length > 0;
    },

    validar_nro_tecnomecanica() {
      return this.moto.nro_tecnomecanica.length > 0;
    },

    si_existe() {
      var estado = true;
      if (this.validacion_actualizar) return true;
      for (let i in this.lista_motos) {
        var tem = this.lista_motos[i];
        if (this.moto.placa != "") {
          this.show = true;
          if (tem.placa == this.moto.placa) {
            estado = false;
          }
        }
      }
      return estado;
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
      if(rol == 2){
        this.showAdmin = true
      }
      axios
        .get(url, { headers: { token } })
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });
    },

    mostrar_motos() {
      axios
        .get(this.url + "motos", {
          headers: { token: this.token },
        })
        .then((response) => {
          console.log(response.data.info);
          this.lista_motos = response.data.info;
          for (let i in this.lista_motos) {
            this.lista_motos[i].acciones = true;
            this.lista_motos[i].vencimiento_soat = this.lista_motos[i].vencimiento_soat.substr(0,10);
            this.lista_motos[i].vencimiento_tecnomecanica = this.lista_motos[i].vencimiento_tecnomecanica.substr(0,10);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    crear_moto() {
      if (
        this.moto.placa.length > 0 &&
        this.moto.clase.length > 0 &&
        this.moto.marca.length > 0 &&
        this.moto.color.length > 0 &&
        this.moto.modelo.length > 0 &&
        this.moto.id_propietario.length > 0 &&
        this.moto.cilindraje.length > 0 &&
        this.moto.nro_soat.length > 0 &&
        this.moto.vencimiento_soat.length > 0 &&
        this.moto.nro_tecnomecanica.length > 0 &&
        this.moto.vencimiento_tecnomecanica.length > 0 
      ) {
        axios
          .post(this.url + "motos", this.moto, {
            headers: { token: this.token },
          })
          .then((response) => {
            this.mostrar_motos();
            console.log(response);

            this.moto = {
              placa: "",
              estado: "",
              clase: "",
              marca: "",
              modelo: "",
              color: "",
              cilindraje: "",
              id_propietario: "",
              nro_soat: "",
              vencimiento_soat: "",
              nro_tecnomecanica: "",
              vencimiento_tecnomecanica: "",
              acciones: true,
            };
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("LLene todos los campos correctamente");
      }
    },
    eliminar_moto({ item }) {
      axios
        .delete(`${this.url}motos/${item.placa}`, {
          headers: { token: this.token },
        })
        .then((response) => {
          let position = this.lista_motos.findIndex(
            (moto) => moto.placa == item.placa
          );
          this.lista_motos.splice(position, 1);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    cargar_moto({ item }) {
      this.validacion_actualizar = true;
      axios
        .get(`${this.url}motos/${item.placa}`, {
          headers: { token: this.token },
        })
        .then((response) => {
          var datos = response.data.info;
          console.log(response);

          this.inEdition = true;
          this.moto.estado = datos[0].estado;
          this.moto.placa = datos[0].placa;
          this.moto.clase = datos[0].clase;
          this.moto.marca = datos[0].marca;
          this.moto.modelo = datos[0].modelo;
          this.moto.color = datos[0].color;
          this.moto.cilindraje = datos[0].cilindraje;
          this.moto.id_propietario = datos[0].id_propietario;
          this.moto.nro_soat = datos[0].nro_soat;
          this.moto.vencimiento_soat = datos[0].vencimiento_soat;
          this.moto.nro_tecnomecanica = datos[0].nro_tecnomecanica;
          this.moto.vencimiento_tecnomecanica = datos[0].vencimiento_tecnomecanica;
          this.moto.acciones = true;      
        })
        .catch((error) => {
          console.log(error);
        });
    },

    actualizar_moto() {
      if (
        this.moto.placa.length > 0 &&
        this.moto.clase.length > 0 &&
        this.moto.marca.length > 0 &&
        this.moto.color.length > 0 &&
        this.moto.modelo.length > 0 &&
        this.moto.id_propietario.length > 0 &&
        this.moto.cilindraje.length > 0 &&
        this.moto.nro_soat.length > 0 &&
        this.moto.vencimiento_soat.length > 0 &&
        this.moto.nro_tecnomecanica.length > 0 &&
        this.moto.vencimiento_tecnomecanica.length > 0 
      ) {
        axios
          .put(`${this.url}motos/${this.moto.placa}`, this.moto, {
            headers: { token: this.token },
          })
          .then((response) => {
            console.log(response);
            this.mostrar_motos();
            this.inEdition = false;
            this.moto = {
                placa: "",
                estado: "",
                clase: "",
                marca: "",
                modelo: "",
                color: "",
                cilindraje: "",
                id_propietario: "",
                nro_soat: "",
                vencimiento_soat: "",
                nro_tecnomecanica: "",
                vencimiento_tecnomecanica: "",
                acciones: true,
            };
            this.validacion_actualizar = false;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("LLene todos los campos correctamente");
      }
    },
  },
};
