<template>
  <div class="about">
    <!-- <h1>This is an about page</h1> -->
    <sortList></sortList>
    <van-number-keyboard safe-area-inset-bottom />
  </div>
</template>

<script>
import sortList from "@/components/sortList.vue"
import { NumberKeyboard } from "vant"
export default {
    name: 'home',
    components:{
        sortList,
        "van-number-keyboard":NumberKeyboard,
    },
    created(){
      
    }
}
</script>

<style lang="sass" scoped>

</style>