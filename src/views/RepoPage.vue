<template>
  <div id="main-repo-column" class="flex-column align-center">
    <LoadingScreen :loading="loading" :user="user"/>

    <div id="top-bar" v-show="!error"
        class="flex-row justify-space-between align-center full-width"
    >
        <router-link to="/">
            <h1 class="inline">
                <i class="fab fa-github" style="font-weight:400;"/>
            </h1>
            <h2 class="inline">
                Github 
            </h2>
            
        </router-link>
    </div>

    <ErrorPage v-if="error" :error="error"/>
    <RepoBrowser 
        v-else-if="isUserPage"
        :user="user"
        :repos="repos"
    />
    <FileManager 
        v-else
        :loading="reloading"
        :file="file"
        :history="history"
        @getCommits="getCommitPage"
        class="wide"
    >
        <FileViewer 
            v-if="file"
            :file="file"
        />
        <FileBrowser 
            v-else-if="directory"
            :directory="directory"
        />

    </FileManager>

    

  </div>
</template>

<script>
import LoadingScreen from '@/components/Screen.vue'
import FileViewer from '@/components/FileViewer.vue'
import FileBrowser from '@/components/FileBrowser.vue'
import RepoBrowser from '@/components/RepoBrowser.vue'
import FileManager from '@/components/FileManager.vue'
import ErrorPage from '@/views/ErrorPage.vue'

export default {
    components:{
        LoadingScreen,FileBrowser,FileManager,FileViewer,RepoBrowser,ErrorPage
    },
    data(){
        return {
            user:null,
            repos:null,
            directory:null,
            file:null,
            history:{commits:[],page:1,pageMax:99999},

            error:null,
            loading:true,
            reloading: false,
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
                this.history.pageMax = 99999;
                this.history.page = 1;

                this.reloading = true;
                let arr = this.path.split('/');
                let repository = arr[2];
                let filepath = arr.slice(3).join('/');
                let repoUrl = this.$apiUrl+'repos/'+this.username+'/'+repository
                let dataUrl = repoUrl+'/contents/'+filepath;

                this.$axios.get(dataUrl).then(
                    res => {
                        let data = res.data;
                        if(data.type)this.file = data;
                        else this.directory = data;
                        this.reloading = false;
                        this.loading = false;
                    }
                ).catch(
                    err=>{this.showError(err)}
                )
                this.fetchCommits(1);

            }
            this.directory = null;
            this.file = null;
        },
        fetchCommits(page){
            let arr = this.path.split('/');
            let repository = arr[2];
            let filepath = arr.slice(3).join('/');
            let repoUrl = this.$apiUrl+'repos/'+this.username+'/'+repository
            let commitUrl = repoUrl+'/commits?path='+filepath+'&per_page=50'+'&page='+page
            this.$axios.get(commitUrl).then(
                res => {
                    if(res.data.length>0){
                        this.history.page = page;
                        this.history.commits = res.data;
                        if(res.data.length<50){
                            this.history.pageMax = this.history.page;
                        }
                    }
                }
            ).catch(
                err=>{this.showError(err)}
            )
        },
        getCommitPage(page){
            this.fetchCommits(page);
        }
        ,
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
.wide{
    min-width: 900px;
}
@media (max-width:900px){
    .wide{
        min-width: 95%;
    }
}
@media (max-width:520px){
    #repo-browser{
        flex-direction: column;
    }
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
#top-bar{
    background-color: var(--primary);
    padding: 8px 32px;
    box-sizing: border-box;
}
#top-bar * {
    color: white;
    margin: 0;
    border-radius: 4px;
    text-decoration: none;
}

</style>