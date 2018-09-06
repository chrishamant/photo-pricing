<template lang="pug">
.section
  .container.is-fluid
    ul(v-on:click="addToCart")
      li.photo-package(v-for="item in pricing")
        span.item.section(:data-name="item.title",:data-id="item.id")
          | {{item.title}}
    .container
      span {{total}}
</template>

<script>
const calc = import("../src/calc")
var cart = []
export default {
  asyncData (context) {
    // called every time before loading the component
    return {
      pricing : require("../data/pricing.json"),
      sums : function(){
        calc(cart)
      },
      total : 0
    }
  },
  methods : {
    addToCart (e){
      if(e.target && e.target.dataset.id){
        cart.push({
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
      }
    }
  }
}
</script>

<style lang="scss">
  @import "~bulma";
  @import "~buefy/src/scss/buefy";
</style>
