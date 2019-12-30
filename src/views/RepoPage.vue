<template>
  <div class="flex-column">
    <Screen :fresh="this.fresh" :user="this.user" :error="error"/>

    
    <UserInfo :user="this.user" :username="username">

        <component :is="ActiveBrowser" 
            :repos="repos" 
            :repository="repository"
            :file="file" 
        />
    </UserInfo>
    

  </div>
</template>

<script>
import Screen from '@/components/Screen.vue'
import FileViewer from '@/components/FileViewer.vue'
import FileBrowser from '@/components/FileBrowser.vue'
import RepoBrowser from '@/components/RepoBrowser.vue'
import UserInfo from '@/components/UserInfo.vue'

export default {
    components:{
        Screen,FileBrowser,UserInfo,FileViewer,RepoBrowser
    },
    data(){
        return {
            user:null,
            repos:null,
            repository:null,
            file:null,
            fresh:true,
            error:null,
            FileViewer,FileBrowser,RepoBrowser
        }
    },
    mounted(){
        let userUrl = this.$apiUrl+'users/'+this.$route.params.id;
        let reposUrl = userUrl+'/repos'; 

        fetch(userUrl).then(res=>res.json()).then(
            data => {
                if(!data.message){
                    this.user = data;
                }else{
                    this.fresh =false;
                }
            }
        ).then(
            () => 
            fetch(reposUrl).then(res=>res.json()).then(
                data => {
                    this.fresh =false;
                    this.repos = data;
                }
            )
        ).catch(
            err => {
                this.error = err;
                this.fresh = false;
                this.user = null;
            }
        )
    },
    computed:{
        foundUser(){
            return !this.fresh && this.user;
        },
        username(){
            return this.$route.params.id
        },
        ActiveBrowser(){
            if(this.file)return this.FileViewer;
            else if(this.repository)return this.FileBrowser;
            return this.RepoBrowser;
        }
    }

}
</script>

<style>


</style>