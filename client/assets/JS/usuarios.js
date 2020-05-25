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
      message: "ADMINISTRACIÓN DE USUARIOS",
      inEdition: false,
      showTable: false,
      show: false,
      showAdmin: false,
      validacion_actualizar: "",
      token: "",
      url: "",
      usuario: {
        tipo_documento: "",
        documento: "",
        nombre: "",
        apellidos: "",
        celular: "",
        correo: "",
        rol: 0,
        clave: "",
        acciones: true,
      },
      lista_usuarios: [{}],
      lista_roles: [{ value: null, text: "Seleccione un rol", disabled: true }],
      lista_documentos: [
        {
          value: null,
          text: "Seleccione el tipo de documento",
          disabled: true,
        },
      ],
    };
  },
  created() {
    this.guardar_token();
    this.mostrar_roles();
    this.mostrar_tipos_documentos();
    this.mostrar_usuarios();
  },
  computed: {
    validar_tipo_documento() {
      return this.usuario.tipo_documento.length > 0;
    },

    validar_documento() {
      if (this.validacion_actualizar) return true;
      return this.usuario.documento.length > 0;
    },

    validar_nombre() {
      return this.usuario.nombre.length > 0;
    },

    validar_apellido() {
      return this.usuario.apellidos.length > 0;
    },

    validar_celular() {
      return this.usuario.celular.length > 0;
    },

    validar_correo() {
      return this.usuario.correo.length > 0;
    },

    validar_rol() {
      return this.usuario.rol != 0;
    },

    validar_clave() {
      return this.usuario.clave.length > 0;
    },
    si_existe() {
      var estado = true;
      if (this.validacion_actualizar) return true;
      for (let i in this.lista_usuarios) {
        var tem = this.lista_usuarios[i];
        if (this.usuario.documento != "") {
          this.show = true;
          if (tem.documento == this.usuario.documento) {
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
      }else{
        this.$router.push("/403");
      }
      axios
        .get(url, { headers: { token } })
        .then((response) => {})
        .catch((error) => {
          console.log(error);
          this.$router.push("/");
        })
    },

    mostrar_usuarios() {
      axios
        .get(this.url + "vista-usuarios", {
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

    mostrar_tipos_documentos() {
      axios
        .get(this.url + "tipos_documentos", {
          headers: { token: this.token },
        })
        .then((response) => {
          let datos = response.data.info;
          for (let i in datos) {
            let temp = { value: "", text: "" };
            temp.value = datos[i].nombre;
            temp.text = datos[i].nombre;
            this.lista_documentos.push(temp);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    crear_usuario() {
      if (
        this.usuario.documento.length > 0 &&
        this.usuario.nombre.length > 0 &&
        this.usuario.apellidos.length > 0 &&
        this.usuario.correo.length > 0 &&
        this.usuario.celular.length > 0 &&
        this.usuario.rol != 0 &&
        this.usuario.clave.length > 0
      ) {
        axios
          .post(this.url + "usuarios", this.usuario, {
            headers: { token: this.token },
          })
          .then((response) => {
            this.mostrar_usuarios();
            console.log(response);

            this.usuario = {
              tipo_documento: "",
              documento: "",
              nombre: "",
              apellidos: "",
              celular: "",
              correo: "",
              rol: 0,
              clave: "",
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
        .delete(`${this.url}usuarios/${item.documento}`, {
          headers: { token: this.token },
        })
        .then((response) => {
          let position = this.lista_usuarios.findIndex(
            (usuario) => usuario.documento == item.documento
          );
          this.lista_usuarios.splice(position, 1);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    cargar_usuario({ item }) {
      this.validacion_actualizar = true;
      axios
        .get(`${this.url}usuarios/${item.documento}`, {
          headers: { token: this.token },
        })
        .then((response) => {
          var datos = response.data.info;
          console.log(response);

          this.inEdition = true;
          this.usuario.tipo_documento = datos[0].tipo_documento;
          this.usuario.documento = datos[0].documento;
          this.usuario.nombre = datos[0].nombre;
          this.usuario.apellidos = datos[0].apellidos;
          this.usuario.celular = datos[0].celular;
          this.usuario.correo = datos[0].correo;
          this.usuario.rol = datos[0].rol;
          this.usuario.acciones = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    actualizar_usuario() {
      if (
        this.usuario.documento.length > 0 &&
        this.usuario.nombre.length > 0 &&
        this.usuario.apellidos.length > 0 &&
        this.usuario.correo.length > 0 &&
        this.usuario.celular.length > 0 &&
        this.usuario.rol != 0 
      ) {
        axios
          .put(`${this.url}usuarios/${this.usuario.documento}`, this.usuario, {
            headers: { token: this.token },
          })
          .then((response) => {
            console.log(response);
            this.mostrar_usuarios();
            this.inEdition = false;
            this.usuario = {
              tipo_documento: "",
              documento: "",
              nombre: "",
              apellidos: "",
              celular: "",
              correo: "",
              rol: 0,
              clave: "",
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
