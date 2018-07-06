<template>
   <div style="width:80vw;margin:0 auto;padding-top:20vh">
   		  <Card :bordered="false">
                <p slot="title">欢迎使用</p>
              
       		 <Form ref="formInline" :model="formInline" :rules="ruleInline">
    	        <FormItem prop="account">
    	            <Input type="text" v-model="formInline.account" placeholder="用户名">
    	                <Icon type="ios-person-outline" slot="prepend"></Icon>
    	            </Input>
    	        </FormItem>
    	        <FormItem prop="password">
    	            <Input type="password" v-model="formInline.password" placeholder="密码">
    	                <Icon type="ios-locked-outline" slot="prepend"></Icon>
    	            </Input>
    	        </FormItem>
                <FormItem prop="identifyCode">
                    <Input  v-model="identifyCodeInput" placeholder="验证码">
                        <!-- <div  slot="prepend">验证码</div> -->
                   
                    <div @click="refreshCode" slot="append"  >
                            <s-identify :identifyCode="identifyCode"></s-identify>
                    </div>
                     </Input>
                </FormItem>
                <div style="color:red">{{errorMessage}}</div>
    	        <FormItem>
    	            <Button type="primary" :loading="logining" @click="handleSubmit('formInline')" long>登录 </Button>
    	        </FormItem>
    	    </Form>
        
        </Card>
   </div>
</template>
<script>
import Cookies from 'js-cookie';
import SIdentify from './identifyCode/identify.vue'
    export default {
         components:{
            SIdentify
          },
        data () {
            return {
                 identifyCodes: "1234567890",
                identifyCode: "1234",
                identifyCodeInput:'',
                formInline: {
                    account: '',
                    password: ''
                },
                logining:false,
                errorMessage:"",
                ruleInline: {
                    account: [
                        { required: true, message: '请输入你的帐号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入你的密码', trigger: 'blur' },
                        { type: 'string', min: 3, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted() {
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
          },
        methods: {
            handleSubmit(name) {
                this.errorMessage="";
                if(this.identifyCodeInput!=this.identifyCode){
                     this.errorMessage="请输入正确的验证码";
                    return;
                }
                this.refreshCode();
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        	this.logining=true;
		                    this.$http.post('/user/login',this.formInline)
		                    .then(response=> {
		                      //如果接口走成功就执行这里
		                      // console.log(JSON.stringify(response));
		                      var data = response.data;
		                      if(data.code == 0) {
		                        this.loginSuccess();
		                      }else {
		                        this.errorMessage=data.message;
		                      }
		                      this.logining=false;

		                    }).catch(error=> {
		                        this.errorMessage="网络连接错误";
		                        this.logining=false;
		                    });
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            loginSuccess(){
               
                Cookies.set('user', this.formInline.account);
                Cookies.set('account',this.formInline.account);
                // Cookies.set('password', this.formInline.password);
                 // console.log("ss")
                // if (this.form.userName === 'iview_admin') {
                //     Cookies.set('access', 0);
                // } else {
                //     Cookies.set('access', 1);
                // }
                this.$router.push({
                    name: 'Home'
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
