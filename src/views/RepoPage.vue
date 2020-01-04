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

let Loads = ['user','content','commits'];
const Load = {}
Loads.forEach(
    (l,n) => {Load[l] = 1<<n;}
)

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
            history:{commits:[],page:1,pageMax:99999,loading:false},

            error:null,
            loading:true,
            reloading: false,
        }
    },
    methods:{
        fetchData(mode,page=1){
            console.log('fetch data mode '+mode);
            this.loading = (mode&Load.user);
            this.reloading = (mode&Load.content);
            this.history.loading = (mode&Load.commits);
            
            const time1 = performance.now();

            const arr = this.path.split('/');
            const repository = arr[2];
            let filepath = arr.slice(3).join('/');

            const userUrl = this.$apiUrl+'users/'+this.$route.params.id;
            const repoListUrl = userUrl+'/repos'; 
            const repoUrl = this.$apiUrl+'repos/'+this.username+'/'+repository
            const contentUrl = repoUrl+'/contents/'+filepath;
            const commitUrl = repoUrl+'/commits?path='+filepath+'&per_page=50'+'&page='+page

            Promise.all([
                mode&Load.user?this.$axios.get(userUrl):false,
                mode&Load.user?this.$axios.get(repoListUrl):false,
                mode&Load.content?this.$axios.get(contentUrl):false,
                mode&Load.commits?this.$axios.get(commitUrl):false,
                ]
            ).then(
                ([user,repos,file,commits]) => {
                    if(user){
                        this.user = user.data;
                        this.repos=repos.data;
                    }
                    if(file){
                        this.file = this.directory = null;
                        let data = file.data;
                        if(data.type)this.file = data;
                        else this.directory = data;
                    }
                    if(commits){
                        if(commits.data.length>0){
                            this.history.page = page;
                            this.history.commits = commits.data;
                            if(commits.data.length<50){
                                this.history.pageMax = this.history.page;
                            }
                        }
                        else{
                            this.history.pageMax = this.history.page -1;
                        }
                    }
                    const elapsed = (performance.now()-time1);
                    const minDelay = this.loading ? 500 : 300;
                    const delay = elapsed > minDelay ? 0 : minDelay;
                    setTimeout(() => {
                        this.loading = false;
                        this.reloading = false;
                        this.history.loading = false;
                        
                    },delay);
                }
            )
            .catch(
                err => {this.showError(err);}
            )

        }
        ,
        getCommitPage(page){
            this.fetchData(Load.commits,page);
        }
        ,
        showError(error){
            this.loading = false;
            this.error = error;
        }
    },
    mounted(){
        this.fetchData(Load.user|(!this.isUserPage?(Load.content|Load.commits):0))
    },
    watch:{
        $route(){
            this.errror = null;
            if(!this.isUserPage)
                this.fetchData(Load.content|Load.commits);
            else
                {
                    this.loading = true;
                    setTimeout(() => {
                        this.loading = false;
                    }, 500);
                }
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
    width: 900px;
}
@media (max-width:900px){
    .wide{
        width: 95%;
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