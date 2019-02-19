<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="拼团退款" name="collage">
      <collage-refund />
    </el-tab-pane>
    <el-tab-pane label="普通退款" name="normal">
      <normal-refund />
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import NormalRefund from '../refundNormal'
import CollageRefund from '../refundCollage/'

export default {
  components: {
    NormalRefund,
    CollageRefund
  },
  data() {
    return {
      activeName: 'collage'
    }
  },
  methods: {
    handleClick() {
      
    }
  }
}
</script>

