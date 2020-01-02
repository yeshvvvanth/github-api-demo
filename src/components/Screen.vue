<template>
    <div id="obscreen" v-show="loading" class="flex-column justify-center">
        <div id="loading-indicator">
            <i class="fas fa-spinner spinner" />
            <h1 >
                loading ...
            </h1>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        user:{},
        loading:{},
        error:{}
    },
    data(){
        return {
            testData:'haha'
        }
    },
    computed:{
        isError(){
            return this.error;
        },
        showScreen(){
            return this.loading || this.isError;
        },
    }
}
</script>

<style>

#loading-indicator{
    color:darkslategray;
}
#loading-indicator i{
    font-size:36px;
}
#obscreen{
    position: absolute;
    min-width: 100vw;
    min-height: 100vh;
    background-color: aliceblue;
    margin: 0;
    z-index: 9;
    
}

</style>