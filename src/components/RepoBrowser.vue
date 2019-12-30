<template>
  <div>
        <h3>
            Repossitories:
        </h3>

        <div>
            <p v-for="r in repos" :key="r.id">
                {{r.name}}
            </p>
        </div>
  </div>
</template>

<script>
export default {
    props:[
        'user','repos'
    ],
    methods:{
        
    }
}
</script>

<style>

</style>