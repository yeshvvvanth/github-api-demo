<template>
    <div id="obscreen" v-show="this.showScreen" class="flex-column justify-center">
        <div v-if="isError">
            <h1>
                error {{this.error}}
            </h1>
        </div>
        <div v-else id="loading-indicator">
            <i class="fas fa-spinner spinner">

            </i>
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