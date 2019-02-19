
export interface chpterM {
    cid?: number
    ch_id?: number
    ch_no: number
    title: string
    content: string
    title_img: string
    is_free: number
    is_free_temp: boolean
    is_member_free: number
}

export interface courseM {
    cid?: number                        //课程id
    tid?: number                        //讲师id
    ctime?: string                      //创建时间
    channel?: number                    //渠道号
    ttags?: string                      //讲师标签 
    categoryName?: string               //分类名称

    title: string                       //课程标题
    slogo: string                       //课程简介
    chapterlist: chpterM[]               //课程目录
    category: string                     //课程分类
    price: string                        //收费标准
    scale: string                        //分成比例
    title_img: string                    //封面图
    listenannex: string                  //介绍附件
    intro: string                        //课程详情
    intro_img: {
        no: number
        img: string
        name: string
    }[]                                  //课程详情图
    tname: string                        //讲师名称
    tintro: string                       //讲师介绍
    head_img_url: string                 //讲师图片
    tags: string[]                       //课程标签
    status: number                       //状态
    provider_id?:string                   //课程来源id
    is_one_line_city?:number,             //是否为一线城市 0---默认，非一线城市；1---一线城市；2---全部
    sex?:number                           //性别 0---默认，未知；1：男；2：女；3,：全部
    weights?:number |string               //权重
    content: string //课程详情
    is_can_use_coupon: number
}

export interface fileListM {
    name: string
    url: string
}