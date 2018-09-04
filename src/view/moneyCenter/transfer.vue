
<template>
	<Card>
            <p slot="title">
                <!-- <Icon type="person"></Icon> -->
                转帐
            </p>
            <div style="width:87vw">
          
           
		    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">
              
		        <FormItem label="转帐金额：" prop="amount">
		            <Input size="large" v-model="formValidate.amount" placeholder="Enter your name"></Input>
                <div>可转帐的余额为：{{userData.balance}}元</div>
		        </FormItem>
               
                <FormItem label="对方帐号：" prop="toUserAccount">
                    <Input size="large" v-model="formValidate.toUserAccount" placeholder="对方帐号"></Input>
                </FormItem>
                
                 <FormItem label="备注：" prop="mark">
                    <Input size="large" v-model="formValidate.mark" placeholder="请输入备注"></Input>
                </FormItem>

                <!--  <FormItem label="银行卡号：" prop="bankCard">
                    <Input v-model="formValidate.bankCard" placeholder="请输入银行卡号"></Input>
                </FormItem>
                    <FormItem label="户名：" prop="bankUserName">
                    <Input v-model="formValidate.bankUserName" placeholder="银行卡户名"></Input>
                </FormItem> -->
                <FormItem label="验证码：" prop="identifyCode">
                    <Input  size="large" v-model="identifyCodeInput" placeholder="验证码">
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
          <Button long type="primary" size="large" :loading="submitBtnLoading" @click="handleSubmit('formValidate')">提交</Button>
		</div>
        
         <Modal
            v-model="modal6"
            title="转帐已经成功"
            :mask-closable='false'
            :loading="loading"
            @on-ok="asyncOK">
            <p>转帐已经成功</p>
        </Modal>
        <Modal
          v-model="confimInfo"
          :mask-closable='false'
          title="确认你的信息"
          :loading="confimInfoLoading"
          @on-ok="confimInfoAsyncOK">
         <!--  <p style="color:red;font-size:15pt;">请确认你的信息无误，点击确认进行转帐</p> -->
          <div>转帐金额：{{formValidate.amount}}</div>
          <div>转入帐户： {{formValidate.toUserAccount}}</div>
          <div style="color:red;font-size:15pt;">转入用户名： {{toUserName}}</div>
          <div>确认信息无误请点确认提交</div>
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
          const validateMoney = (rule, value, callback) => {
               
                if (!Number.isInteger(+value)) {
                    callback(new Error('请输入数字值'));
                } else {
                    callback();
                }
            };
            return {
               identifyCodes: "1234567890",
                identifyCode: "1234",
                identifyCodeInput:'',
                errorMessage:'',
                formValidate: {
                    amount:0,
                    toUserAccount:'',
                    mark:'',
                    bankCard:'',
                    bankUserName:''
                },
                modal6:false,
                userData:[],
                loading: true,
                ////
                confimInfo:false,
                confimInfoLoading:false,
                ///
                toUserName:"",
                submitBtnLoading:false,
                ruleValidate: {
                   
                    amount: [
                           {required: true, message: '金额不能为空', trigger: 'blur'},
                           {validator: validateMoney, trigger: 'blur'}
                    ],
                    toUserAccount: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                     mark: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                     bankCard: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                     bankUserName: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ]
                }
               
            } 
        },
        mounted(){
           
            this.getUserInfo();
            this.refreshCode();
        },
        methods: {
            handleSubmit (name,confim) {
              
              this.$refs[name].validate((valid) => {
                  if (valid) {
                    this.submitBtnLoading=true;
                       this.errorMessage="";
                      if(this.identifyCodeInput!=this.identifyCode){
                           this.errorMessage="请输入正确的验证码";
                          this.submitBtnLoading=false;
                          return;
                      }
                      
                      if(confim==null){
                        this.getToUserInfo();
                       

                        return;
                      }
                      this.identifyCodeInput='';
                      this.refreshCode();
                      
                      this.saveTransfer();
                     

                      
                  } else {
                     
                  }
              })
            },
            getToUserInfo(){

                 this.$http.post("/user/getUserName?userAccount="+this.formValidate.toUserAccount).then(response=> {
                      this.toUserName = response.data.result;
                      this.submitBtnLoading=false;
                       this.confimInfo = true;
                  });
            },
            saveTransfer(){
                 this.$http.post("/transfer/save",this.formValidate).then(response=> {
                    
                                var data = response.data;
                                if(data.code == 0) {
                                  this.modal6=true;
                                    this.$Notice.success({
                                          title: "转帐成功"
                                      });
                                        this.userData.balance = this.userData.balance - this.formValidate.amount;
                                       if(this.userData.balance<0){
                                        this.userData.balance=0;
                                       }
                                }else{
                                  // this.$Message.error('不能有空!');
                                }
                                this.submitBtnLoading = false;

                          }).catch(function (error) {
                            //接口失败，也就是state不是200的时候，走这里
                            // this.$Message.error('Fail!');
                          });
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            confimInfoAsyncOK(){
               this.handleSubmit ('formValidate',true)

            },
            asyncOK () {
                this.modal6 = false;
                
            },
            getUserInfo(){
                   this.$http.post("/user/getUserInfo").then(response=> {
                          var data = response.data;
                          if(data.code == 0) {
                                this.userData = data.result;
                                
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