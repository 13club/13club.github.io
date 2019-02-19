<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="普通订单" name="normal">
      <normal-order />
    </el-tab-pane>
    <el-tab-pane label="拼团订单" name="collage">
      <collage-order />
    </el-tab-pane>
    <el-tab-pane label="兑换订单" name="exchange">
      <exchange-order />
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import NormalOrder from '../orderNormal'
import CollageOrder from '../orderCollage/'
import ExchangeOrder from '../orderExchange/'

export default {
  components: {
    NormalOrder,
    CollageOrder,
    ExchangeOrder
  },
  data() {
    return {
      activeName: 'normal'
    }
  },
  methods: {
    handleClick() {
      
    }
  }
}
</script>

