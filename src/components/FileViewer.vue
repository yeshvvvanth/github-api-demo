<template>
  <div id='file-viewer' >
    <div class="code-container">
     
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

<style scoped>
code{
  display: block;
  white-space: pre-wrap;  
  min-height: 120px;
  text-align: left;
  word-wrap: break-word;
  
}
.code-container{
    border-radius: 4px;
    padding: 8px 12px;
    border: 1px solid var(--folder-border);
    background-color: white;
}

</style>