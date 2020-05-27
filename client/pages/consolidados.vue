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
            <b-icon
              icon="x-circle-fill"
              variant="warning"
              font-scale="2"
            ></b-icon>
          </a>
        </b-navbar-nav>
      </b-navbar>

      <div>
        <b-navbar type="dark" variant="warning">
          <ul>
            <li v-show="showAdmin"><a href="usuarios">Usuarios</a></li>
            <li><a href="motos">Motos</a></li>
            <li><a href="mantenimientos">Mantenimientos</a></li>
            <li><div class="txtNavActive">Consolidados</div></li>
          </ul>
        </b-navbar>
      </div>
    </div>

    <div class="background">
      <b-container>
        <b-col>
          <div class="subTitle">
            <b-icon icon="card-heading" font-scale="1.8"></b-icon>
            <div class="hi">*</div>

            {{ message }}
          </div>
          <br />
          <label class="mr-sm-2" for="inline-form-custom-select-pref"
            >Rango del consolidado</label
          >
          <b-form inline>
            <b-form-group label-for="fecha" @submit.stop.prevent>
              <b-form-datepicker
                id="fecha"
                v-model="consolidado.fecha_inicial"
                placeholder="Fecha inicial"
                class="mb-2"
              ></b-form-datepicker>

              <b-form-invalid-feedback :state="validar_fecha1"
                >Campo obligatorio</b-form-invalid-feedback
              >
            </b-form-group>
            <div class="hi">*</div>

            <b-form-group label-for="fecha" @submit.stop.prevent>
              <b-form-datepicker
                id="fecha"
                v-model="consolidado.fecha_final"
                placeholder="Fecha final"
                class="mb-2"
              ></b-form-datepicker>

              <b-form-invalid-feedback :state="validar_fecha2"
                >Campo obligatorio</b-form-invalid-feedback
              >
            </b-form-group>
            <div class="hi">*</div>

            <b-button variant="warning" @click="mostrar_consolidados()"
              >Consultar</b-button
            >
          </b-form>

          <br />
          <br />

          <b-table
            striped
            hover
            :items="lista_consolidados"
            :head-variant="'dark'"
          >   
          </b-table>
          <br />
        </b-col>
      </b-container>
    </div>
  </div>
</template>

<script src="../assets/JS/consolidados.js" />
<style src="../css/forms.css" />
