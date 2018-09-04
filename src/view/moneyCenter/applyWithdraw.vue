
<template>
	<Card>
            <p slot="title">
                <!-- <Icon type="person"></Icon> -->
                申请提现
            </p>
            <div style="width:87vw">
          
           
		    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">
              
		        <FormItem label="提现金额：" prop="withdrawMoney">
		            <Input size="large" v-model="formValidate.withdrawMoney" placeholder="Enter your name"></Input>
                <div>可提现的余额为：{{userData.balance}}元</div>
		        </FormItem>
               
                <FormItem label="银行名：" prop="bankName">
                    <Input size="large" v-model="formValidate.bankName" placeholder="请输入银行卡帐号的银行名"></Input>
                </FormItem>
                
                <!--  <FormItem label="银行地址：" prop="bankAddress">
                    <Input v-model="formValidate.bankAddress" placeholder="Enter your e-mail"></Input>
                </FormItem> -->

                 <FormItem label="银行卡号：" prop="bankCard">
                    <Input size="large"  v-model="formValidate.bankCard" placeholder="请输入银行卡号"></Input>
                </FormItem>
                    <FormItem label="户名：" prop="bankUserName">
                    <Input size="large" v-model="formValidate.bankUserName" placeholder="银行卡户名"></Input>
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
         <Button long type="primary" size="large" @click="handleSubmit('formValidate')">提交</Button>
		</div>
        
         <Modal
            v-model="modal6"
            title="提现提交成功"
            :loading="loading"
            @on-ok="asyncOK">
            <p>提现提交成功，请耐心等待处理</p>
        </Modal>
        <Modal
          v-model="confimInfo"
             :closable='false'
             :mask-closable='false'
          title="确认你的信息"
          :loading="confimInfoLoading"
          @on-ok="confimInfoAsyncOK">
          <div style="font-size:15pt;">
            
        
              <p style="color:red;font-size:15pt;">请确认你的信息无误，这将影响到你的金钱能否成功转入你的银行帐户中</p>
              <div>提现金额：{{formValidate.withdrawMoney}}</div>
              <div>银行名： {{formValidate.bankName}}</div>
              <div>银行卡号： {{formValidate.bankCard}}</div>
              <div>银行户名： {{formValidate.bankUserName}}</div>
            </div>
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
                }else if(value<100){
                    callback(new Error('提现金额要100以上'));
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
                    withdrawMoney:0,
                    bankName:'',
                    bankAddress:'',
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
                ruleValidate: {
                   
                    withdrawMoney: [
                           {required: true, message: '金额不能为空', trigger: 'blur'},
                           {validator: validateMoney, trigger: 'blur'}
                    ],
                    bankName: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                     bankAddress: [
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
                       this.errorMessage="";
                      if(this.identifyCodeInput!=this.identifyCode){
                           this.errorMessage="请输入正确的验证码";
                          return;
                      }
                      
                      if(confim==null){
                        this.confimInfo = true;
                        return;
                      }
                      this.identifyCodeInput='';
                      this.refreshCode();
                      


                      this.$http.post("/withdraw/save",this.formValidate).then(response=> {
                    
                                var data = response.data;
                                if(data.code == 0) {
                                  this.modal6=true;
                                    this.$Notice.success({
                                          title: "提现申请成功"
                                      });
                                }else{
                                  this.$Message.error('不能有空!');
                                }
                                this.btnloading = false;

                          }).catch(function (error) {
                            //接口失败，也就是state不是200的时候，走这里
                            // this.$Message.error('Fail!');
                          });

                      
                  } else {
                     
                  }
              })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            confimInfoAsyncOK(){
               this.handleSubmit ('formValidate',true)
               this.userData.balance = this.userData.balance - this.formValidate.withdrawMoney;
            },
            asyncOK () {
                this.modal6 = false;
                
            },
            getUserInfo(){
                   this.$http.post("/user/getUserInfo").then(response=> {
                          var data = response.data;
                          if(data.code == 0) {
                                this.userData = data.result;
                                this.formValidate.bankAddress = this.userData.bankAddress;
                                this.formValidate.bankCard =this.userData.bankCard;
                                 this.formValidate.bankUserName= this.userData.bankUserName;
                                 this.formValidate.bankName= this.userData.bankName;
                                 this.formValidate.bankUserName = this.userData.userName
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