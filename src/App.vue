<template>
  <div id="app" class="flex-column">

    <router-view/>

  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  
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

html,body,div {
  padding: 0;
  margin: 0;
}

.red{
  background-color: red;
}

/* Input styling */
button{
  background-color: rgb(108, 108, 255);
  border:none;
  outline: none;
  border-radius: 4px;
  padding: 8px 12px; 
  color:white;
  cursor: pointer;
  font-weight: 500;
}
input {
  padding: 8px 12px;
  border:1px solid lightslategray;
  border-radius: 4px;
  color: darkslategray;
}

/* flexbox stuff */

.flex-row{
  display: flex;
}
.flex-column{
  display: flex;
  flex-direction: column;
}


.align-center{
  align-items: center;
}
.justify-center{
  justify-content: center;
}
.justify-end{
  justify-content: flex-end;
}
.justify-space-between{
  justify-content: space-between;
}


.full-height{
  height: 100vh;
}

</style>
