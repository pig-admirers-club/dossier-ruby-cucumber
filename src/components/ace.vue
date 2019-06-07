<template>
  <div id="container">
    <nav id="left-nav">
      <ul>
        <router-link to="/">
          <li><i class="zmdi zmdi-home"></i></li>
        </router-link>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">  
  export default {
    mounted() { 

    }
  }
</script>

<style>
  body, html {
    margin: 0;
    padding: 0;
    font-family: 'Open Sans', sans-serif;
  }
  #container {
    width: 100%;
    min-height: 100vh;
    display: flex;
  }
  nav#left-nav {
    width: 60px;
    padding-top: 29px;
    background-color: rgba(0, 0, 0, 0.2);
  }
  
  #left-nav ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    font-size: 30px;
  }

  a {
    color: #000;
    text-decoration: none !important;
  }
</style>