<template>
    <div id='repo-browser' class="flex-row">
        <div class="flex-column align-start" id="user-panel">
            <img :src="user.avatar_url" :alt="user.login" width="256" height="256">
            <h2>
                {{user.login}}
            </h2>
            <p>
                User details etc
            </p>
        </div>
        <div  class="flex-column flex1">
            <div class="underline">
                <h3 >
                    Public Repositories
                </h3>
            </div>
            <div id="repo-container" class="flex-row flex1 ">
                <div class="flex-column align-start repo-card"  v-for="r in repos" :key="r.id">
                    <router-link 
                        class="repo-name"
                        :to="'/'+user.login+'/'+r.name"
                    >
                        {{r.name}}
                    </router-link>
                    <p>
                        <small>
                        some serious details about this particular repository
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
    border-bottom: 1px solid rgb(211, 211, 211);
    margin-bottom: 16px;
}
#user-panel{
    margin-right: 32px;
}


#repo-browser{
    text-align: left;
    width: 80vw;
    margin-top: 32px;
}
#repo-container{
    flex-wrap: wrap;
}
.repo-card{
    padding: 16px;
    width: 412px;
    height: 120px;
    border: 1px solid rgb(218, 225, 231);
    margin: 8px;
    border-radius: 4px;
}

</style>