<style lang="less">
    @import './own-space.less';
</style>

<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person"></Icon>
                个人信息
            </p>
            <div style="width:87vw">
                <Form 
                    ref="userForm"
                    :model="userForm" 
                    :label-width="90"
                    label-position="right"
                    :rules="inforValidate"
                >
                   <!--  <FormItem label="用户姓名：" prop="name">
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="userForm.name" ></Input>
                        </div>
                    </FormItem>
                    <FormItem label="用户手机：" prop="cellphone" >
                        <div style="display:inline-block;width:204px;">
                            <Input v-model="userForm.cellphone" @on-keydown="hasChangePhone"></Input>
                        </div>
                        <div style="display:inline-block;position:relative;">
                            <Button @click="getIdentifyCode" :disabled="canGetIdentifyCode">{{ gettingIdentifyCodeBtnContent }}</Button>
                            <div class="own-space-input-identifycode-con" v-if="inputCodeVisible">
                                <div style="background-color:white;z-index:110;margin:10px;">
                                    <Input v-model="securityCode" placeholder="请填写短信验证码" ></Input>
                                    <div style="margin-top:10px;text-align:right">
                                        <Button type="ghost" @click="cancelInputCodeBox">取消</Button>
                                        <Button type="primary" @click="submitCode" :loading="checkIdentifyCodeLoading">确定</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FormItem> -->
                    <FormItem label="帐号：">
                        <span>{{ userForm.accountNumber }}</span>
                    </FormItem>
                    <FormItem label="用户姓名：">
                        <span>{{ userForm.userName }}</span>
                    </FormItem>
                    <FormItem label="性别：">
                        <span v-if="userForm.userSex==1"> 男</span>
                        <span v-else> 女</span>
                        <!--  <Select v-model="userForm.userSex" style="width:200px">
                            <Option  value="1" >男</Option>
                            <Option  value="0" >女</Option>
                        </Select> -->
                    </FormItem>
                    <FormItem label="身份证：">
                        <span>{{ userForm.identityCard }}</span>
                    </FormItem>
                    <FormItem label="手机：" prop="phone">
                        <div style="display:inline-block;width:100%;">
                            <Input size="large" v-model="userForm.phone" ></Input>
                        </div>
                    </FormItem>
                     <FormItem label="邮箱：" prop="email">
                        <div style="display:inline-block;width:100%;">
                            <Input size="large" v-model="userForm.email" ></Input>
                        </div>
                    </FormItem>
                    <FormItem label="QQ：" prop="qqNumber">
                        <div style="display:inline-block;width:100%;">
                            <Input size="large" v-model="userForm.qqNumber" ></Input>
                        </div>
                    </FormItem>
                   <FormItem label="地址：" prop="address">
                        <div style="display:inline-block;width:100%;">
                            <Input size="large" v-model="userForm.address" ></Input>
                        </div>
                    </FormItem>
                    
                     <FormItem label="银行卡号：" prop="bankCard">
                        <div style="display:inline-block;width:100%;">
                            <Input size="large" v-model="userForm.bankCard" ></Input>
                        </div>
                    </FormItem>
                     <FormItem label="开户银行：" prop="bankName">
                        <div style="display:inline-block;width:100%;">
                            <Input size="large" v-model="userForm.bankName" ></Input>
                        </div>
                    </FormItem>
                     <FormItem label="开户银行地址：" prop="bankAddress">
                        <div style="display:inline-block;width:100%;">
                            <Input size="large" v-model="userForm.bankAddress" ></Input>
                        </div>
                    </FormItem>
                     <FormItem label="推荐人帐号：">
                        <span>{{ userForm.recommendUserId }}</span>
                    </FormItem>
                    <!-- {{agentType}} -->
                     <FormItem label="代理级别：">
                        <span>{{ agentType.name }}</span>
                    </FormItem>
                    <FormItem label="登录密码：">
                        <Button type="primary" size="small" @click="showEditPassword">修改密码</Button>
                    </FormItem>
                    <div>
                        <!-- <Button type="text" style="width: 100px;" @click="cancelEditUserInfor">取消</Button> -->
                        <!-- <Button type="primary" style="width: 100px;" :loading="save_loading" @click="saveEdit">保存</Button> -->
                    </div>
                </Form>
                 <Button type="primary" long size="large"  :loading="save_loading" @click="saveEdit">保存</Button>
            </div>
        </Card>
        <Modal v-model="editPasswordModal" :closable='false' :mask-closable=false :width="500">
            <h3 slot="header" style="color:#2D8CF0">修改密码</h3>
            <Form ref="editPasswordForm" :model="editPasswordForm" :label-width="100" label-position="right" :rules="passwordValidate">
                <FormItem label="原密码" prop="oldPass" :error="oldPassError">
                    <Input size="large"  v-model="editPasswordForm.oldPass" placeholder="请输入现在使用的密码" ></Input>
                </FormItem>
                <FormItem label="新密码" prop="newPass">
                    <Input size="large" v-model="editPasswordForm.newPass" placeholder="请输入新密码，至少6位字符" ></Input>
                </FormItem>
                <FormItem label="确认新密码" prop="rePass">
                    <Input size="large" v-model="editPasswordForm.rePass" placeholder="请再次输入新密码" ></Input>
                </FormItem>
            </Form>
            <div style="color:red">{{passwordErrorMessage}}</div>
            <div slot="footer">
                <Button type="text" @click="cancelEditPass">取消</Button>
                <Button type="primary" :loading="savePassLoading" @click="saveEditPass">保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
export default {
    name: 'ownspace_index',
    data () {
        const validePhone = (rule, value, callback) => {
            var re = /^1[0-9]{10}$/;
            if (!re.test(value)) {
                callback(new Error('请输入正确格式的手机号'));
            } else {
                callback();
            }
        };
        const valideRePassword = (rule, value, callback) => {
            if (value !== this.editPasswordForm.newPass) {
                callback(new Error('两次输入密码不一致'));
            } else {
                callback();
            }
        };
        return {
            userForm: {
                "id": 1,
                "accountNumber": "",
                "userName": "",
                "userSex": null,
                "identityCard": null,
                "phone": null,
                "email": null,
                "qqNumber": null,
                "address": null,
                "bankCard": null,
                "bankName": null,
                "realName": null,
                "bankAddress": null,
                "recommendUserId": null,
                "agentTypeId": null
            },
            agentType:'',
            uid: '', // 登录用户的userId
            securityCode: '', // 验证码
            phoneHasChanged: false, // 是否编辑了手机
            save_loading: false,
            identifyError: '', // 验证码错误
            editPasswordModal: false, // 修改密码模态框显示
            savePassLoading: false,
            oldPassError: '',
            identifyCodeRight: false, // 验证码是否正确
            hasGetIdentifyCode: false, // 是否点了获取验证码
            canGetIdentifyCode: false, // 是否可点获取验证码
            checkIdentifyCodeLoading: false,
            inforValidate: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                cellphone: [
                    { required: true, message: '请输入手机号码' },
                    { validator: validePhone }
                ]
            },
            editPasswordForm: {
                oldPass: '',
                newPass: '',
                rePass: ''
            },
            passwordErrorMessage:'',
            passwordValidate: {
                oldPass: [
                    { required: true, message: '请输入原密码', trigger: 'blur' }
                ],
                newPass: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { min: 6, message: '请至少输入6个字符', trigger: 'blur' },
                    { max: 32, message: '最多输入32个字符', trigger: 'blur' }
                ],
                rePass: [
                    { required: true, message: '请再次输入新密码', trigger: 'blur' },
                    { validator: valideRePassword, trigger: 'blur' }
                ]
            },
            inputCodeVisible: false, // 显示填写验证码box
            initPhone: '',
            gettingIdentifyCodeBtnContent: '获取验证码' // “获取验证码”按钮的文字
        };
    },
    methods: {
        handleSwitchSex(ss)  {
            this.userForm.userSex = ss;
        },
         findAgentType(){
            this.$http.get("/agentType/get?id="+this.userForm.agentTypeId).then(response=> {
                  var data = response.data;
                  this.agentType=data.result;
            })
        },
        getIdentifyCode () {
            this.hasGetIdentifyCode = true;
            this.$refs['userForm'].validate((valid) => {
                if (valid) {
                    this.canGetIdentifyCode = true;
                    let timeLast = 60;
                    let timer = setInterval(() => {
                        if (timeLast >= 0) {
                            this.gettingIdentifyCodeBtnContent = timeLast + '秒后重试';
                            timeLast -= 1;
                        } else {
                            clearInterval(timer);
                            this.gettingIdentifyCodeBtnContent = '获取验证码';
                            this.canGetIdentifyCode = false;
                        }
                    }, 1000);
                    this.inputCodeVisible = true;
                    // you can write ajax request here
                }
            });
        },
        showEditPassword () {
            this.editPasswordModal = true;
        },
        cancelEditUserInfor () {
            // this.$store.commit('removeTag', 'ownspace_index');
            localStorage.pageOpenedList = JSON.stringify(this.$store.state.app.pageOpenedList);
            let lastPageName = '';
            if (this.$store.state.app.pageOpenedList.length > 1) {
                lastPageName = this.$store.state.app.pageOpenedList[1].name;
            } else {
                lastPageName = this.$store.state.app.pageOpenedList[0].name;
            }
            this.$router.push({
                name: lastPageName
            });
        },
        saveEdit () {
            this.$refs['userForm'].validate((valid) => {
                if (valid) {
                    if (this.phoneHasChanged && this.userForm.cellphone !== this.initPhone) { // 手机号码修改过了而且修改之后的手机号和原来的不一样
                        if (this.hasGetIdentifyCode) { // 判断是否点了获取验证码
                            if (this.identifyCodeRight) { // 判断验证码是否正确
                                this.saveInfoAjax();
                            } else {
                                this.$Message.error('验证码错误，请重新输入');
                            }
                        } else {
                            this.$Message.warning('请先点击获取验证码');
                        }
                    } else {
                        this.saveInfoAjax();
                    }
                }
            });
        },
        cancelEditPass () {
            this.editPasswordModal = false;
            this.savePassLoading =false;
        },
        saveEditPass () {
            this.$refs['editPasswordForm'].validate((valid) => {
                if (valid) {
                    this.passwordErrorMessage="";
                    this.savePassLoading = true;
                    // you can write ajax request here
                    this.$http.post("/user/alertPassword",{
                        account: Cookies.get("account"),
                        oldPassword: this.editPasswordForm.oldPass,
                        newPassword: this.editPasswordForm.newPass
                    }).then(response=> {
                          //如果接口走成功就执行这里
                          // console.log(JSON.stringify(response));
                          var data = response.data;
                          if(data.code == 0) {
                              this.$Notice.success({
                                    title: "修改密码已成功！"
                                });
                          }else{
                              this.passwordErrorMessage = data.message;
                          }
                          this.savePassLoading = false;
                          this.editPasswordModal=false;
                    }).catch(function (error) {
                      //接口失败，也就是state不是200的时候，走这里
                    });
                }
            });
        },
        init () {
           
             this.$http.post("/user/getUserInfo",{
                account: Cookies.get("account")
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
            // this.userForm.name = 'Lison';
            // this.userForm.cellphone = '17712345678';
            // this.initPhone = '17712345678';
            // this.userForm.company = 'TalkingData';
            // this.userForm.department = '可视化部门';
        },
        cancelInputCodeBox () {
            this.inputCodeVisible = false;
            this.userForm.cellphone = this.initPhone;
        },
        submitCode () {
            let vm = this;
            vm.checkIdentifyCodeLoading = true;
            if (this.securityCode.length === 0) {
                this.$Message.error('请填写短信验证码');
            } else {
                setTimeout(() => {
                    this.$Message.success('验证码正确');
                    this.inputCodeVisible = false;
                    this.checkIdentifyCodeLoading = false;
                }, 1000);
            }
        },
        hasChangePhone () {
            this.phoneHasChanged = true;
            this.hasGetIdentifyCode = false;
            this.identifyCodeRight = false;
        },
        saveInfoAjax () {
            this.save_loading = true;
             this.$http.post("/user/updateInfo",this.userForm).then(response=> {
                          //如果接口走成功就执行这里
                          // console.log(JSON.stringify(response));
                          var data = response.data;
                          if(data.code == 0) {
                              this.$Notice.success({
                                    title: "修改成功！"
                                });
                          }else{
                             
                          }
                         this.save_loading = false;
                    }).catch(function (error) {
                      //接口失败，也就是state不是200的时候，走这里
                    });
        }
    },
    mounted () {
        this.init();
    }
};
</script>
