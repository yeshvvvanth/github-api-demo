<template>
    <div>
        <span v-for="(part,n) in parts" :key="n">
            {{n?'/':''}}
            <router-link :to="'/'+parts.slice(0,n+1).join('/')"
                class="repo-name"
            >
                {{part}}
            </router-link>
        </span> 
    </div>
</template>

<script>
export default {
    props:['path'],
    computed:{
        parts(){
            return this.path.split('/').slice(1)
        },
    }
}
</script>

<style>

</style>