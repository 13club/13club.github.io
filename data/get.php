<?php
//    public function hotGoods(){
//        $callback = $_REQUEST['callback'];
//        $result = ['code'=>'200','msg'=>"success",'data'=>"热门数据"];
//        echo $callback.'('.json_encode($result).')';
//    }

  $data = array(
    'tid' => 100, 
    'name' => '标哥的技术博客',
    'site' => 'www.huangyibiao.com');
    
  $response = array(
    'code'  => 200, 
    'message' => 'success for request',
    'data'  => $data,
    );
   
  echojson_encode($response);