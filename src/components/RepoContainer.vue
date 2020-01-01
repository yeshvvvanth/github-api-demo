<template>
  
    <div v-if="user" class="flex-column align-center">
        <div id="top-bar" class="flex-row justify-space-between align-center full-width">
            <router-link to="/">
                <h2>
                    Github
                </h2>
               
            </router-link>
        </div>
        <div id="user-area" class="flex-column screen-width align-center underline" v-show="repository">

            <div class="flex-row justify-space-between align-center app-area">
                    <div>
                        <router-link :to="'/'+username" class="repo-name">
                            {{this.username}}
                        </router-link>
                        /
                        <span>{{this.repository}}</span>
                    </div>
             
                    <img :src="user.avatar_url" :alt="username" width="32" height="32">
            </div>
        </div>
        <div v-show="repository&&parts.length>0" class="flex-row justify-space-between align-center app-area">
            <div>
                <router-link 
                    class="repo-name"
                    :to="repoPath"
                >
                    {{repository}}
                </router-link>
                <span v-for="(part,n) in parts" :key="n">
                    /
                    <router-link :to="repoPath+'/'+parts.slice(0,n+1).join('/')"
                        class="repo-name"
                    >
                        {{part}}
                    </router-link>
                </span> 
            </div>
            <span>
                <a :href="fileUrl" :download="file?file.name:''">
                    <button
                        v-show="file"
                    >
                        <i class="fas fa-download" />

                        Download
                    </button>
                </a>

                <button style="margin-left:4px;">
                    <i class="fas fa-history" />
                    History
                </button>
            </span>
        </div>
        <div class="flex-column" v-show="!loading">

            <slot/>

        </div>
        <div id="loading-div" 
            v-show="loading"
            class="flex-column justify-center align-center app-area"
        >
            <i class="fas fa-spinner spinner">

            </i>
            <p>
                Loading
            </p>
        </div>

    </div>
    <div v-else class="flex-column justify-center screen-height">
        <h1>
            Could not find user named {{this.username}}
        </h1>
        <p>
            Try searching for another user by going 
            <router-link to="/" >
                back
            </router-link>
        </p>
    </div>


</template>

<script>
export default {
    props:['user','repository','loading','file'],
    data(){
        return {
            fileUrl:''
        }
    },
    computed:{
        username(){
            return this.user ? this.user.login : this.$route.params.id;
        },
        path(){
            return this.$route.path;
        },
        parts(){
            let path = this.$route.path;
            return path.split('/').slice(3)
        },
        repoPath(){
            return '/'+this.username+'/'+this.repository;
        }
    },
    watch:{
        file(){
            if(this.file){
                let data = atob(this.file.content) 
                let blob = new Blob([data], {type: "octet/stream"});
                this.fileUrl = window.URL.createObjectURL(blob);
            }
        }

    }
}
</script>

<style>

#loading-div{
    height: 200px;
    border:1px solid var(--folder-border);
    border-radius: 4px;
    margin-top: 16px;
}
#loading-div > i{
    font-size: 24px;
    color: lightslategray;

}
#top-bar{
    background-color: #24292e;
    padding: 8px 16px;
    box-sizing: border-box;
}
#top-bar * {
    color: white;
    margin: 0;
    border-radius: 4px;
    text-decoration: none;
}
.app-area{
    width: 900px;
    padding: 8px;
}
#user-area{
    margin: 0px;
    background-color: whitesmoke;
}


</style>