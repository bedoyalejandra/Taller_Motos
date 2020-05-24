import axios from "axios";
import config from "./config/index";

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
      inEdition: false,
      showTable: false,
      validacion: "",
      rol: {
        id: "",
        nombre: "",
        descripcion: "",
        acciones: true,
      },
      lista_roles: [],
    };
  },
  created() {
    this.guardar_token();
    this.mostrar_roles();
  },
  computed: {
    validar_nombre() {
      return this.validar_condicion(this.rol.nombre.length > 0);
    },
  },
  methods: {
    guardar_token() {
      if (typeof window !== "undefined") {
        this.url = config.url_api;
        this.token = localStorage.getItem("token");
      }
    },
    validar_condicion(bool) {
      if (bool == false) {
        this.validacion = false;
        return false;
      } else {
        this.validacion = true;
        return true;
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
          this.$router.push("/login");
        });
    },
    mostrar_roles() {
      axios
        .get(this.url + "roles", {
          headers: { token: this.token },
        })
        .then((response) => {
          this.lista_roles = response.data.info;
          for (let i in this.lista_roles) {
            this.lista_roles[i].acciones = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    crear_rol() {
      if (this.validacion == true) {
        axios
          .post(this.url + "roles/", this.rol, {
            headers: { token: this.token },
          })
          .then((response) => {
            this.mostrar_roles();
            this.rol = {
              id: "",
              nombre: "",
              descripcion: "",
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
    eliminar_rol({ item }) {
      axios
        .delete(`${this.url}roles/${item.id}`, {
          headers: { token: this.token },
        })
        .then((response) => {
          let posicion = this.lista_roles.findIndex((rol) => rol.id == item.id);
          this.lista_roles.splice(posicion, 1);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cargar_rol({ item }) {
      axios
        .get(`${this.url}roles/${item.id}`, {
          headers: { token: this.token },
        })
        .then((response) => {
          var array = response.data.info;

          this.inEdition = true;
          this.rol.id = array[0].id;
          this.rol.nombre = array[0].nombre;
          this.rol.descripcion = array[0].descripcion;
          this.rol.acciones = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    actualizar_rol() {
      if (this.validacion == true) {
        axios
          .put(`${this.url}roles/${this.rol.id}`, this.rol, {
            headers: { token: this.token },
          })
          .then((response) => {
            let posicion = this.lista_roles.findIndex(
              (rol) => rol.id == this.rol.id
            );
            this.lista_roles.splice(posicion, 1, this.rol);
            this.inEdition = false;
            this.rol = {
              id: "",
              nombre: "",
              descripcion: "",
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
  },
};
