<template>
<div style="width:auto">
	<div>
		<center> <Avatar shape="square" icon="person" size="large" />
            <br>{{userForm.userName}}({{userForm.accountNumber}})
        </center>
         <card :header="{title: '基本信息'}" style="width:96%;">
              <div slot="content" class="card-demo-flex card-demo-content01">
                <div class="vux-1px-r">
                  <span>{{userForm.balance}}</span>
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
	</div>
        
    </div>
</template>
<script>
import { Card } from 'vux'
    export default {
        components: {
            Card
        },
        data (){
            return {
                agentType:[],
                userForm:[]
            }
        },
        mounted(){
            this.init();
        },
        methods:{
             findAgentType(){
                this.$http.get("/agentType/get?id="+this.userForm.agentTypeId).then(response=> {
                      var data = response.data;
                      this.agentType=data.result;
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
</style>