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
      message: "ADMINISTRACIÓN DE MANTENIMIENTOS",
      inEdition: false,
      showTable: false,
      show: false,
      showAdmin: false,
      validacion_actualizar: "",
      token: "",
      url: "",
      mantenimientoTemp: {
        placa: "",
        id_mecanico: "",
        fecha: "",
        trabajos_realizados: "",
        horas_invertidas: 0,
        acciones: true,
      },
      mantenimiento: {
        placa: "",
        id_mecanico: "",
        fecha: "",
        trabajos_realizados: "",
        horas_invertidas: 0,
        acciones: true,
      },
      lista_mantenimientos: [{}],
    };
  },
  created() {
    this.guardar_token();
    this.mostrar_mantenimientos();
  },
  computed: {
    validar_id_mecanico() {
      return this.mantenimiento.id_mecanico.length > 0;
    },

    validar_placa() {
      if (this.validacion_actualizar) return true;
      return this.mantenimiento.placa.length > 0;
    },

    validar_fecha() {
      return this.mantenimiento.fecha.length > 0;
    },

    si_existe() {
      var id_mecanico = true;
      if (this.validacion_actualizar) return true;
      for (let i in this.lista_mantenimientos) {
        var tem = this.lista_mantenimientos[i];
        if (this.mantenimiento.placa != "") {
          this.show = true;
          if (
            tem.placa == this.mantenimiento.placa &&
            tem.id_mecanico == this.mantenimiento.id_mecanico &&
            tem.fecha == this.mantenimiento.fecha
          ) {
            id_mecanico = false;
          }
        }
      }
      return id_mecanico;
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

    mostrar_mantenimientos() {
      axios
        .get(this.url + "mantenimientos", {
          headers: { token: this.token },
        })
        .then((response) => {
          console.log(response.data.info);
          this.lista_mantenimientos = response.data.info;
          for (let i in this.lista_mantenimientos) {
            this.lista_mantenimientos[i].acciones = true;
            this.lista_mantenimientos[i].fecha = this.lista_mantenimientos[
              i
            ].fecha.substr(0, 10);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    crear_mantenimiento() {
      if (
        this.mantenimiento.placa.length > 0 &&
        this.mantenimiento.fecha.length > 0 &&
        this.mantenimiento.id_mecanico.length > 0
      ) {
        axios
          .post(this.url + "mantenimientos", this.mantenimiento, {
            headers: { token: this.token },
          })
          .then((response) => {
            this.mostrar_mantenimientos();
            console.log(response);

            this.mantenimiento = {
              placa: "",
              id_mecanico: "",
              fecha: "",
              trabajos_realizados: "",
              horas_invertidas: 0,
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
    eliminar_mantenimiento({ item }) {
      console.log(item + "item");
      axios
        .delete(this.url + "mantenimientos", item, {
          headers: { token: this.token },
        })
        .then((response) => {
          //this.mostrar_mantenimientos();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    cargar_mantenimiento({ item }) {
      console.log(item + "item");

      console.log("placa " + item.placa);
      console.log("id_mecanico " + item.id_mecanico);
      console.log("fecha " + item.fecha);

      let permiso = Object.assign({}, item);

      console.log(permiso + "permiso");

      this.mantenimientoTemp.placa = item.placa;
      this.mantenimientoTemp.id_mecanico = item.id_mecanico;
      this.mantenimientoTemp.fecha = item.fecha;

      console.log(this.mantenimientoTemp + "cargar");

      this.validacion_actualizar = true;
      
      axios
        .get(`${this.url}mantenimientos`, this.mantenimientoTemp, {
          headers: { token: this.token },
        })
        .then((response) => {
          var datos = response.data.info;
          console.log(response);

          this.inEdition = true;
          this.mantenimiento.id_mecanico = datos[0].id_mecanico;
          this.mantenimiento.placa = datos[0].placa;
          this.mantenimiento.fecha = datos[0].fecha;
          this.mantenimiento.trabajos_realizados = datos[0].trabajos_realizados;
          this.mantenimiento.horas_invertidas = datos[0].horas_invertidas;
          this.mantenimiento.acciones = true;

          this.mantenimiento.id_mecanico_temp = datos[0].id_mecanico;
          this.mantenimiento.placa_temp = datos[0].placa;
          this.mantenimiento.fecha_temp = datos[0].fecha;

          console.log(this.mantenimiento);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    actualizar_mantenimiento() {
      console.log(this.mantenimiento);

      if (
        this.mantenimiento.placa.length > 0 &&
        this.mantenimiento.fecha.length > 0 &&
        this.mantenimiento.id_mecanico.length > 0
      ) {
        axios
          .put(`${this.url}mantenimientos`, this.mantenimiento, {
            headers: { token: this.token },
          })
          .then((response) => {
            console.log(response);
            this.mostrar_mantenimientos();
            this.inEdition = false;
            this.mantenimiento = {
              placa: "",
              id_mecanico: "",
              fecha: "",
              trabajos_realizados: "",
              horas_invertidas: 0,
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
