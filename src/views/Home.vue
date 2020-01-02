<template>
  <div id="home-container" class="flex-column align-center">

    <div style="margin-top:30vh;">
        
        <h1>
            Github 
        </h1>
        <form action="gotToRepo" class="brow">

            <!-- <label for="repoField">
                Enter repository name
            </label> -->
            <input 
                type="text" 
                name="repoField" 
                id="repoName" 
                v-model="repoName" 
                placeholder="enter user name"
                class="borderless"
            />

            <button
                class="borderless"
                id="search-button"
                type="submit"
                @click="goToRepo"
            >
                <i class="fas fa-search" />
            </button>
        </form>
        
    </div>



  </div>

</template>

<script>
export default {
    data(){
        return {
            repoName:""
        }
    },
    methods:{
        goToRepo: function(){
            this.$router.push({
                name:'repo-list',
                params:{id:this.repoName}
            })
        }
    }
}
</script>

<style >

#home-container{
    min-height: 100vh;
    background: linear-gradient(to bottom,rgb(215, 236, 255),white);
    margin: 0;
    padding: 0;
}

#search-button{
    background-color: white;
    color: skyblue;
    font-weight: 600;
}

.brow{
    /* border: 1px solid white; */
    /* box-shadow: 0 0 12px lightblue;  */
}
.brow > *{
    padding: 16px;
    border-radius: 8px;
    outline: none;
}
.brow *:not(:first-child){
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border-left: none;
}
.brow *:not(:last-child){
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    border-right: none;
}
#repoName:focus,.brow > *:active{
    box-shadow: inset 0 0 4px lightgray;
}


</style>