<template>
<div style="width:200px">
<div style="height:10vh;font-size:30px;color:#fff">
        logo
    </div>
         <Menu theme="dark" width="auto" :open-names="['1']" accordion @on-select="menuClick">
         <Submenu v-for="(item,index) in menuData" :name="index" :key="index">
             <template slot="title">
              <Icon :type="item.icon"></Icon>
                {{item.name}}
            </template>
              <router-link   v-for="(c,index2) in item.children"  :key="index2" :to="c.path">
                     <MenuItem    :name="index + '-' + index2">{{c.name}}</MenuItem>
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
                                path:"/memberCenter/addAgent"
                            },
                            {
                                name:'推荐结构',
                                path:"/memberCenter/recommendedStructure"
                            },
                            {
                                name:'安置结构',
                                path:"/memberCenter/treeStructure"
                            }
                        ]
                    },
                    {
                        name:'财务中心',
                        icon:'cash',
                        children:[
                            {
                                path:"/moneyCenter/applyWithdraw",
                                name:"申请提现"
                            },
                             {
                                path:"/moneyCenter/bonus",
                                name:"奖金记录"
                            },
                             {
                                path:"/moneyCenter/integral",
                                name:"积分记录"
                            },
                             {
                                path:"/moneyCenter/withdraw",
                                name:"提现记录"
                            }
                        ]
                    },
                    {
                        name:'报单中心',
                        icon:'soup-can',
                        children:[
                            {
                                path:"/applyGoods/apply",
                                name:"申请报单"
                            },
                             {
                                path:"/applyGoods/userApplyList",
                                name:"报单记录"
                            } 
                        ]
                    },
                     {
                        name:'个人中心',
                        icon:'ios-person',
                        children:[
                           {
                                path:"/home",
                                name:"回到首页"
                            },
                            {
                                path:"/userCenter/ownspace",
                                name:"我的资料"
                            },
                             {
                                path:"/login",
                                name:"重新登录"
                            } 
                        ]
                    }  
                ]
            }
        },
        methods:{
            menuClick(){
               
                this.$emit('menuClick')
            }
        }
    }
</script>