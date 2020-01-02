<template>
  <div class="flex-column justify-center screen-height">
    <div>

      <h1 v-if="status==404">
          <i class="fas fa-exclamation-triangle"/>
          Page Not found 404
      </h1>
      <h1 v-else>
          {{errorMessage}}
      </h1>

      <button
        @click="$router.go(-1)"
      >
        Go Back
      </button>
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