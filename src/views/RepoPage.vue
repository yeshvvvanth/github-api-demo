<template>
  <div class="flex-column">
    <Screen :loading="loading" :user="user"/>

    <ErrorPage v-if="error" :error="error"/>
    <RepoContainer 
        v-else
        :user="this.user" 
        :repository="repository"
        :loading="reload"
        :file="file"
        :commits="commits"
    >

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
import ErrorPage from '@/views/ErrorPage.vue'

export default {
    components:{
        Screen,FileBrowser,RepoContainer,FileViewer,RepoBrowser,ErrorPage
    },
    data(){
        return {
            user:null,
            repos:null,
            directory:null,
            repository:'',
            file:null,
            commits:null,

            error:null,
            loading:true,
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
                    this.user = data;
                }
            ).then(
                () => 
                this.$axios.get(dataUrl).then(
                    res => {
                        if(this.isUserPage)
                            this.loading =false;
                        this.repos = res.data;
                    }
                )
            ).catch(
                err => {
                    this.showError(err)
                }
            )
            
        },
        fetchPageData(){
   
            if(!this.isUserPage){
                this.reload = true;
                let arr = this.path.split('/');
                this.repository = arr[2];
                let filepath = arr.slice(3).join('/');
                let repoUrl = this.$apiUrl+'repos/'+this.username+'/'+this.repository
                let dataUrl = repoUrl+'/contents/'+filepath;
                let commitUrl = repoUrl+'/commits?path='+filepath

                this.$axios.get(dataUrl).then(
                    res => {
                        let data = res.data;
                        if(data.type)this.file = data;
                        else this.directory = data;
                        this.reload = false;
                        this.loading = false;
                    }
                ).catch(
                    err=>{this.showError(err)}
                )
                this.$axios.get(commitUrl).then(
                    res => {
                        this.commits = res.data;
                    }
                ).catch(
                    err=>{this.showError(err)}
                )
            }else{
               
                this.repository = '';
            }
            this.directory = null;
            this.file = null;
        },
        showError(error){
            // if(this.$route.name != 'error'){

            //     this.$router.push({name:'error',params:{
            //         error:error,
            // }})
            // }
            this.loading = false;
            this.error = error;
        }
    },
    mounted(){
        this.fetchUserData();
        this.fetchPageData();
    },
    watch:{
        $route(){
            this.errror = null;
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
    font-size: 20px;
    right:16px;
    top: 16px;
    color: white;

    /* background-color: white; */
}

.spinner{
    animation-name: spin;
    animation-duration: 1000ms;
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