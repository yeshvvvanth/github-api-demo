<template>
  <div id='file-browser' class="app-area">

      <div class="flex-column ">
          <div class="flex-row justify-space-between align-center file-bar"
            v-if="backPath.lastIndexOf('/')>0"
          >
              <router-link 
                :to="backPath"
                class="router-link"
              >
                <span class="back-button">..</span>
              </router-link>
          </div>
          <div v-for="d in entries" :key="d.id" class="flex-row justify-space-between align-center file-bar">
              <span>
                <i class="margin-right-8" :class="getIcon(d)"  />
                <router-link 
                    :to="path+'/'+d.name"
                    class="router-link"
                >
                
                    {{d.name}}
                </router-link>
              </span>

              <p>
                  {{getSize(d)}}
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
        },
        backPath(){
            let path = this.$route.path;
            let bpath = path.substring(0,path.lastIndexOf('/'));
            return bpath;
        }
    },
    methods:{
        getIcon(file){
            return file.type=='dir'?'fas fa-folder folder':'far fa-file-alt file'
        },
        getSize(file){
            let size = ''
            if(file.type=='file'){
                let nsize = file.size;
                let suffix = 'B'
                if(nsize>1000000.0){
                    suffix = 'Mb'
                    nsize /= 1000000.0;
                }else if(nsize>1000){
                    suffix = 'Kb'
                    nsize /= 1000.0;
                }
                size = (Math.round(nsize * 10) / 10)+' '+suffix
            }
            return size;
        }
    }
}
</script>

<style>
.file{
    color: lightslategray;
}
.folder{
    color:slategray;
}
.margin-right-8{
    margin-right:4px;
}
.back-button{
    padding: 4px 16px;
    background-color: aliceblue;
    border-radius: 4px;
}
.file-bar{
    padding: 8px 12px;
    border: 1px solid var(--folder-border);
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