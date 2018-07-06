<template>
<div style="width:200px">
        <div style="padding-top:0px;height:100px;font-size:23px;color:#fff;width:100%;font-weight:900;background:#2d8cf0">
           <div style="position: absolute;left:16%;top:25px;"> 会员拓展系统 </div>
           <img width="100%" src="../assets/bg.jpg">
        </div>
         <Menu theme="dark" width="auto" :open-names="['1']" accordion @on-select="menuClick">
         <Submenu v-for="(item,index) in menuData" :name="index" :key="index">
             <template slot="title">
              <Icon style="width:15px" :type="item.icon"></Icon>
                {{item.name}}
            </template>
              <router-link   v-for="(c,index2) in item.children"  :key="index2" :to="c.path">
                     <MenuItem    :name="index + '-' + index2">
                            <Icon v-if="c.icon!=null" style="width:15px" :type="c.icon"></Icon>{{c.name}}</MenuItem>
            </router-link>
         </Submenu>

       <!--  <Submenu name="1">
            <template slot="title">
              <Icon type="person-stalker"></Icon>
                会员中心
            </template>
            <router-link to ="/memberCenter/addAgent">
                <MenuItem name="1-1">添加代理</MenuItem>
            </router-link>
            <router-link to ="/memberCenter/recommendedStructure">
                 <MenuItem name="1-2">推荐结构</MenuItem>
            </router-link>
            <router-link to ="/memberCenter/treeStructure">     
                <MenuItem name="1-3">安置结构</MenuItem>
            </router-link>
        </Submenu>
        <Submenu name="2">
            <template slot="title">
                <Icon type="cash"></Icon>
                财务中心
            </template>
            <router-link to ="/moneyCenter/applyWithdraw">
                <MenuItem name="2-1">申请提现</MenuItem>
            </router-link>
             <router-link to ="/moneyCenter/bonus">
                <MenuItem name="2-2">奖金记录</MenuItem>
            </router-link>
             <router-link to ="/moneyCenter/integral">
                <MenuItem name="2-3">积分记录</MenuItem>
            </router-link>
             <router-link to ="/moneyCenter/withdraw">
                <MenuItem name="2-4">提现记录</MenuItem>
            </router-link>
        </Submenu>
        <Submenu name="3">
            <template slot="title">
               <Icon type="soup-can"></Icon>
                报单中心
            </template>
            <router-link to ="/applyGoods/apply">
                <MenuItem name="3-1">申请报单</MenuItem>
            </router-link>
             <router-link to ="/applyGoods/userApplyList">
                <MenuItem name="3-2">报单记录</MenuItem>
            </router-link>
        </Submenu>
         <Submenu name="4">
            <template slot="title">
                <Icon type="ios-person"></Icon>
                个人中心
            </template>
            <router-link to ="/userCenter/ownspace">
                <MenuItem name="4-1">我的资料</MenuItem>
            </router-link>
              <router-link to ="/login">
                <MenuItem name="4-2">重新登录</MenuItem>
            </router-link>
        </Submenu> -->

    </Menu>
    <!-- <div style="background:#fff;position:absolute;bottom:10px;left:20%;">sdfdsafsd</div> -->
    </div>
</template>
<script>
    export default {
        data (){
            return {
                menuData:[
                    {
                        name:'会员中心',
                        icon:'person-stalker',
                        children:[
                            {
                                name:'添加代理',
                                path:"/memberCenter/addAgent",
                                icon:"plus"
                            },
                            {
                                name:'推荐结构',
                                path:"/memberCenter/recommendedStructure",
                                icon:"usb"
                            },
                            {
                                name:'安置结构',
                                path:"/memberCenter/treeStructure",
                                icon:"network"
                            }
                        ]
                    },
                    {
                        name:'财务中心',
                        icon:'cash',
                        children:[
                            {
                                path:"/moneyCenter/applyWithdraw",
                                name:"申请提现",
                                icon:'android-create'
                            },
                             {
                                path:"/moneyCenter/bonus",
                                name:"奖金记录",
                                icon:'social-yen'
                            },
                             {
                                path:"/moneyCenter/integral",
                                name:"积分记录",
                                icon:'social-euro-outline'
                            },
                             {
                                path:"/moneyCenter/withdraw",
                                name:"提现记录",
                                icon:'android-list'

                            },
                            {
                                path:"/moneyCenter/transfer",
                                name:"转帐",
                                icon:'shuffle'
                            } ,
                             {
                                path: '/moneyCenter/transferList',
                                name:"转帐记录",
                                icon:'clipboard'
                            } 
                        ]
                    },
                    {
                        name:'报单中心',
                        icon:'soup-can',
                        children:[
                            {
                                path:"/applyGoods/apply",
                                name:"申请报单",
                                icon:'android-create'
                            },
                             {
                                path:"/applyGoods/userApplyList",
                                name:"报单记录",
                                icon:'clipboard'
                            } 
                        ]
                    },
                     {
                        name:'个人中心',
                        icon:'ios-person',
                        children:[
                           {
                                path:"/home",
                                name:"回到首页",
                                icon:'home'
                            },
                            {
                                path:"/userCenter/ownspace",
                                name:"我的资料",
                                icon:'compose'
                            },
                            {
                                path:"/userCenter/alertPassword",
                                name:"修改密码",
                                icon:'pound'
                            },
                             {
                                path:"/login",
                                name:"重新登录",
                                icon:'android-exit'
                            } 
                        ]
                    }  
                ]
            }
        },
        methods:{
            menuClick(s){
                var ind = s.split("-");
                var menu = this.menuData[ind[0]].children[ind[1]];
                // console.log(menu)
                this.$emit('menuClick',menu)
            }
        }
    }
</script>