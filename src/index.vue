<template lang="pug">
.section
  .container.is-fluid
    ul(v-on:click="addToCart")
      li.photo-package(v-for="item in pricing")
        span.item.section(:data-name="item.title",:data-id="item.id")
          | {{item.title}}
    .container
      span
        | {{total}}
</template>

<style lang="scss" scoped>

</style>

<script>
const cart = require("./cart")

export default {
  data (context) {
    return {
      pricing : cart.pricing,
      total : cart.state.cart.length
    }
  },
  computed : {
    total (){
      return cart.state.cart.length
    }
  },
  methods : {
    addToCart (e){
      if(e.target && e.target.dataset.id){
        cart.addToCart({
          id : e.target.dataset.id,
          qty : 1,
          extras : {
            "border" : true,
            "retouch" : true,
            "premier" : false,
            "heirloom" : true,
            "frame" : true,
            "cards" : 0
          }
        })
        this.$data.total = cart.state.cart.length
      }
    }
  }
}
</script>

