<template>
  <div>
    <body style="background-color:#333A41;"></body>

    <b-container>
      <div class="titleW">
        MI MOTO
      </div>
    </b-container>

    <div class="container">
      <a href="usuarios">
        <div class="container2">
          <b-img
            src="../images/usuarios.png"
            fluid
            alt="Fluid image"
            width="200px"
          ></b-img>
          <div class="titleY">
            USUARIOS
          </div>
        </div>
      </a>

      <a href="motos">
        <div class="container2">
          <b-img
            src="../images/moto.png"
            fluid
            alt="Fluid image"
            width="200px"
          ></b-img>
          <div class="titleY">
            MOTOS
          </div>
        </div>
      </a>
    </div>

    <div class="container">
      <a href="mantenimientos">
        <div class="container2">
          <b-img
            src="../images/mantenimiento.png"
            fluid
            alt="Fluid image"
            width="200px"
          ></b-img>
          <div class="titleY">
            MANTENIMIENTOS
          </div>
        </div>
      </a>
      <b-form-row v-show="showAdmin">
        <a href="consolidados">
          <div class="container2">
            <b-img
              src="../images/consolidado.png"
              fluid
              alt="Fluid image"
              width="200px"
            ></b-img>
            <div class="titleY">
              CONSOLIDADOS
            </div>
          </div>
        </a>
      </b-form-row>
    </div>
  </div>
</template>
<script src="../assets/JS/home.js" />
<style src="../css/home.css" />
