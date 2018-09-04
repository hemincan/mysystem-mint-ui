<!-- 创建代理页面 -->
<template>
	<Card>
            <p slot="title">
               <!--  <Icon type="person"></Icon> -->
                申请报单
            </p>
            <div style="width:87vw">
          
           
		    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">
                <!-- {{formValidate.agentTypeId}} -->

               <FormItem label="货品类型：" prop="agentTypeId">
                    <Select size="large" v-model="formValidate.agentTypeId" placeholder="Select your city">
                         <Option v-for="item in agentType" :value="item.id" :key="item.id">{{item.name}}({{item.remark}} )</Option>
                  
                    </Select>
               </FormItem>
		        <FormItem label="用户姓名：" prop="receiverName">
		            <Input size="large" v-model="formValidate.receiverName" placeholder="Enter your name"></Input>
		        </FormItem>
               
                <FormItem label="手机号码：" prop="receiverPhone">
                    <Input size="large" v-model="formValidate.receiverPhone" placeholder="Enter your e-mail"></Input>
                </FormItem>
                
                 <FormItem label="收货地址：" prop="receiverAddress">
                    <Input size="large" v-model="formValidate.receiverAddress" placeholder="Enter your e-mail"></Input>
                </FormItem>
                <FormItem label="验证码：" prop="identifyCode">
                    <Input size="large" v-model="identifyCodeInput" placeholder="验证码">
                        <!-- <div  slot="prepend">验证码</div> -->
                   
                    <div @click="refreshCode" slot="append"  >
                            <s-identify :identifyCode="identifyCode"></s-identify>
                    </div>

                     </Input>
                     <div style="color:red">{{errorMessage}}</div>
                </FormItem>
                 
		       <!--  <FormItem>
		           
		            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
		        </FormItem> -->
		    </Form>
         <Button type="primary" long size="large" :loading="loading" @click="handleSubmit('formValidate')">提交</Button>
		</div>
        
         <Modal
            v-model="modal6"
            :closable='false'
             :mask-closable='false'
            @on-ok="asyncOK">
            <p style="font-size:14pt;">提交报单申请成功！请联系管理员并耐心等待处理。</p>
        </Modal>

	</Card>
</template>
<script>
import Cookies from 'js-cookie';
import SIdentify from '../identifyCode/identify.vue'
    export default {
      components:{
            SIdentify
          },
        data () {

            return {
                identifyCodes: "1234567890",
                identifyCode: "1234",
                identifyCodeInput:'',
                errorMessage:'',
                formValidate: {
                    agentTypeId:1,
                    receiverAddress:'',
                    receiverName:'',
                    receiverPhone:''
                
                },
                userData:{},
                showPosition:false,
                modal6: false,
                loading: false,
                newUserAccountNumber:'',
                agentType:[],
                ruleValidate: {
                   
                    receiverName: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    receiverPhone: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' }
                    ],
                     receiverAddress: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted(){
           
            this.findAgentType();
            this.getUserInfo();
            this.refreshCode();
        },
        methods: {
            handleSubmit (name) {
                this.errorMessage="";
                if(this.identifyCodeInput!=this.identifyCode){
                     this.errorMessage="请输入正确的验证码";
                    return;
                }
                this.identifyCodeInput='';
                this.refreshCode();
                this.$refs[name].validate((valid) => {
                    if (valid) {
                      this.loading = true;
                        this.$http.post("/applyGoods/save",this.formValidate).then(response=> {
                      
                                  var data = response.data;
                                  if(data.code == 0) {
                                      this.$Notice.success({
                                            title: "报单申请成功"
                                        });
                                      this.newUserAccountNumber=data.result.accountNumber;
                                      this.modal6=true;
                                  }else{
                                    this.$Message.error(data.message);
                                  }
                                  this.loading = false;

                            }).catch(function (error) {
                              //接口失败，也就是state不是200的时候，走这里
                              // this.$Message.error('Fail!');
                            });

                        
                    } else {
                        this.$Message.error('不能有空');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            asyncOK () {
                this.modal6 = false;
                
            },
            findAgentType(){
                this.$http.get("/agentType/findPage?pageIndex=0&pageSize=100000").then(response=> {
                      var data = response.data;
                      this.agentType=data.result.result;
                })
            },
            getUserInfo(){
                   this.$http.post("/user/getUserInfo").then(response=> {
                          var data = response.data;
                          if(data.code == 0) {
                                this.userData = data.result;
                                this.formValidate.receiverAddress = this.userData.address;
                                this.formValidate.receiverName = this.userData.userName;
                                this.formValidate.receiverPhone =this.userData.phone;
                           
                          }else{
                              
                          }

                    }).catch(function (error) {
                      //接口失败，也就是state不是200的时候，走这里
                    });
            },
            randomNum(min, max) {
              return Math.floor(Math.random() * (max - min) + min);
            },
            refreshCode() {
              this.identifyCode = "";
              this.makeCode(this.identifyCodes, 4);
            },
            makeCode(o, l) {
              for (let i = 0; i < l; i++) {
                this.identifyCode += this.identifyCodes[
                  this.randomNum(0, this.identifyCodes.length)
                ];
              }
              // console.log(this.identifyCode);
            }
        }
    }
</script>