<!-- 创建代理页面 -->
<template>
	<Card width="90vw;">
            <p slot="title">
                <!-- <Icon type="person"></Icon> -->
                注册代理
            </p>
            <div style="width:87vw;font-size:16pt!important;">
		    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">
		        <FormItem label="用户姓名：" prop="userName">
		            <Input size="large" v-model="formValidate.userName" placeholder="用户姓名"></Input>
		        </FormItem>
                <FormItem  label="身份证号" prop="identityCard">
                    <Input size="large" v-model="formValidate.identityCard" placeholder="身份证号"></Input>
                </FormItem>
		        <FormItem label="用户密码：" prop="userPassword">
		            <Input  size="large" v-model="formValidate.userPassword" placeholder="设置用户密码"></Input>
		        </FormItem>
                <!-- <FormItem label="二级密码：" >
                    666666（请登录系统后更改）
                </FormItem> -->
                <FormItem label="手机号码：" prop="phone">
                    <Input size="large" v-model="formValidate.phone" placeholder="手机号码 "></Input>
                </FormItem>
                <FormItem label="QQ号" prop="qqNumber">
                    <Input size="large" v-model="formValidate.qqNumber" placeholder="QQ号"></Input>
                </FormItem>

                <FormItem label="推荐人:" prop="recommendAccount">
                    {{formValidate.recommendAccount}}
                </FormItem>
                 <FormItem label="性别：">
                   <!--  <span>{{ formValidate.userSex }}</span> -->
                    <Select size="large" v-model="formValidate.userSex" placeholder="选择性别">
                        <Option value="1">男</Option>
                        <Option value="0">女</Option>
                    
                    </Select>
                </FormItem>
                <!-- {{formValidate.agentTypeId}} -->
		        <FormItem label="代理类型：" prop="agentTypeId">
		            <Select  size="large" v-model="formValidate.agentTypeId" placeholder="代理类型">
                    
                         <Option  v-for="item in agentType" :value="item.id" :key="item.id">{{item.name}} </Option>
		               
		            </Select>
		        </FormItem>
                <FormItem label="放置区域：" v-if="showPosition" >
                    <!-- <span>{{ formValidate.position }}</span> -->
                    <Select size="large" v-model="formValidate.position" placeholder="放置区域">
                        <Option value="left">左区</Option>
                        <Option value="right">右区</Option>
                    
                    </Select>
                </FormItem>
                 <FormItem label="放置区域：" v-if="!showPosition" >
                    <span>放在{{formValidate.treeParentAccount}}的{{ formValidate.position }}</span>
                   
                </FormItem>
                
                 <FormItem label="收货地址：" prop="address">
                    <Input size="large" v-model="formValidate.address" placeholder="输入完整的收货地址"></Input>
                </FormItem>
		        <!-- <FormItem>
		           
		            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
		        </FormItem> -->

		    </Form>
             <Button long size="large" :loading="loading" type="primary" @click="handleSubmit('formValidate')">提交</Button>
		</div>
        
         <Modal
            v-model="modal6"
            :mask-closable='false'
            title="注册成功"
            
            @on-ok="asyncOK">
            <div style="font-size:15pt;">
                <p>注册代理成功，代理帐号为：<span style="font-size:25pt;color:red">{{newUserAccountNumber}}</span></p>
                 <p>请牢记代理的帐号并联系管理员激活帐号。</p>
             </div>
        </Modal>

	</Card>
</template>
<script>
import Cookies from 'js-cookie';
    export default {
        data () {
            return {
                formValidate: {
                    userName:'', 
                    userPassword:'123456',
                    identityCard:'', 
                    phone:'',
                    userSex:'1',
                    qqNumber:'', 
                    recommendAccount:'',
                    agentTypeId:1,
                    treeParentAccount:'',
                    position:'left',
                    address:''
                },
                showPosition:false,
                modal6: false,
                loading: false,
                newUserAccountNumber:'',
                agentType:[],
                ruleValidate: {
                    userName: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    userPassword: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    identityCard: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                      userSex: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    qqNumber: [
                        { required: false, message: '不能为空', trigger: 'blur' }
                    ],
                     address: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted(){
            this.formValidate.recommendAccount = Cookies.get("account");
            this.formValidate.treeParentAccount = this.$route.query.parentAccount;
            if(this.$route.query.parentAccount==null){
                this.showPosition=true;
            }
            this.formValidate.position = this.$route.query.position;
            if(this.formValidate.position==null){
                this.formValidate.position="left";
            }
            this.findAgentType();
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {

                        this.loading =true;
                        this.$http.post("/user/register",this.formValidate).then(response=> {
                      
                                  var data = response.data;
                                  if(data.code == 0) {
                                      this.$Notice.success({
                                            title: "会员注册成功"
                                        });
                                      this.newUserAccountNumber=data.result.accountNumber;
                                      this.modal6=true;
                                       this.formValidate.userName='';
                                      this.formValidate.identityCard='';
                                      this.formValidate.phone='';
                                      this.formValidate.address='';
                                      this.qqNumber='';
                                  }else{
                                    // this.$Message.error('Fail!');
                                  }
                                  this.loading = false;
                                // this.$refs[name].resetFields();//重置表单
                            }).catch(function (error) {
                              //接口失败，也就是state不是200的时候，走这里
                              // this.$Message.error('error!');
                            });

                        
                    } else {
                        this.$Message.error('不能有空!');
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
                      // console.log(data)
                      this.agentType=data.result.result;
                })
            },
        }
    }
</script>