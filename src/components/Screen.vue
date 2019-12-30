<template>
    <div id="screen" v-show="this.showScreen" class="flex-column justify-center">
        <div v-if="isError">
            <h1>
                error {{this.error}}
            </h1>
        </div>
        <div v-else>
            <h1>
                loading ...
            </h1>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        user:{},
        fresh:{},
        error:{}
    },
    computed:{
        isLoading(){
            return this.fresh;
        },
        isError(){
            return this.error;
        },
        showScreen(){
            return this.isLoading || this.isError;
        },
    }
}
</script>

<style>
#screen{
    position: absolute;
    min-width: 100vw;
    min-height: 100vh;
    background-color: floralwhite;
    margin: 0;
    z-index: 9;
    
}

</style>