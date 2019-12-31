<template>
  <div class="flex-column">
    <Screen :loading="loading" :user="user" :error="error"/>
    <div 
        v-show="reload"
        id="loading-bar"
    />
    
    <RepoContainer :user="this.user" :repository="repository">

        <RepoBrowser 
            v-if="isUserPage"
            :user="user"
            :repos="repos"
        />
        <FileViewer 
            v-else-if="file"
            :file="file"
        />
        <FileBrowser 
            v-else-if="directory"
            :directory="directory"
        />

    </RepoContainer>
    

  </div>
</template>

<script>
import Screen from '@/components/Screen.vue'
import FileViewer from '@/components/FileViewer.vue'
import FileBrowser from '@/components/FileBrowser.vue'
import RepoBrowser from '@/components/RepoBrowser.vue'
import RepoContainer from '@/components/RepoContainer.vue'

export default {
    components:{
        Screen,FileBrowser,RepoContainer,FileViewer,RepoBrowser
    },
    data(){
        return {
            user:null,
            repos:null,
            directory:null,
            repository:'',
            file:null,
            loading:true,
            error:null,
            reload: false,
        }
    },
    methods:{
        fetchUserData(){
            this.loading = true;
            let userUrl = this.$apiUrl+'users/'+this.$route.params.id;
            let dataUrl = userUrl+'/repos'; 
  
            this.$axios.get(userUrl).then(
                res => {
                    let data = res.data;
                    if(!data.message){
                        this.user = data;
                    }else{
                        this.loading =false;
                    }
                }
            ).then(
                () => 
                this.$axios.get(dataUrl).then(
                    res => {
                        this.loading =false;
                        this.repos = res.data;
                    }
                )
            ).catch(
                err => {
                    this.error = err.status;
                    this.loading = false;
                    //this.user = null;
                }
            )
            
        },
        fetchPageData(){
   
            if(!this.isUserPage){
                this.reload = true;
                if(!this.directory && !this.file)
                    this.loading = true;
                let arr = this.path.split('/');
                this.repository = arr[2];
                let filepath = arr.slice(3).join('/');
                let dataUrl = this.$apiUrl+'repos/'+this.username+'/'+this.repository+'/contents/'+filepath;

                this.$axios.get(dataUrl).then(
                    res => {
                        let data = res.data;
                        if(data.type)this.file = data;
                        else this.directory = data;
                        this.reload = false;
                        this.loading = false;
                    }
                ).catch(
                    err=>{this.error = err;}
                )
            }else{
               
                this.repository = '';
            }
            this.directory = null;
            this.file = null;
        }
    },
    mounted(){
        this.fetchUserData();
        this.fetchPageData();
    },
    watch:{
        $route(){
            this.fetchPageData();
        }
    }
    ,
    computed:{
        foundUser(){
            return !this.loading && this.user;
        },
        username(){
            return this.$route.params.id
        },
        isUserPage(){
            return this.$route.name == 'repo-list'
        },
        path(){
            return this.$route.path;
        }
    }

}
</script>

<style>
#loading-bar{
    position: fixed;
    right:16px;
    top: 16px;
    height: 16px;
    width: 16px;
    background-color: white;

    animation-name: spin;
    animation-duration: 4000ms;
    animation-iteration-count: infinite;
}
@keyframes spin {
    from { 
        transform: rotate(0deg); 
    } to { 
        transform: rotate(360deg); 
    }
}

</style>