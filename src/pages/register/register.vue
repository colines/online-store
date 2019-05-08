<template>
  <div class="login-wrapper">
    <div class="login-header">
      <div class="logo" @click="goHome">
        <span class="iconfont iconfont-logo">&#xe60e;</span>
        <span class="store">书 城</span>
      </div>
    </div>
    <div class="clear-fix"></div>
    <div class="login-content">
      <div class="login-box">
        <div class="div-box">
          <p class="box-title">用户注册</p>

          <div class="email" :class="focusFlag == 4 ? focusClass :''">
            <span class="iconfont">&#xe7b1;</span>
            <input type="text" class="text" v-model="email" placeholder="用户名为qq邮箱" @focus="focusStyle4" @blur="blurStyle">
          </div>
          <p class="info">
            <span v-show="mailFlag">{{emailInfo}}</span>
          </p>
          <div class="username" :class="focusFlag == 1 ? focusClass :''">
            <span class="iconfont">&#xe63c;</span>
            <input type="text" class="text" v-model="username" placeholder="昵称" @focus="focusStyle1" @blur="blurStyle">
          </div>
          <p class="info">
            <span v-show="userFlag"></span>
          </p>
          <div class="password" :class="focusFlag == 2 ? focusClass :''">
            <span class="iconfont psw-icon">&#xe7b8;</span>
            <input type="password" class="text" v-model="password" placeholder="密码由4-12位字符组成" @focus="focusStyle2" @blur="blurStyle">
          </div>
          <p class="info">
            <span v-show="pswFlag">{{pwdInfo}}</span>
          </p>
          <div class="password" :class="focusFlag == 3 ? focusClass :''">
            <span class="iconfont psw-icon">&#xe7b8;</span>
            <input type="password" class="text" v-model="password2" placeholder="确认密码" @focus="focusStyle3" @blur="blurStyle">
          </div>
          <p class="info">
            <span v-show="sanmeFlag">密码不一致</span>
          </p>
          <div class="verify">
            <span>邮箱验证码</span>
            <input type="text" class="verify-text" v-model="verify" @focus="focusStyle5" @blur="blurStyle" :class="focusFlag == 5 ? focusClass :''">
            <button class="verify-btn" @click="getCode" v-text="verifyInfo"></button>
          </div>
          <p class="info">
            <span v-show="verifyFlag" v-text="verifyCodeInfo"></span>
          </p>
          <button class="login-btn" @click="userRegister">注册</button>
          <div class="box-footer">
            <span class="user-login">已有账号？<router-link to="/login" tag="span">请登录</router-link></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        focusClass: 'focusClass',
        focusFlag: 0,
        userFlag: false,
        pswFlag: false,
        sanmeFlag: '',
        mailFlag: false,
        verifyFlag: false,
        username: '',
        password: '',
        password2: '',
        email: '',
        verify: '', //前台验证码
        emailInfo: '邮箱格式不正确',
        pwdInfo: '密码由4-12位字符组成',
        verifyCodeInfo:'验证码不能为空',
        verifyInfo: '获取验证码',
        count: 0,
        verifyTimer: null, //验证码定时器
      }
    },
    destroyed() {
      if (this.verifyTimer != null) {
        clearInterval(this.verifyTimer);
        this.verifyTimer = null;
      }
    },
    methods: {
      goHome() {
        this.$router.push('/');
      },
      focusStyle1() {
        this.focusFlag = 1;
      },
      focusStyle2() {
        this.focusFlag = 2;
      },
      focusStyle3() {
        this.focusFlag = 3;
      },
      focusStyle4() {
        this.focusFlag = 4;
      },
      focusStyle5() {
        this.focusFlag = 5;
      },
      blurStyle() {
        this.focusFlag = 0;
      },
      checkInfo() {
        let len = this.email.length;
        let regs = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
        let reg = /[^A-Za-z0-9_]+/;
        if (len < 6 || len > 18 || regs.test(this.email)) {
          this.mailFlag = true;
        } else {
          this.mailFlag = false;
        }
        if (this.password.length < 4 || this.password.length > 12) {
          this.pswFlag = true;
        } else {
          this.pswFlag = false;
        }
        if (this.password != this.password2) {
          this.sanmeFlag = true;
        } else {
          this.sanmeFlag = false;
        }
        if (!this.verify.length) {
          this.verifyCodeInfo = '验证码不能为空';
          this.verifyFlag = true;
        } else {
          this.verifyFlag = false;
        }
      },
      sendEmailCode() {
        var email = this.email;
        var params = this.$qs.stringify({
          uemail: email
        });
        this.axios.post(this.Home + '/api/v1/user/sendEmailCode',
          params
        ).then((res) => {
        })
      },
      getCode() {
        let len = this.email.length;
        let regs = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
        let reg = /[^A-Za-z0-9_]+/;
        if (len < 6 || len > 18 || regs.test(this.email)) {
          this.mailFlag = true;
        } else {
          this.mailFlag = false;
        }
        if (this.count == 0 && !this.mailFlag) {
          this.count = 90;
          let this_ = this;
          this.sendEmailCode();
          this.verifyTimer = setInterval(function () {
            if (this_.count == 0) {
              clearInterval(this_.verifyTimer);
              this_.verifyInfo = '获取验证码';
            } else {
              this_.count--;
              this_.verifyInfo = this_.count + 's重新获取';
            }
          }, 1000);
        }
      },
      checkUemail() {
        this.axios.post(this.Home+'/api/v1/user/checkUemail?uemail=' + this.email).then((res) => {
          if (res.data) {
            this.emailInfo = '该邮箱已被注册过';
            this.mailFlag = true;
          }
        })
      },
      userRegister() {
        this.checkInfo();
        if (this.pswFlag || this.sanmeFlag || this.mailFlag || this.verifyFlag) {

        } else {
          this.checkUemail();
          if (!this.mailFlag) {
            let params = this.$qs.stringify({
              uemail: this.email,
              uname: this.username,
              upwd: this.password,
              emailCode: this.verify
            })
            this.axios.post(this.Home+'/api/v1/user/register',params
            ).then((res) => {
              if(res.data.data){
                this.$router.push('/login');
              }else{
                this.verifyCodeInfo = '验证码错误';
              }
            })
          }
        }
      },
    },

  }

</script>

<style scoped>
  .login-header {
    margin: 0 auto;
    padding-left: 100px;
  }

  .login-content {
    position: relative;
    height: 540px;
    background: #FFF;
    border-top: 1px solid #eee;
    background: #FAFAFA;
  }

  .login-box {
    position: absolute;
    right: 50%;
    top: 20px;
    margin-right: -180px;
    width: 360px;
    height: 490px;
    border: 1ps solid #eef2f4;
    z-index: 99;
    background: #fff;
    border: 1px solid #dfdfdf;
    border-radius: 5px;
  }

  .div-box {
    position: relative;
    left: 30px;
    top: 25px;
    width: 300px;
    height: 300px;

  }

  .box-title {
    line-height: 25px;
    line-height: 25px;
    font-size: 18px;
    color: #666;
    margin-bottom: 20px;
  }

  .username,
  .password,
  .email {
    height: 36px;
    line-height: 36px;
    border: 1px solid #ddd;
  }

  .username span,
  .password span,
  .email span {
    float: left;
    font-size: 18px;
    color: #DCDCDC;
    font-weight: bold;
    padding: 0px 10px;

  }

  input::placeholder {
    color: #DCDCDC;
  }

  .text {
    float: left;
    color: #333;
    width: 240px;
    padding: 7px 10px;
  }

  .verify {
    height: 36px;
    line-height: 36px;
  }

  .verify span {
    float: left;
    margin-right: 15px;
    color: #333;
  }

  .verify-text {
    float: left;
    width: 60px;
    height: 32px;
    padding: 0px 10px;
    color: #333;
    border: 1px solid #ddd;
  }

  .verify-btn {
    float: left;
    height: 36px;
    margin-left: 15px;
    padding: 0px 10px;
    color: #666;
    background: #F6F6F6;
    border-radius: 3px;
    cursor: pointer;
  }

  .login-btn {
    width: 300px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    color: #fff;
    font-size: 22px;
    font-weight: bold;
    border-radius: 5px;
    background: #FF2832;
    cursor: pointer;
  }

  .box-footer {
    width: 300px;
    height: 36px;
    line-height: 36px;
    margin-top: 10px;
  }

  .user-login {
    float: right;
  }

  .user-login span {
    color: #FF2832;
    cursor: pointer;
  }

  .info {
    height: 25px;
    line-height: 25px;
  }

  .info span {
    font-size: 12px;
    color: #FF2832;
    padding-left: 12px;
  }

  .focusClass {
    border: 1px solid #666;
  }

</style>
