<template>
  <div class="main">
    <h1>{{message}}</h1>

    <p>物件录入</p>
    <div>
      用户名：
      <input name="名字" type="text" v-model="name">
      用户序号：
      <input name="编号" type="text" v-model="nameid">
      <button @click="save">存储</button>
    </div>

    <br>
    <br>

    <p>物件查询</p>
    <input type="text" v-model="selectname" placeholder="请输入名字">
    <button @click="select">一键查询</button>
    <div v-for="(item,index) in dataList" v-if="item.name==selectname&&item.status==0" :key="index">
      用户名：
      <input name="名字" type="text" :value="item.name">
      用户序号：
      <input name="编号" type="text" :value="item.nameid">
      <button @click="alreadyTake" v-if="dataList.length>0">点击领取</button>
    </div>
    <br>
    <br>
  </div>
</template>

<script>
import { getLocalTime } from "@/utils/utils";
import { AdminInt } from '@/api/admin'

export default {
  name: "Kuaidi",
  data() {
    return {
      message: "",
      historylist: [],
      dataList: {},
      localMsg: {},
      selectname: "",
      name: "",
      nameid: ""
    };
  },
  beforeCreate: function() {},
  created: function() {
    if (window.localStorage.formHistory) {
      this.localMsg = JSON.parse(window.localStorage.formHistory);
    }
    if (this.localMsg && this.localMsg.length >= 1) {
      console.log(JSON.stringify(this.localMsg));
      this.historylist = this.localMsg;
    }


    // this.$http.get('getChannelStat?channel_name=&page=1&token=2and1543992763').then(res=>{
    //     console.log(res)
    // })

    AdminInt.getChannelStat({
        channel_name:'',
        page:1,
        token:'2and1543992763',
    },res=>{
        console.log(res)
    })

    // this.$http.get('getChannelStat?channel_name=&page=1&token=2and1543992763').then(res => {
    //   console.log(res.data)
    // }).catch(err => {
    //   console.log(err)
    // })
  },
  mounted: function() {},
  methods: {
    addmore() {
      this.dataList.push([]);
    },
    save() {
      if(this.name==''||this.nameid==''){
        this.$toasted.show("数据不能为空");
        return
      }

      var history = [];

      if (this.historylist.length > 0) {
        history = this.historylist;

        history.push({
          name: this.name,
          nameid: this.nameid,
          status: 0, //0未领取，1已领取
          timeSet: getLocalTime(), //获取当前操作日期与时间
          timeEnd: ""
        });
        window.localStorage.formHistory = JSON.stringify(history);
      } else {
        window.localStorage.formHistory = "";
        history.push({
          name: this.name,
          nameid: this.nameid,
          status: 0,
          timeSet: getLocalTime(), //获取当前操作日期与时间
          timeEnd: ""
        });
        window.localStorage.formHistory = JSON.stringify(history);
      }
      alert("录入成功");
      location.reload();
    },
    select() {
      console.log(this.selectname)

      let dataNew = this.historylist.filter((e, i) => {
        if (e.name == this.selectname && e.status != 1) {
          return e;
        }
      });

      if (dataNew.length > 0) {
        this.dataList = dataNew;
      } else {
        alert("暂无录入这个件，或者已经领取了");
      }
    },
    alreadyTake() {
      this.historylist.forEach((e, i) => {
        if (e.name == this.selectname && e.status != 1) {
          e.status = 1;
          e.timeEnd = getLocalTime(); //获取当前操作日期与时间
        }
      });

      this.dataList = this.historylist;

      window.localStorage.formHistory = JSON.stringify(this.historylist);

      alert("领取成功");
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
