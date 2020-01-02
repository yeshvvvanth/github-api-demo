<template>
    <div id='repo-browser' class="flex-row justify-center">
        <div class="flex-column align-start" id="user-panel" v-if="user">
            <img :src="user.avatar_url" :alt="user.login" width="256" height="256">
            <h2>
                {{user.name}}
            </h2>
            <h4 style="margin-top:0px;color:slategray">
                {{user.login}}
            </h4>
            <p v-if="user.location">
                <i class="fas fa-map-marker-alt">

                </i>
                {{user.location}}
            </p>
            <p v-if="user.bio">
                {{user.bio}}
            </p>
            <p v-if="user.blog">
                <i class="fas fa-link"/>
                <a :href="user.blog" class="router-link">
                    {{user.blog}}
                </a>
            </p>
        </div>
        <div id="repo-container"  class="flex-column ">
            <div class="underline">
                <h3 >
                    Public Repositories
                </h3>
            </div>
            <div  class="flex-row flex-wrap">
                <div class="flex-column align-start justify-space-between repo-card" 
                    style="padding-bottom:0px;" 
                    v-for="r in repos" :key="r.id"
                >
                    <span>
                    <router-link 
                        class="repo-name"
                        :to="'/'+user.login+'/'+r.name"
                    >
                        {{r.name}}
                    </router-link>
                    <p>
                        <small>
                                {{r.description}}
                        </small>
                    </p>

                    </span>
                    <p>
                        <small>
                            
                            <span v-if="r.stargazers_count" style="margin-right:4px;">
                                <i class="fas fa-star"/>
                                {{r.stargazers_count}}

                            </span>
                            
                            <span v-if="r.forks_count">
                                <i class="fas fa-code-branch"/>
                                {{r.forks_count}}
                            </span>
                        </small>
                    </p>
                </div>
                <div v-if="repos && repos.length == 0">
                    <p>
                        This user has no Public Repositories.
                    </p>
                </div>  
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"RepoBrowser",
    props:[
        'user','repos'
    ],
    methods:{
        
    }
}
</script>

<style>
.repo-name{
    font-weight: bold;
}

.underline{
    border-bottom: 1px solid var(--folder-border);
    margin-bottom: 16px;
}
#user-panel{
    box-sizing: border-box;
    margin: 0 32px;
    width: 256px;

}


#repo-browser{
    box-sizing: border-box;
    text-align: left;
    width: 100%;
    margin-top: 32px;
}
#repo-container{
    width: 930px;
    margin: 0 28px;
}
.repo-card{
    padding: 16px;
    width: 412px;
    min-height: 40px;
    max-height: 120px;
    margin: 8px;
    border-radius: 4px;
    /* border: 1px solid rgb(218, 225, 231); */
    background-color: white;
    box-shadow: 2px 2px 6px rgb(218, 229, 245);
}

</style>