<template>
  <div>
    <b-navbar toggleable type="light" variant="faded">
      <b-img
        src="https://image.flaticon.com/icons/png/512/26/26969.png"
        fluid
        alt="Fluid image"
        width="100px"
      ></b-img>

      <div class="title">
        MI MOTO
      </div>
    </b-navbar>
    <div>
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'usuarios' }">Usuarios</b-nav-item>
          <b-nav-item :to="{ name: 'motos' }">Motos</b-nav-item>
          <b-nav-item :to="{ name: 'mantenimientos' }">Mantenmientos</b-nav-item>
          <b-nav-item :to="{ name: 'consolidados' }" v-show="showAdmin">Consolidados</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </div>
  </div>

</template>
<script src="../assets/JS/home.js" />
<style src="../css/home.css" />
