import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/view/Home.vue'
import Login from '@/view/Login.vue'
import App from '@/view/Main.vue'
import addAgent from  '@/view/memberCenter/addAgent'
import recommendedStructure from  '@/view/memberCenter/recommendedStructure'
import treeStructure from  '@/view/memberCenter/treeStructure'

import applyWithdraw from  '@/view/moneyCenter/applyWithdraw'
import bonus from  '@/view/moneyCenter/bonus'
import integral from  '@/view/moneyCenter/integral'
import withdraw from  '@/view/moneyCenter/withdraw'
import transfer from  '@/view/moneyCenter/transfer'
import transferList from  '@/view/moneyCenter/transferList'


import apply from  '@/view/applyGoods/apply'
import userApplyList from  '@/view/applyGoods/userApplyList'

import ownspace from  '@/view/userCenter/own-space'
import alertPassword from  '@/view/userCenter/alertPassword'
import messageDetail from  '@/view/userCenter/messageDetail'

import identfyTest from  '@/view/identifyCode/identfyTest'

Vue.use(Router)

export default new Router({
  // mode:"history",
  base: '/app/',
  routes: [
    {
      path: '/login',
      name:'login',
      component: Login // 登录页面
    },
     {
            path: '/',
            name: 'login2',
            component: Login
    },
    // 验证码测试的页面
    {
      path: '/identifytest',
      name: 'identifytest',
      component: identfyTest
    },
    {
      path: '',
      component: App, // 原来的 App.vue
      children:[
        
           {
            path: '/home',
            name: 'Home',
            component: Home
          },

            {
            path: '/userCenter/ownspace',
            name: 'ownspace',
            component: ownspace
          },
            {
            path: '/userCenter/alertPassword',
            name: 'alertPassword',
            component: alertPassword
          },
           {
            path: '/userCenter/messageDetail',
            name: 'messageDetail',
            component: messageDetail
          },

          {
            path: '/memberCenter/addAgent',
            name: 'addAgent',
            component: addAgent
          },
          {
            path: '/memberCenter/recommendedStructure',
            name: 'recommendedStructure',
            component: recommendedStructure
          },
          {
            path: '/memberCenter/treeStructure',
            name: 'treeStructure',
            component: treeStructure
          },


          {
            path: '/moneyCenter/applyWithdraw',
            name: 'applyWithdraw',
            component: applyWithdraw
          },
          {
            path: '/moneyCenter/bonus',
            name: 'bonus',
            component: bonus
          },
          {
            path: '/moneyCenter/integral',
            name: 'integral',
            component: integral
          },
          {
            path: '/moneyCenter/withdraw',
            name: 'withdraw',
            component: withdraw
          },
           {
            path: '/moneyCenter/transfer',
            name: 'transfer',
            component: transfer
          },
           {
            path: '/moneyCenter/transferList',
            name: 'transferList',
            component: transferList
          },

          {
            path: '/applyGoods/apply',
            name: 'apply',
            component: apply
          },
          {
            path: '/applyGoods/userApplyList',
            name: 'userApplyList',
            component: userApplyList
          }
      ]

    }

  ]
})
