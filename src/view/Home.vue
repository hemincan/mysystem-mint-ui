<template>
<div style="width:auto">
	<div>
		    <center> <Avatar shape="square" icon="person" size="large" />
            <br>{{userForm.userName}}({{userForm.accountNumber}})
        </center>
        <!--  <card :header="{title: '登录信息'}" style="width:100%;">
              <div slot="content" class="card-demo-flex card-demo-content01">
                  您于：{{userForm.lastLoginTime}}登录 ，如不是你本人操作，请及时修改密码。
              </div>
          </card> -->
         <card :header="{title: '基本信息'}" style="width:100%;">
              <div slot="content" class="card-demo-flex card-demo-content01">
                <div class="vux-1px-r">
                  <span>{{userForm.balance}}元</span>
                  <br/>
                  帐户余额
                </div>
                 <div class="vux-1px-r">
                  <span>{{userForm.leftPerformance}}</span>
                  <br/>
                  左区绩效
                </div>

                 <div class="vux-1px-r">
                  <span>{{userForm.rightPerformance}}</span>
                  <br/>
                  右区绩效
                </div>

                 <div class="vux-1px-r">
                  <span>{{agentType.name}}</span>
                  <br/>
                  代理类型
                </div>

              </div>

        </card>
        <card :header="{title: '消息'}" style="width:100%;">

            <div slot="content" class="card-demo-content01" style=" background: #fff;">
                <div style="background: #f0f0f0;">
                  
                  
                  <div v-for="item in message" class="message-item" @click="itemClick(item)" >
                      <div style="font-weight:800" >系统消息&nbsp;&nbsp;
                      <badge v-if="!item.readed" text="未读"></badge></div>
                      <div class="message-item-content">{{item.content}}</div>
                      <div class="message-item-time">{{item.receiveDate}}</div>
                  </div>
                
                </div>
              <!--   <div class="message-item">
                    <div>标题</div>
                    <div class="message-item-content">内容</div>
                </div> -->
            </div>
        </card>
	</div>
        
    </div>
</template>
<script>
import { Card,Badge } from 'vux'
    export default {
        components: {
            Card,
            Badge
        },
        data (){
            return {
                agentType:[],
                userForm:[],
                message:[]
            }
        },
        mounted(){
            this.init();
            this.findMessage();
        },
        methods:{
             findAgentType(){
                this.$http.get("/agentType/get?id="+this.userForm.agentTypeId).then(response=> {
                      var data = response.data;
                      this.agentType=data.result;
                })
            },
            findMessage(){
                this.$http.get("/message/findPage?pageIndex="+0+"&pageSize="+20+"&orderBy=id desc").then(response=> {
                      var data = response.data;
                      this.message=data.result.result;
                      // this.pageData.totalCount=data.result.totalCount;
                      // this.pageData.totalPages = data.result.totalPages;
                })
            },
            init(){
                   this.$http.post("/user/getUserInfo",{
                    }).then(response=> {
                          var data = response.data;
                          if(data.code == 0) {
                                this.userForm = data.result;
                                 this.findAgentType();
                          }else{
                              
                          }

                    }).catch(function (error) {
                      //接口失败，也就是state不是200的时候，走这里
                    });
            },
            itemClick(item){
              this.$router.push({
                path:'userCenter/messageDetail',
                query: { 
                  id:item.id,
                }
              })
            }
        }
    }
</script>
<style scoped >
.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
 
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.card-demo-flex span {
  color: #f74c31;
}
.message-item{
  padding: 5px 15px 5px 15px;
  background: #fff;
  margin-top:5px; 


}
.message-item-content{
  color: #111;
  padding: 10px;
  overflow:hidden; 

text-overflow:ellipsis;

display:-webkit-box; 

-webkit-box-orient:vertical;

-webkit-line-clamp:2; 
}
.message-item:hover{
  background: #f0f0f0;
  }
.message-item-time{
  font-size: 13px;
}
</style>