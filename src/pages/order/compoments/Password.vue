<template>
  <div class="password-wrapper">
    <div class="password-heder">
      密码设置
    </div>
    <div class="tip-info" v-show="tipFlag">
      <span>修改成功</span>
    </div>
    <div class="password-form">
      <div class="password-content">
        <p>
          <span class="psw">新密码</span>
          <input type="password" class="text" v-model="psw1">
        </p>
        <p>
          <span class="psw">确认密码</span>
          <input type="password" class="text" v-model="psw2">
        </p>
        <p>
          <span class="verify">邮箱验证码</span>
          <input type="text" class="verify-text" v-model="code">
          <button class="verify-btn" v-text="verifyInfo" @click="getCode"></button>
        </p>
        <button class="btn" @click="checkPsw">确认</button>
        <span class="info" v-show="infoFlag" v-text="info"></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        infoFlag: false, //密码输入不一致提示信息
        psw1: '',
        psw2: '',
        info: '',
        code: '',
        count: 0,
        verifyInfo: '获取验证码',
        tipFlag: false,
      }
    },
    created() {
      var user = JSON.parse(localStorage.getItem('myUser') || '[]');
      if (user.upwd) {
      } else {
        let routeData = this.$router.resolve("/login");
        window.open(routeData.href, '_blank');
      }
    },
    methods: {
      checkPsw() {
        if (!this.psw1 || !this.psw2) {
          this.info = '密码输入不能为空';
          this.infoFlag = true;
        } else if (this.psw1 != this.psw2) {
          this.info = '两次密码输入不一致';
          this.infoFlag = true;
        } else if (!this.code) {
          this.info = '验证码不能为空';
        } else {
          this.infoFlag = false;
          var user = JSON.parse(localStorage.getItem('myUser') || '[]');
          let params = this.$qs.stringify({
            uemail: user.uemail,
            upwd: this.psw2,
            emailCode: this.code
          })
          this.axios.post(this.Home + '/api/v1/user/changePwd', params).then((res) => {
            console.log(res);
            if (res.data.data.data) {
              this.tipFlag = true;
              setTimeout(() => {
                this.tipFlag = false;
                this.psw1 = this.psw2 = this.code = '';
              }, 3000)
            }else{
              let user = JSON.parse(localStorage.getItem('myUser') || '[]');
              user.upwd = '';
              this.$router.push('/login');
            }
          })
        }
      },
      sendEmailCode() {
        var user = JSON.parse(localStorage.getItem('myUser') || '[]');
        var params = this.$qs.stringify({
          uemail: user.uemail
        });
        this.axios.post(this.Home + '/api/v1/user/sendEmailCode',
          params
        ).then((res) => {})
      },
      getCode() {
        if (this.count == 0) {
          this.count = 90;
          this.sendEmailCode();
          var this_ = this;
          var verifyTimer = setInterval(function () {
            if (this_.count == 0) {
              clearInterval(verifyTimer);
              this_.verifyInfo = '获取验证码';
            } else {
              this_.count--;
              this_.verifyInfo = this_.count + 's重新获取';
            }
          }, 1000);
        }
      },
    },

  }

</script>

<style scoped>
  .password-wrapper {
    float: left;
    width: 800px;
    height: 400px;
    margin-left: 60px;
    border: 1px solid #dfdfdf;
  }

  .password-heder {
    height: 40px;
    line-height: 40px;
    color: #484848;
    font-weight: 700;
    padding-left: 10px;
    background: #f9f9f9;
    border-bottom: 1px solid #dfdfdf;
  }

  .password-form {
    height: 360px;
  }

  .password-content {
    width: 500px;
    height: 130px;
    margin-left: 150px;
    margin-top: 115px;
  }

  .password-content p {
    height: 30px;
    line-height: 30px;
    margin-bottom: 20px;
  }

  .password-content .psw,
  .verify {
    float: left;
    width: 100px;
    height: 30px;
    text-align: right;
  }

  .text {
    float: left;
    width: 280px;
    height: 26px;
    padding: 0 6px;
    margin-left: 10px;
    border: 2px solid #dfdfdf;
  }

  .verify-text {
    float: left;
    width: 120px;
    height: 26px;
    padding: 0 6px;
    margin-left: 10px;
    border: 2px solid #dfdfdf;
  }

  .btn {
    float: left;
    color: #fff;
    width: 100px;
    height: 30px;
    line-height: 30px;
    background: #FF4466;
    border-radius: 3px;
    margin-left: 110px;
  }

  .verify-btn {
    float: left;
    color: #666;
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    background: #F1F1F1;
    border-radius: 3px;
    margin-left: 30px;
    cursor: pointer;
  }

  .info {
    float: left;
    color: #FF4466;
    text-align: center;
    width: 200px;
    height: 30px;
    line-height: 30px;
  }

  .tip-info {
    position: absolute;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    left: 50%;
    top: 50%;
    margin-left: -60px;
    margin-top: -120px;
    background: #7A6E6E;
    color: #fff;
    border: 1px solid #ccc;
    border-radius: 3px;
  }

</style>
