<template>
<div>
  <div id="nav">
    <router-link to="/">Home</router-link> | 
    <router-link to="/u/ksefeane">User</router-link> |
    <router-link to='/search'>Search</router-link> | 
    <router-link to='/welcome'>Welcome</router-link>
  </div>
  <router-view/> 
</div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.main_panel {
    display: grid;
    grid-gap: 10px;
    background-color: inherit;
}

.panel_item {
    padding: 20px;
    margin-right: 10px;
    margin-bottom: 3px;
    background-color:navajowhite;
    border-radius: 5px;
    border: 1px solid black;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.25s ease;
}

.panel_item:hover {
    transform: scale(1.01, 1.1)
}
</style>
