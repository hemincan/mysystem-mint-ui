<template>
<div :style="{backgroundImage: 'url(' + img + ')' }" style="background-size: cover;height:100vh;background-position:center;">
    

   <div style="width:80vw;margin:0 auto;padding-top:20vh;" >

        <!--  <div style="width:200px;">
           <img width="100%" src="../assets/logo2.png">
        </div> -->
   		  <Card :bordered="false" >
                <p slot="title" style="font-size:13pt;">欢迎使用</p>
               
       		 <Form ref="formInline" :model="formInline" :rules="ruleInline">
    	        <FormItem prop="account">
    	            <Input style="font-size:16pt;"  type="text" size="large"  v-model="formInline.account" placeholder="用户名">
    	                <Icon type="ios-person-outline" slot="prepend"></Icon>
    	            </Input>
    	        </FormItem>
    	        <FormItem prop="password">
    	            <Input style="font-size:16pt;" type="password" size="large" v-model="formInline.password" placeholder="密码">
    	                <Icon type="ios-locked-outline" slot="prepend"></Icon>
    	            </Input>
    	        </FormItem>
                 <FormItem >
                        <Checkbox style="font-size:12pt;" v-model="rememberMe">记住我的帐号与密码</Checkbox>
                </FormItem>

                <!-- <FormItem prop="identifyCode">
                    <Input  v-model="identifyCodeInput" placeholder="验证码">
                       
                   
                    <div @click="refreshCode" slot="append"  >
                            <s-identify :identifyCode="identifyCode"></s-identify>
                    </div>
                     </Input>
                </FormItem> -->
                <div style="color:red">{{errorMessage}}</div>
    	        <FormItem>
    	            <Button type="primary" :loading="logining" @click="handleSubmit('formInline')" long style="height:40px;font-size:13pt">登录 </Button>
    	        </FormItem>
    	    </Form>
        
        </Card>
   </div>
   </div>
</template>
<script>
import Img from '@/assets/login_bg.jpg'
import Cookies from 'js-cookie';
import SIdentify from './identifyCode/identify.vue'
    export default {
         components:{
            SIdentify
          },
        data () {
            return {
                img: "https://open.saintic.com/api/bingPic/",//必应每日壁纸
                 identifyCodes: "1234567890",
                identifyCode: "1234",
                identifyCodeInput:'',
                formInline: {
                    account: '',
                    password: ''
                },
                logining:false,
                rememberMe:true,
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
            this.GetCookie();
          },
        methods: {
            handleSubmit(name) {
                this.errorMessage="";
                // if(this.identifyCodeInput!=this.identifyCode){
                //      this.errorMessage="请输入正确的验证码";
                //     return;
                // }
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
                                if(this.rememberMe){
                                    this.SetCookie(this.formInline.account,this.formInline.password);
                                }
                                
		                        this.loginSuccess();
		                      }else {
		                        this.errorMessage=data.message;
		                      }
		                      this.logining=false;

		                    }).catch(error=> {
                                // console.log(error)
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
            },
            SetCookie(username, password) {
                var Then = new Date();
                Then.setTime(Then.getTime() + 1866240000000);
                document.cookie = "username=" + username + "%%" + password + ";expires=" + Then.toGMTString();
            },
     
            GetCookie() {
                var nmpsd;
                var nm;
                var psd;
                var cookieString = new String(document.cookie);
                var cookieHeader = "username=";
                var beginPosition = cookieString.indexOf(cookieHeader);
                cookieString = cookieString.substring(beginPosition);
                var ends = cookieString.indexOf(";");
                if (ends != -1) {
                    cookieString = cookieString.substring(0, ends);
                }
                if (beginPosition > -1) {
                    nmpsd = cookieString.substring(cookieHeader.length);
                    if (nmpsd != "") {
                        beginPosition = nmpsd.indexOf("%%");
                        nm = nmpsd.substring(0, beginPosition);
                        psd = nmpsd.substring(beginPosition + 2);
                        this.formInline.account=nm;
                        this.formInline.password=psd;
                        // document.getElementById('username').value = nm;
                        // document.getElementById('password').value = psd;
                        if (nm != "" && psd != "") {
                            // document.forms[0].checkbox.checked = true;
                            // document.getElementById('remember_password').checked = true;
                        }
                    }
                }
            }

        }
    }
</script>
