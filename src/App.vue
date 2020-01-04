<template>
  <div id="app" class="flex-column">

    <router-view/>

  </div>
</template>

<style>

:root{
  /* --folder-border:rgb(214, 225, 236); */
  --folder-border: rgb(204, 223, 236);
  --primary: #26343f;
  --blue:rgb(62, 146, 255);
}

*{
  box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--primary);
  margin: 0;
  padding: 0;
  background-color: ghostwhite;
  min-height: 100vh;
}
:i{
  color:var(--primary);
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
p{
  font-size: 14px;
  color: #6a737d;
}
small{
  color: rgb(92, 106, 121);
  font-size: 12px;
}
.red{
  background-color: red;
}
.yellow{
  background-color: yellow;
}
.inline{
  display: inline;
}
.inline-block{
  display: inline-block;
}

.borderless{
  border:none;
}

img{
  border-radius: 4px;
}

/* Input styling */
button{

  border:none;
  outline: none;
  border-radius: 4px;
  padding: 8px 12px; 
  cursor: pointer;
  font-weight: bold;
  color: var(--primary);

  background-color: white;
  border: 1px solid var(--folder-border);
}
.primary{
  background-color: rgb(60, 145, 255);
  color:white;
  border:none;
}
.margin-bottom-16{
  margin-bottom:16px
}
.margin-bottom-8{
  margin-bottom:8px
}
.margin-8{
  margin:8px;
}
.margin-4{
  margin:4px;
}
.padding-8{
  padding:8px;
}
.padding-4{
  padding:4px;
}
.padding-bottom-8{
  padding-bottom: 8px;
}
input {
  padding: 8px 12px;
  border:1px solid lightslategray;
  border-radius: 4px;
  color: darkslategray;
}
::placeholder{
  color: lightsteelblue;
}
/* flexbox stuff */

.flex-row{
  display: flex;
}
.flex-column{
  display: flex;
  flex-direction: column;
}
.flex-wrap{
  flex-wrap: wrap;
}
.flex1{
  flex:1;
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

.align-start{
  align-items: flex-start;
}
.align-end{
  align-items: flex-end;
}

.screen-width{
  width: 100vw;
}
.screen-height{
  height: 100vh;
}
.screen-height-min{
  min-height: 100vh;
}
.full-width{
  width: 100%;
}
.full-height{
  height: 100%;
}

</style>
