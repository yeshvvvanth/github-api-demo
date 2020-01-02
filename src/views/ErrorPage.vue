<template>
  <div class="flex-column justify-center screen-height">
    <div>

      <h1 v-if="status==404">
          Page Not found 404
      </h1>
      <h1 v-else>
          {{errorMessage}}
      </h1>

      <router-link
        class="router-link"
        to="/"
      >
        Go Back
      </router-link>
    </div>

  </div>
</template>

<script>
export default {
  props:['error'],
  computed:{
    errorMessage(){
        let error = this.error || this.$route.params.error;
        return error ? error.toString():'error 404';
    },
    status(){
      let status =  this.$route.params.status;
      if(!status){
        status = this.errorMessage.split(' ').pop()
      }
      return status;
    }
  }
}
</script>

<style>

</style>