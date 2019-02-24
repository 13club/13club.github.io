<template>
  <div>
    <div>请输入地址：<input type='text' name='address' v-model="inputAddress"/><button @click="getUserLocation">查询</button></div>
    <div v-if="showMap">
      <div class="map-main">
          <div id="container"></div>
      </div>
      <div @click="getLocationData">
        经度：{{longitude}}
        <br>
        纬度：{{latitude}}
      </div>
    </div>

    <br>
    <hr>

    <v-distpicker @selected="onSelected"></v-distpicker>

  </div>
</template>

<script>
import {TMap} from './../utils/TMap'

import VDistpicker from 'v-distpicker'


export default {
  name: 'HelloWorld',
  data () {
    return {
      key: 'IOHBZ-EV2R3-4BU3N-YEQN7-AQMYF-7XFF4',
      showMap:false,
      longitude:'',
      latitude:'',
      inputAddress:''
    }
  },
  mounted() {

    // this.getLocation();

    // this.getLocationData();

  },
  components: { VDistpicker },
  methods: {
    onSelected(data) {
      // alert(data.province + ' | ' + data.city + ' | ' + data.area)
      console.log(data)

      console.log(data.province.value+data.city.value+data.area.value)
    },
    async getLocation(val){
      var that = this;
      TMap('SW2BZ-4XWKJ-33XFV-KCWJY-KZHVJ-N5BFH').then(qq => {
          // var address = '深圳市中科大厦';
          var address = val;
          var geocoder = new qq.maps.Geocoder();
            //对指定地址进行解析  
            geocoder.getLocation(address);
            //设置服务请求成功的回调函数  
            geocoder.setComplete(function (result) {
                console.log(result);
                // 纬度
                var lat = result.detail.location.lat;
                // 经度
                var lng = result.detail.location.lng;

                console.log(lat);
                console.log(lng);
      
                console.log(that)
                that.longitude=lng;
                that.latitude=lat;

                that.drawMap(lat,lng);



                // var center = new qq.maps.LatLng(lat,lng);
                // console.log(center)
                // var map = new qq.maps.Map(document.getElementById('container'),{
                //     center: center,
                //     zoom: 13
                // });
                // var marker = new qq.maps.Marker({
                //     position: center,
                //     draggable: true,
                //     map: map
                // });



            });
            //若服务请求失败，则运行以下函数  
            geocoder.setError(function () {
                alert("出错了，请输入正确的地址！！！如：某市某地面");
            });

      });
    },
    async getLocation1(val){
      var that = this;
      TMap('SW2BZ-4XWKJ-33XFV-KCWJY-KZHVJ-N5BFH').then(qq => {
          // var address = '深圳市中科大厦';
          var address = val;
          var geocoder = new qq.maps.Geocoder();
            //对指定地址进行解析  
            geocoder.getLocation(address);
            //设置服务请求成功的回调函数  
            geocoder.setComplete(function (result) {
                console.log(result);
                // 纬度
                var lat = result.detail.location.lat;
                // 经度
                var lng = result.detail.location.lng;

                console.log(lat);
                console.log(lng);
      
                console.log(that)
                that.longitude=lng;
                that.latitude=lat;

                //定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
                var map = new qq.maps.Map(document.getElementById("container"), {
                    center: new qq.maps.LatLng(lat, lng),      // 地图的中心地理坐标。
                    zoom: 14                                   // 地图的中心地理坐标。
                });
                // 在这个位置添加一个覆盖物
                var marker = new qq.maps.Marker({
                    position: new qq.maps.LatLng(lat, lng),
                    map: map
                });
                //  添加文本标注
                var label = new qq.maps.Label({
                    position: new qq.maps.LatLng(lat, lng),
                    // 这个位置文本标注位置偏移使用
                    offset: new qq.maps.Size(-100, -0),
                    map: map,
                    // content: '海淀区,西三环,广源闸5号广源大厦二层8222'
                    // content: '深圳市中科大厦'
                    content: val
                });

                // //点击Marker会弹出反查结果
                // qq.maps.event.addListener(marker, 'click', function() {
                //     alert("坐标地址为： " + result.detail.location);
                // });

                //添加监听事件   获取鼠标单击事件
                qq.maps.event.addListener(map, 'click', function(event) {
                  console.log(event.latLng)
                  let marker=new qq.maps.Marker({
                    position:event.latLng, 
                    map:map
                  });    
                  qq.maps.event.addListener(map, 'click', function(event) {
                        marker.setMap(null);      
                  });

                  //点击Marker会弹出反查结果
                  qq.maps.event.addListener(marker, 'click', function() {
                      // alert("坐标地址为： " + result.detail.location);
                      console.log('坐标地址更新为：')
                      // 纬度
                      let lat = event.latLng.lat;
                      // 经度
                      let lng = event.latLng.lng;
                      console.log(lat);
                      console.log(lng);

                      //定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
                      var map = new qq.maps.Map(document.getElementById("container"), {
                          center: new qq.maps.LatLng(lat, lng),      // 地图的中心地理坐标。
                          zoom: 14                                   // 地图的中心地理坐标。
                      });
                      // 在这个位置添加一个覆盖物
                      var marker = new qq.maps.Marker({
                          position: new qq.maps.LatLng(lat, lng),
                          map: map
                      });

                      that.longitude=lng;
                      that.latitude=lat;
                  });
                });

            });
            //若服务请求失败，则运行以下函数  
            geocoder.setError(function () {
                alert("出错了，请输入正确的地址！！！如：某市某地面");
            });

      });
    },
    getUserLocation(){
      console.log(this.inputAddress)
      
      this.getLocation(this.inputAddress)
      this.showMap = true;
    },

    getClickLocation(){
      console.log('点击地图啦')
    },
    getLocationData(){
      this.$http.get('http://xuexi-mgmt-dev.fsstudy.com/stat/getChannelStat?channel_name=&page=1&token=2and1543992763').then(res => {
        console.log(res.data)
      }).catch(err => {
        console.log(err)
      })
    },


    drawMap(lat,lng){
      var that = this;

      that.longitude=lng;
      that.latitude=lat;

      let address = this.inputAddress;

      //定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
      var map = new qq.maps.Map(document.getElementById("container"), {
          center: new qq.maps.LatLng(lat, lng),      // 地图的中心地理坐标。
          zoom: 14                                   // 地图的中心地理坐标。
      });
      // 在这个位置添加一个覆盖物
      var marker = new qq.maps.Marker({
          position: new qq.maps.LatLng(lat, lng),
          // draggable: true,
          map: map
      });
      //  添加文本标注
      var label = new qq.maps.Label({
          position: new qq.maps.LatLng(lat, lng),
          // 这个位置文本标注位置偏移使用
          offset: new qq.maps.Size(-100, -0),
          map: map,
          // content: '海淀区,西三环,广源闸5号广源大厦二层8222'
          content: address
      });

      // 标注拖拽事件：
      marker.setDraggable(true);

      //设置Marker停止拖动事件
      qq.maps.event.addListener(marker, 'dragend', function(event) {
          // console.log(event.latLng)
          // console.log(marker.getPosition())
      
          console.log('坐标地址更新为：')
          // 纬度
          let lat = event.latLng.lat;
          // 经度
          let lng = event.latLng.lng;
          console.log(lat);
          console.log(lng);
          that.longitude=lng;
          that.latitude=lat;
      });


     

      // //添加监听事件   获取鼠标单击事件
      // qq.maps.event.addListener(map, 'click', function(event) {
      //   console.log(event.latLng)
      //   let marker=new qq.maps.Marker({
      //     position:event.latLng, 
      //     map:map
      //   });    
      //   // qq.maps.event.addListener(map, 'click', function(event) {
      //   //       marker.setMap(null);      
      //   // });

      //   //点击Marker会弹出反查结果
      //   qq.maps.event.addListener(marker, 'click', function() {
      //       // alert("坐标地址为： " + result.detail.location);
      //       console.log('坐标地址更新为：')
      //       // 纬度
      //       let lat = event.latLng.lat;
      //       // 经度
      //       let lng = event.latLng.lng;
      //       console.log(lat);
      //       console.log(lng);

      //       console.log(this);

      //       that.drawMap(lat,lng)
      //   });
      // });

    }


  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.map-main{
  width:100%;
  height:400px;
  overflow-y: auto;
}
#container {
    width:100%;
    height:100%;
}
</style>
