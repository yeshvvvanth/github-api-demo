<template>
  <div id='file-browser'>

      <div class="flex-column ">
          <div v-for="d in entries" :key="d.id" class="flex-row justify-space-between align-center file-bar">
              <router-link 
                :to="path+'/'+d.name"
                class="router-link"
              >
                {{d.name}}
              </router-link>

              <p>
                  {{d.size}}
              </p>
          </div>
      </div>

  </div>
</template>

<script>
export default {
    props:{
        directory:{
            type:Array
        }
    }
    ,
    computed:{
        path(){
            return this.$route.path;
        }
        ,
        entries(){
            let sorted = this.directory.slice();
            sorted.sort(
                (a,b)=>{ 
                    return (a.type=='file'?1:0) - (b.type=='file'?1:0); 
                }
            )
            return sorted;
        }
    }
}
</script>

<style>

.file-bar{
    padding: 8px 12px;
    border: 1px solid rgb(214, 225, 236);
}

.file-bar:hover{
    background-color: rgb(246, 251, 255);
}
.file-bar > *{
    margin: 0;
}

.file-bar:not(:first-child){
    border-top: none;
}
.file-bar:first-child{
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}
.file-bar:last-child{
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
}

.router-link,.repo-name{
    color: rgb(62, 146, 255);
    text-decoration: none;
    font-size: 14px;
}
.router-link:hover,.repo-name:hover{
    text-decoration: underline;
}

</style>