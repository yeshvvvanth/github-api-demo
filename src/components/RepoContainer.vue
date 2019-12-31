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
             <button>
                 History
             </button>
        </div>
        <div class="flex-column">

            <slot/>

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
    props:['user','repository'],
    computed:{
        username(){
            return this.user ? this.user.login : '';
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
    }
}
</script>

<style>
#top-bar{
    background-color: #24292e;
    padding: 8px 16px;
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