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
          <p class="box-title">密码登录</p>

          <div class="username" :class="focusFlag == 1 ? focusClass : ''">
            <span class="iconfont">&#xe63c;</span>
            <input type="text" class="text" v-model="username" @focus="focusStyle1" @blur="blurStyle" placeholder="username">
          </div>
          <p class="info">
            <span v-show="userFlag">账户不为空</span>
          </p>
          <div class="password" :class="focusFlag == 2 ? focusClass : ''">
            <span class="iconfont psw-icon">&#xe7b8;</span>
            <input type="password" class="text" v-model="password" @keyup.enter="userLogin"
            @focus="focusStyle2" @blur="blurStyle" placeholder="password">
          </div>
          <p class="info">
            <span v-show="pswFlag" v-text="pswInfo"></span>
          </p>
          <button class="login-btn" @click="userLogin">登录</button>
          <div class="box-footer">
            <router-link class="register" to="/register" tag="span">立即注册</router-link>
            <span class="forget-psw">忘记密码？</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    created() {
      var user = JSON.parse(localStorage.getItem('myUser') || '[]');
      if (user) {
        if(user.uemail)
        this.username = user.uemail;
      }
    },
    data() {
      return {
        focusClass: 'focusClass',
        focusFlag: 0,
        userFlag: false,
        pswFlag: false,
        username: '',
        password: '',
        pswInfo:'密码不为空',
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
      blurStyle() {
        this.focusFlag = 0;
      },
      checkInfo() {
        if (!this.username.length) {
          this.userFlag = true;
        } else {
          this.userFlag = false;
        }
        if (!this.password.length) {
          this.pswFlag = true;
        } else {
          this.pswFlag = false;
        }
      },
      userLogin() {
        this.checkInfo();
        if (this.userFlag || this.pswFlag);
        else {
          let username = this.username;
          let password = this.password;
          let user = this.$qs.stringify({
            uemail: username,
            upwd: password
          })
          let this_ = this;
          this.axios.post(this.Home + '/api/v1/user/login', user).then((res) => {
            if (res.data.data) {
              let myUser = res.data.data;
              localStorage.setItem('myUser', JSON.stringify(myUser));
              this_.$router.push('/');

            } else {
              this_.pswInfo = '账户或密码错误';
              this_.pswFlag = true;
            }
          })
        }
      }
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
    margin-left: -50px;
    background: url('https://s17.mogucdn.com/p2/170105/upload_541i9di2b3icf9j13f24e0bg7b1i6_1920x600.png') center center repeat;
  }

  .login-box {
    position: absolute;
    right: 100px;
    top: 80px;
    width: 360px;
    height: 320px;
    border: 1ps solid #eef2f4;
    z-index: 99;
    background: #fff;
  }

  .div-box {
    position: relative;
    left: 30px;
    top: 30px;
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
  .password {
    height: 36px;
    line-height: 36px;
    border: 1px solid #ddd;
  }

  .username span,
  .password span {
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

  .register {
    float: left;
    color: #666;
    cursor: pointer;
  }

  .register:hover {
    color: #FF2832;
  }

  .forget-psw {
    float: right;
    color: #25a4bb;
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
