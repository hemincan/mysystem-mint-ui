<template>
<div style="width:auto">
	<div>
      <div class="shawow-class" style="background:#fff;margin-bottom:10px;padding:20px;">
		    <center>
         <Avatar shape="square" icon="person" size="large"  />
            <br>
            <div style="font-size: 15pt;">{{userForm.userName}}({{userForm.accountNumber}})</div>
        </center>
        </div>
        <!--  <card :header="{title: '登录信息'}" style="width:100%;">
              <div slot="content" class="card-demo-flex card-demo-content01">
                  您于：{{userForm.lastLoginTime}}登录 ，如不是你本人操作，请及时修改密码。
              </div>
          </card> -->
          <div class="shawow-class">
         <card :header="{title: '基本信息'}" style="width:100%;">
              <div slot="content" class="card-demo-flex card-demo-content01" >
                <div class="vux-1px-r" style="font-size: 12pt;">
                  <span>{{userForm.balance}}元</span>
                  <br/>
                  帐户余额
                </div>
                 <div class="vux-1px-r" style="font-size: 12pt;">
                  <span>{{userForm.leftPerformance}}</span>
                  <br/>
                  左区绩效
                </div>

                 <div class="vux-1px-r" style="font-size: 12pt;">
                  <span>{{userForm.rightPerformance}}</span>
                  <br/>
                  右区绩效
                </div>

                 <div class="vux-1px-r" style="font-size: 12pt;">
                  <span>{{agentType.name}}</span>
                  <br/>
                  代理类型
                </div>

              </div>

        </card>
        </div>
       <!--  <card :header="{title: '消息'}" style="width:100%;">
</card> -->
            <div style="margin:5px;0px;5px;0px;font-size:12pt;font-weight:800;">
                 消息
            </div>
            <div slot="content"  >
                <div >
                
                  <div v-for="item in message" class="message-item shawow-class" @click="itemClick(item)" >
                      <div style="font-weight:500;font-size:12pt;" >系统消息&nbsp;&nbsp;
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
  position: relative;
  padding: 5px 25px 5px 15px;
  background: #fff;
  margin-top:10px;
  height: 130px; 

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
  bottom: 0px;
  left: 20px;
  position: absolute;
}

</style>