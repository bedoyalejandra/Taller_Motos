import axios from "axios";
import config from "../config/index";

import Vue from "vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

export default {
  beforeMount() {
    //this.cargar_pagina();
  },
  data() {
    return {
      message: "ADMINISTRACIÓN DE USUARIOS",
      inEdition: false,
      showTable: false,
      show: false,
      validacion_actualizar: "",
      token: "",
      url: "",
      usuario: {
        tipo_documento: "",
        id: "",
        nombre: "",
        apellido: "",
        edad: 0,
        correo: "",
        clave: "",
        ciudad: "",
        ocupacion: null,
        rol: 0,
        acciones: true,
        primera_vez: true,
      },
      lista_usuarios: [{}],
      lista_roles: [{ value: null, text: "Seleccione un rol", disabled: true }],
    };
  },
  created() {
    this.guardar_token();
    this.mostrar_roles();
    this.mostrar_usuarios();
  },
  computed: {
    validar_id() {
      if (this.validacion_actualizar) return true;
      return this.usuario.id.length > 0;
    },

    validar_nombre() {
      return this.usuario.nombre.length > 0;
    },

    validar_apellido() {
     return this.usuario.apellido.length > 0;
    },

    validar_edad() {
      return this.usuario.edad >= 0;
    },

    validar_correo() {
      return this.usuario.correo.length > 0;
    },

    validar_clave() {
      return this.usuario.clave.length > 0;
    },
    si_existe() {
      var estado = true;
      if (this.validacion_actualizar) return true;
      for (let i in this.lista_usuarios) {
        var tem = this.lista_usuarios[i];
        if (this.usuario.id != "") {
          this.show = true;
          if (tem.id == this.usuario.id) {
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

      axios
        .post(
          url,
          {
            Modulo: "Gestión de Usuarios",
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
    
    mostrar_usuarios() {
      axios
        .get(this.url + "view-users", {
          headers: { token: this.token },
        })
        .then((response) => {
          console.log(response.data.info);
          this.lista_usuarios = response.data.info;
          for (let i in this.lista_usuarios) {
            this.lista_usuarios[i].acciones = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    mostrar_roles() {
      axios
        .get(this.url + "roles", {
          headers: { token: this.token },
        })
        .then((response) => {
          let datos = response.data.info;
          for (let i in datos) {
            let temp = { value: "", text: "" };
            temp.value = datos[i].id;
            temp.text = datos[i].nombre;
            this.lista_roles.push(temp);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    crear_usuario() {
      if (this.usuario.id.length > 0 && this.usuario.nombre.length > 0 && this.usuario.apellido.length > 0
        && this.usuario.correo.length > 0 && this.usuario.clave.length > 0) {
        axios
          .post(this.url + "users", this.usuario, {
            headers: { token: this.token },
          })
          .then((response) => {
            this.mostrar_usuarios();
            console.log(response);
            axios
              .post(this.url + "emails/account", this.usuario, {
                headers: { token: this.token },
              })
              .then((response) => console.log(response))
              .catch((error) => console.log(error));
            this.usuario = {
              tipo_documento: "",
              id: "",
              nombre: "",
              apellido: "",
              edad: 0,
              correo: "",
              clave: "",
              ciudad: "",
              ocupacion: null,
              rol: 0,
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
    eliminar_usuario({ item }) {
      axios
        .delete(`${this.url}users/${item.id}`, {
          headers: { token: this.token },
        })
        .then((response) => {
          let position = this.lista_usuarios.findIndex(
            (usuario) => usuario.id == item.id
          );
          this.lista_usuarios.splice(position, 1);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    cargar_usuario({ item }) {
      this.validacion_actualizar = true
      axios
        .get(`${this.url}users/${item.id}`, {
          headers: { token: this.token },
        })
        .then((response) => {
          var datos = response.data.info;

          this.inEdition = true;
          this.usuario.tipo_documento = datos[0].tipo_documento;
          this.usuario.id = datos[0].id;
          this.usuario.nombre = datos[0].nombre;
          this.usuario.apellido = datos[0].apellidos;
          this.usuario.edad = datos[0].edad;
          //this.usuario.clave = datos[0].clave;
          this.usuario.correo = datos[0].correo;
          this.usuario.ciudad = datos[0].ciudad;
          this.usuario.rol = datos[0].rol;
          this.usuario.ocupacion = datos[0].ocupacion;
          this.usuario.acciones = true;
          this.usuario.primera_vez = datos[0].primera_vez;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    actualizar_usuario() {
      if (this.usuario.id.length > 0 && this.usuario.nombre.length > 0 && this.usuario.apellido.length > 0
        && this.usuario.correo.length > 0 && this.usuario.clave.length > 0) {
        axios
          .put(`${this.url}users/${this.usuario.id}`, this.usuario, {
            headers: { token: this.token },
          })
          .then((response) => {
            console.log(response);
            this.mostrar_usuarios();
            this.inEdition = false;
            this.usuario = {
              tipo_documento: "",
              id: "",
              nombre: "",
              apellido: "",
              edad: 0,
              correo: "",
              clave: "",
              ciudad: "",
              ocupacion: null,
              rol: 0,
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
