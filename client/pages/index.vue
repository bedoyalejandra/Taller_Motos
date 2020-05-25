<template>
  <div class="body">
    <b-container>
      <b-col>
        <!-- Content here -->
        <body style="background-color:#333A41;"></body>

        <b-container>
          <div class="container">
            <b-img
              src="../images/motologo.png"
              fluid
              alt="Fluid image"
              width="80px"
            ></b-img>
            <div class="titleW">
              MI MOTO
            </div>
          </div>
        </b-container>

        <br />

        <b-form action="javascript:void(0)">
          <b-form-group
            @submit.stop.prevent
            label="Documento"
            class="titleForm"
            label-for="documento"
          >
            <b-form-input
              class="form-control"
              v-model="usuario.documento"
              type="number"
              placeholder="Ingrese su documento de identidad"
              documento="documento"
            />

            <b-form-row v-show="!validar_id">
              <p class="textWarning">Campo obligatorio</p>
            </b-form-row>
          </b-form-group>

          <b-form-group
            @submit.stop.prevent
            label="Contraseña"
            class="titleForm"
            label-for="password"
          >
            <b-form-input
              class="form-control"
              type="password"
              v-model="usuario.clave"
              placeholder="Ingrese su contraseña"
              documento="password"
            />
            <b-form-row v-show="!validar_clave">
              <p class="textWarning">Campo obligatorio</p>
            </b-form-row>
          </b-form-group>

          <b-button @click="login()" type="submit" block variant="warning"
            >Ingresar</b-button
          >
          <br />

          <div class="text">
            {{ mensaje2 }}
          </div>
        </b-form>
        <br />
      </b-col>
    </b-container>
  </div>
</template>

<script src="../assets/JS/login.js" />
<style src="../css/home.css" />
