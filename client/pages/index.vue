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
          <b-nav-item href="#">Home</b-nav-item>

          <!-- Navbar dropdowns -->
          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">Usuarios</b-dropdown-item>
            <b-dropdown-item href="#">Motos</b-dropdown-item>
            <b-dropdown-item href="#">Mantenmientos</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

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

