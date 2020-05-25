<template>
  <div>
    <div>
      <b-navbar type="light" variant="dark">
        <a href="home">
          <b-img
            src="../images/motologo.png"
            fluid
            alt="Fluid image"
            width="80px"
          ></b-img>
        </a>
        <a href="home">
          <div class="title">
            MI MOTO
          </div>
        </a>
      </b-navbar>
      <div>
        <b-navbar type="dark" variant="warning">
          <ul>
            <li><div class="txtNavActive">Usuarios</div></li>
            <li><a href="motos">Motos</a></li>
            <li><a href="mantenimientos">Mantenimientos</a></li>
            <b-form-row v-show="showAdmin">
              <li><a href="consolidados">Consolidados</a></li>
            </b-form-row>
          </ul>
        </b-navbar>
      </div>
    </div>

    <div class="background">
      <b-container>
        <b-col>
          <div class="subTitle">
            <b-icon icon="person-fill" font-scale="1.8"></b-icon>
            <div class="hi">**</div>

            {{ message }}
          </div>
          <br />

          <b-form action="javascript:void(0)" @submit="crear_usuario()">
            <b-form-group @submit.stop.prevent label="Tipo de documento">
              <b-form-select
                v-model="usuario.tipo_documento"
                :options="lista_documentos"
              ></b-form-select>
              <b-form-invalid-feedback :state="validar_tipo_documento"
                >Campo obligatorio</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group
              @submit.stop.prevent
              label="Identificación"
              label-for="documento"
            >
              <b-form-input
                class="form-control"
                v-model="usuario.documento"
                type="number"
                placeholder="Ingrese su número de documento"
                id="documento"
              />

              <b-form-invalid-feedback :state="validar_documento"
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
                v-model="usuario.apellidos"
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
              <b-form-invalid-feedback :state="validar_celular"
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

            <b-form-group
              v-show="!inEdition"
              label="Contraseña"
              label-for="clave"
              @submit.stop.prevent
            >
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

            <b-form-group label="Rol" @submit.stop.prevent>
              <b-form-select
                v-model="usuario.rol"
                :options="lista_roles"
              ></b-form-select>
              <b-form-invalid-feedback :state="validar_rol"
                >Campo obligatorio</b-form-invalid-feedback
              >
            </b-form-group>

            <b-button type="submit" block variant="warning" v-if="!inEdition"
              >Crear usuario</b-button
            >
            <b-button
              @click="actualizar_usuario()"
              block
              variant="warning"
              v-else
              >Actualizar usuario</b-button
            >
          </b-form>
          <br />

          <b-button
            type="submit"
            block
            variant="warning"
            @click="showTable = !showTable"
            >Lista de Usuarios</b-button
          >
          <br />

          <b-table
            striped
            hover
            :items="lista_usuarios"
            v-show="showTable"
            :head-variant="'dark'"
          >
            <template v-slot:cell(acciones)="row">
              <b-button
                size="sm"
                @click="cargar_usuario(row)"
                class="mr-2"
                variant="warning"
                >Modificar</b-button
              >
              <b-button
                variant="outline-warning"
                size="sm"
                @click="eliminar_usuario(row)"
                class="mr-2"
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
<style src="../css/forms.css" />
