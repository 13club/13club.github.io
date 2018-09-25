<?php
   public function hotGoods(){
       $callback = $_REQUEST['callback'];
       $result = ['code'=>'200','msg'=>"success",'data'=>"热门数据"];
       echo $callback.'('.json_encode($result).')';
   }
