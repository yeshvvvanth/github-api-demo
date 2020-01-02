<template>
  <div id='file-viewer' class="app-area">
    <div class="file-bar">
     
          <code>
              {{content}}
          </code>
    </div>
  </div>
</template>

<script>
export default {
    props:[
        'file','user'
    ],
    computed:{
      content(){
        return atob(this.file.content);
      }
    }
}
</script>

<style>
code{
  display: block;
  white-space: pre-wrap;  
  min-height: 120px;
  text-align: left;
  word-wrap: break-word;
  
}

</style>