<template>
  <div class="main">
    <h1>{{message}}</h1>

    <p>物件查询</p>
    <input type="text" v-model="selectname" placeholder="请输入名字">
    <button @click="select">一键查询</button>
    <div v-for="(item,index) in dataList" :key="index">
      用户名：
      <input name="名字" type="text" :value="item.name">
      用户序号：
      <input name="编号" type="text" :value="item.nameid">
      <span>{{item.status==0?'未领取':'已领取'}}</span>
    </div>

    <br>
    <br>
  </div>
</template>

<script>
import { getLocalTime } from "@/utils/utils";

export default {
  name: "userlist",
  data() {
    return {
      message: "",
      historylist: [],
      dataList: {},
      localMsg: {},
      selectname: "",

    };
  },
  beforeCreate: function() {},
  //当进入组件之前，执行 beforRouteEnter 路由钩子函数
  beforeRouteEnter(to,from,next){
      console.log(this) // 结果为undefined，因为在执行beforRouteEnter时候，组件还没有被创建出来；先执行beforRouteEnter，再执行beforeCreate
      next((vm)=>{ //参数vm就是当前组件的实例。
        vm.$dialog("管理员才可进入！请前往登录", true);
        // setTimeout(()=>{
        //   next({
        //     path: '/login'
        //   })
        // },1500)
      })
  },
  // 有二级导航的，在切换二级导航的时候，对应的内容是在变化的
  beforeRouteUpdate(to,from,next){
     next();
  },
  // 页面有些数据还没有加载完成，这时候我们不让它切换
  beforeRouteLeave(to,from,next){//离开组件的时候触发
      //什么都不写的时候，不会离开(走下一步)
      next()
  },
  created: function() {
    if (window.localStorage.formHistory) {
      this.localMsg = JSON.parse(window.localStorage.formHistory);
    }
    if (this.localMsg && this.localMsg.length >= 1) {
      console.log(JSON.stringify(this.localMsg));

      this.historylist = this.localMsg;
    
      this.dataList = this.localMsg

      console.log("当前时间为：", getLocalTime());
    }else{
      this.$toasted.show("暂无数据");
    }
  },
  mounted: function() {},
  methods: {
    select() {
      let dataNew = this.historylist.filter((e, i) => {
        if (e.name == this.selectname) {
          return e;
        }
      });
  
      if (dataNew.length > 0) {
        this.dataList = dataNew;
      } else {
        this.$toasted.show("暂无此人数据");
      }
    },

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  width: 600px;
  margin: 0 auto;
}
</style>
