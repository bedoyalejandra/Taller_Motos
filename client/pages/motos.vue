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
            <li><a href="usuarios">Usuarios</a></li>
            <li><div class="txtNavActive">Motos</div></li>
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

          <b-form action="javascript:void(0)" @submit="crear_moto()">
            <b-form-group @submit.stop.prevent label="Placa" label-for="placa">
              <b-form-input
                class="form-control"
                v-model="moto.placa"
                placeholder="Ingrese la placa del vehículo"
                :disabled="inEdition"
                id="placa"
              />

              <b-form-invalid-feedback :state="validar_placa"
                >Campo obligatorio</b-form-invalid-feedback
              >
              <b-form-invalid-feedback :state="si_existe" v-show="show"
                >Ya existe una moto con esta placa</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group
              @submit.stop.prevent
              label="Estado"
              label-for="estado"
            >
              <b-form-input
                class="form-control"
                v-model="moto.estado"
                placeholder="Ingrese el estado del vehículo"
                id="estado"
              />
              <b-form-invalid-feedback :state="validar_estado"
                >Campo obligatorio</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group @submit.stop.prevent label="Clase" label-for="clase">
              <b-form-input
                class="form-control"
                v-model="moto.clase"
                placeholder="Ingrese la clase del vehículo"
                id="clase"
              />
              <b-form-invalid-feedback :state="validar_clase"
                >Campo obligatorio</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group @submit.stop.prevent label="Marca" label-for="marca">
              <b-form-input
                class="form-control"
                v-model="moto.marca"
                placeholder="Ingrese la marca del vehículo"
                id="marca"
              />
              <b-form-invalid-feedback :state="validar_marca"
                >Campo obligatorio</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group
              @submit.stop.prevent
              label="Modelo"
              label-for="modelo"
            >
              <b-form-input
                class="form-control"
                v-model="moto.modelo"
                id="modelo"
                placeholder="Ingrese el modelo del vehículo"
              />
              <b-form-invalid-feedback :state="validar_modelo"
                >Campo obligatorio</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group label="Color" label-for="color" @submit.stop.prevent>
              <b-form-input
                class="form-control"
                v-model="moto.color"
                placeholder="Ingrese el color del vehículo"
                id="color"
              />
              <b-form-invalid-feedback :state="validar_color"
                >Campo obligatorio</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group
              label="Cilindraje"
              label-for="cilindraje"
              @submit.stop.prevent
            >
              <b-form-input
                class="form-control"
                v-model="moto.cilindraje"
                placeholder="Ingrese el cilindraje del vehículo"
                id="cilindraje"
              />
              <b-form-invalid-feedback :state="validar_cilindraje"
                >Campo obligatorio</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group
              label="Propietario"
              label-for="id_propietario"
              @submit.stop.prevent
            >
              <b-form-input
                class="form-control"
                v-model="moto.id_propietario"
                placeholder="Ingrese el documento del propietario"
                id="id_propietario"
              />
              <b-form-invalid-feedback :state="validar_id_propietario"
                >Campo obligatorio</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group
              label="SOAT"
              label-for="nro_soat"
              @submit.stop.prevent
            >
              <b-form-input
                class="form-control"
                type="number"
                v-model="moto.nro_soat"
                placeholder="Ingrese el número del soat"
                id="nro_soat"
              />
              <b-form-invalid-feedback :state="validar_nro_soat"
                >Campo obligatorio</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group
              label="Vencimiento del SOAT"
              label-for="vencimiento_soat"
              @submit.stop.prevent
            >
              <b-form-datepicker
                id="vencimiento_soat"
                v-model="moto.vencimiento_soat"
                class="mb-2"
              ></b-form-datepicker>

              <b-form-invalid-feedback :state="validar_vencimiento_soat"
                >Campo obligatorio</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group
              label="Chequeo técnico mecánico"
              label-for="nro_tecnomecanica"
              @submit.stop.prevent
            >
              <b-form-input
                class="form-control"
                type="number"
                v-model="moto.nro_tecnomecanica"
                placeholder="Ingrese el número del chequeo técino mecánico"
                id="nro_tecnomecanica"
              />
              <b-form-invalid-feedback :state="validar_nro_tecnomecanica"
                >Campo obligatorio</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group
              label="Vencimiento del chequeo técnico mecánico"
              label-for="vencimiento_tecnomecanica"
              @submit.stop.prevent
            >
              <b-form-datepicker
                id="vencimiento_tecnomecanica"
                v-model="moto.vencimiento_tecnomecanica"
                class="mb-2"
              ></b-form-datepicker>

              <b-form-invalid-feedback
                :state="validar_vencimiento_tecnomecanica"
                >Campo obligatorio</b-form-invalid-feedback
              >
            </b-form-group>

            <br />

            <b-button type="submit" block variant="warning" v-if="!inEdition"
              >Crear moto</b-button
            >
            <b-button @click="actualizar_moto()" block variant="warning" v-else
              >Actualizar moto</b-button
            >
          </b-form>
          <br />

          <b-button
            type="submit"
            block
            variant="warning"
            @click="showTable = !showTable"
            >Lista de Motos</b-button
          >
          <br />

          <b-table
            striped
            hover
            :items="lista_motos"
            v-show="showTable"
            :head-variant="'dark'"
          >
            <template v-slot:cell(acciones)="row">
              <b-button
                size="sm"
                @click="cargar_moto(row)"
                class="mr-2"
                variant="warning"
                >Modificar</b-button
              >
              <b-button
                variant="outline-warning"
                size="sm"
                @click="eliminar_moto(row)"
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

<script src="../assets/JS/motos.js" />
<style src="../css/forms.css" />
