<?php
    header('Content-type:text/application/json;charset=utf-8;method = RequestMethod.POST');

    $data='{
        status:"0",
        message:"获取成功",
        list:[{
            0:"小米",
            1:"1200"
        },{
            0:"魅族",
            1:"2000"
        }]
    }';

    echo json_encode($data);//输出json数据


 