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

        <b-navbar-nav class="ml-auto">
          <a href="/">
            <b-icon icon="x-circle-fill" variant="warning" font-scale="2"></b-icon>
          </a>
        </b-navbar-nav>
      </b-navbar>

      <div>
        <b-navbar type="dark" variant="warning">
          <ul>
            <li v-show="showAdmin"><a href="usuarios">Usuarios</a></li>
            <li><a href="motos">Motos</a></li>
            <li><div class="txtNavActive">Mantenimientos</div></li>
            <li v-show="showAdmin"><a href="consolidados">Consolidados</a></li>
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

          <b-form
            action="javascript:void(0)"
            @submit="crear_mantenimiento()"
            v-show="showAdmin || inEdition"
          >
            <b-form-group @submit.stop.prevent label="Placa" label-for="placa">
              <b-form-input
                class="form-control"
                v-model="mantenimiento.placa"
                placeholder="Ingrese la placa del vehículo"
                id="placa"
              />

              <b-form-invalid-feedback :state="validar_placa"
                >Campo obligatorio</b-form-invalid-feedback
              >
              <b-form-invalid-feedback :state="si_existe" v-show="show"
                >Ya existe una mantenimiento con esta
                placa</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group
              @submit.stop.prevent
              label="Mecánico"
              label-for="id_mecanico"
            >
              <b-form-input
                class="form-control"
                v-model="mantenimiento.id_mecanico"
                placeholder="Ingrese el documento del mecánico"
                id="id_mecanico"
              />
              <b-form-invalid-feedback :state="validar_id_mecanico"
                >Campo obligatorio</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group label="Fecha" label-for="fecha" @submit.stop.prevent>
              <b-form-datepicker
                id="fecha"
                v-model="mantenimiento.fecha"
                class="mb-2"
              ></b-form-datepicker>

              <b-form-invalid-feedback :state="validar_fecha"
                >Campo obligatorio</b-form-invalid-feedback
              >
            </b-form-group>

            <b-form-group
              label="Trabajo realizado"
              label-for="trabajos_realizados"
            >
              <b-form-textarea
                class="form-control"
                v-model="mantenimiento.trabajos_realizados"
                placeholder="Describa el trabajo realizado"
                id="trabajos_realizados"
              />
            </b-form-group>

            <b-form-group label="Horas invertidas" label-for="horas_invertidas">
              <b-form-input
                class="form-control"
                type="number"
                v-model="mantenimiento.horas_invertidas"
                placeholder="¿Cuántas horas invirtió en esta reparación?"
                id="horas_invertidas"
              />
            </b-form-group>

            <br />

            <b-button type="submit" block variant="warning" v-if="!inEdition"
              >Crear Mantenimiento</b-button
            >
            <b-button
              @click="actualizar_mantenimiento()"
              block
              variant="warning"
              v-else
              >Actualizar Mantenimiento</b-button
            >
          </b-form>
          <br />

          <b-button
            type="submit"
            block
            variant="warning"
            @click="showTable = !showTable"
            >Lista de Mantenimientos</b-button
          >
          <br />

          <b-table
            striped
            hover
            :items="lista_mantenimientos"
            v-show="showTable"
            :head-variant="'dark'"
          >
            <template v-slot:cell(acciones)="row">
              <b-button
                size="sm"
                @click="cargar_mantenimiento(row)"
                class="mr-2"
                variant="warning"
                >Modificar</b-button
              >
              <b-button
                v-show="showAdmin"
                variant="outline-warning"
                size="sm"
                @click="eliminar_mantenimiento(row)"
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

<script src="../assets/JS/mantenimientos.js" />
<style src="../css/forms.css" />
