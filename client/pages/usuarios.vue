<template>
  <div>
    <div>
      <b-navbar toggleable type="light" variant="faded">
        <b-img
          src="https://redunete.net/wp-content/uploads/2019/02/logo-blanco-Udem-700x300.jpg"
          fluid
          alt="Fluid image"
          width="200px"
        ></b-img>

        <div class="title">
          MI MOTO
        </div>

        <b-navbar-toggle target="navbar-toggle-collapse">
          <a href="home">
            <b-icon icon="house-fill" variant="danger" font-scale="2"></b-icon>
          </a>
        </b-navbar-toggle>
      </b-navbar>

      <div>
        <b-navbar toggleable="md" type="dark" variant="danger">
          <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

          <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
              <b-nav-item :to="{ name: 'formUsers' }" active
                >Gestión de Usuarios</b-nav-item
              >
              <b-nav-item :to="{ name: 'roles' }">Gestión de Roles</b-nav-item>
              <b-nav-item :to="{ name: 'modules' }"
                >Gestión de Módulos</b-nav-item
              >
              <b-nav-item :to="{ name: 'permissions' }"
                >Gestión de Permisos</b-nav-item
              >
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
    </div>

    <div class="background">
      <b-container>
        <b-col>
          <div class="subTitle">
            <b-icon icon="person" font-scale="2"></b-icon>
            <div class="hi">**</div>

            {{ message }}
          </div>
          <br />

          <b-form action="javascript:void(0)" @submit="crear_usuario()">
            <b-form-group label="Tipo de documento">
              <b-form-select
                v-model="usuario.tipo_documento"
                :options="lista_documento"
              ></b-form-select>
            </b-form-group>

            <b-form-group
              @submit.stop.prevent
              label="Identificación"
              label-for="id"
            >
              <b-form-input
                class="form-control"
                v-model="usuario.id"
                type="number"
                placeholder="Ingrese su identificación"
                id="id"
              />

              <b-form-invalid-feedback :state="validar_id"
                >Campo obligatorio</b-form-invalid-feedback
              >
              <b-form-invalid-feedback :state="si_existe" v-show="show"
                >Ya existe un usuario con este
                documento</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group label="Nombre" label-for="nombre">
              <b-form-input
                class="form-control"
                v-model="usuario.nombre"
                placeholder="Ingrese su nombre"
                id="nombre"
              />
              <b-form-invalid-feedback :state="validar_nombre"
                >Campo obligatorio</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group
              @submit.stop.prevent
              label="Apellido"
              label-for="apellido"
            >
              <b-form-input
                class="form-control"
                v-model="usuario.apellido"
                placeholder="Ingrese su apellido"
                id="apellido"
              />
              <b-form-invalid-feedback :state="validar_apellido"
                >Campo obligatorio</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group label="Celular" label-for="celular">
              <b-form-input
                class="form-control"
                v-model="usuario.celular"
                placeholder="Ingrese su número de celular"
                id="celular"
              />
              <b-form-invalid-feedback :state="validar_nombre"
                >Campo obligatorio</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group
              @submit.stop.prevent
              label="Correo"
              label-for="correo"
            >
              <b-form-input
                class="form-control"
                type="email"
                v-model="usuario.correo"
                id="correo"
                placeholder="Ingrese su correo"
              />
              <b-form-invalid-feedback :state="validar_correo"
                >Campo obligatorio</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group label="Contraseña" label-for="clave">
              <b-form-input
                class="form-control"
                v-model="usuario.clave"
                type="password"
                placeholder="Ingrese su contraseña"
                id="clave"
              />
              <b-form-invalid-feedback :state="validar_clave"
                >Campo obligatorio</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group label="Rol">
              <b-form-select
                v-model="usuario.rol"
                :options="lista_roles"
              ></b-form-select>
            </b-form-group>

            <b-button type="submit" block variant="danger" v-if="!inEdition"
              >Crear usuario</b-button
            >
            <b-button
              @click="actualizar_usuario()"
              block
              variant="danger"
              v-else
              >Actualizar usuario</b-button
            >
          </b-form>
          <br />

          <b-button
            type="submit"
            block
            variant="danger"
            @click="showTable = !showTable"
            >Lista de Usuarios</b-button
          >
          <br />

          <b-table striped hover :items="lista_usuarios" v-show="showTable">
            <template v-slot:cell(acciones)="row">
              <b-button
                size="sm"
                @click="cargar_usuario(row)"
                class="mr-2"
                variant="danger"
                >Modificar</b-button
              >
              <b-button size="sm" @click="eliminar_usuario(row)" class="mr-2"
                >Eliminar</b-button
              >
            </template>
          </b-table>

          <br />
        </b-col>
      </b-container>
    </div>
  </div>
</template>

<script src="../assets/JS/usuarios.js" />
<style src="../css/home.css" />
