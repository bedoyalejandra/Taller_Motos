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
        ADMINISTRADOR
      </div>
    </b-navbar>
    <div>
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <b-nav-item href="#">Usuarios</b-nav-item>
          <b-nav-item href="#">Motos</b-nav-item>
          <b-nav-item href="#">Mantenmientos</b-nav-item>
          <b-nav-item href="#">Consolidado</b-nav-item>


          <b-nav-item-dropdown text="User" right>
            <b-dropdown-item href="#">Account</b-dropdown-item>
            <b-dropdown-item href="#">Settings</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
    </div>
  </div>
</template>
<style src="../css/home.css" />
