<template>
  
    <div v-if="user" class="flex-column">
        <div id="top-bar" class="flex-row justify-space-between align-center">
            <router-link to="/">
                <h2>
                    Github
                </h2>
            </router-link>
        </div>
        <div id="user-bar" class="flex-column">

            <div class="flex-row justify-space-between align-center">
                    <div>
                        <router-link :to="'/'+username">
                            {{this.username}}
                        </router-link>
                    </div>
                    <img :src="user.avatar_url" :alt="username" width="32" height="32">
            </div>
        </div>
        <div id="app-area">

            <slot/>

        </div>

    </div>
    <div v-else class="flex-column justify-center full-height">
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
    props:['user','username']
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
#app-area{
    margin: 0px auto;
    min-width: 900px;
}
#user-bar{
    margin: 0px auto;
    min-width: 900px;
    background-color: floralwhite;
}

</style>