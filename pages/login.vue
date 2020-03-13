<template>
  <div class="login-page">
    <div class="login-header bg-white">
<!--      <p class="p-l-50 fs-32" style="letter-spacing: 2px;">MAT</p>-->
    </div>
    <div style="height: 50px;"></div>
    <div style="width: 100%;background:#ebebeb;">
      <div class="bg-white p-l-15 p-r-15">
        <div class="login-container">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm pull-right">
<!--            <p class="title">登  录</p>-->
            <img src="../assets/images/toplog.png" style="display: block;margin: 0 auto" alt="">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="ruleForm.userName" maxLength="18" placeholder="用户名为身份证号码"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" maxlength="6" autocomplete="off" placeholder="请输入密码">
              </el-input>
            </el-form-item>
            <el-form-item style="textAlign: center;">
              <el-button type="primary" @click="submitForm('ruleForm')">登  录</el-button>
            </el-form-item>
          </el-form>
          <div class="login-wrap">
            <img src="https://hudongmsite.oss-cn-hangzhou.aliyuncs.com/meeting/basic42s2C31583561725635.jpg" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      var validateUserName = (rule, value, callback) => {
        if (!value) {
          callback(new Error('用户名不能为空'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入密码'));
        }  else if (value.length != 6) {
          callback(new Error('请输入6位数密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          userName: '',
          pass: ''
        },
        rules: {
          userName: [
            { validator: validateUserName, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ]
        },
        userList: [
          {
            "name": "沈鑫哲",
            "idCard": 310112200810172740
          },
          {
            "name": "杜祎煦",
            "idCard": 310113200702084860
          },
          {
            "name": "殷悦",
            "idCard": 320682200807188900
          },
          {
            "name": "汪稼琦",
            "idCard": "31010420040331681x"
          },
          {
            "name": "周皓洋",
            "idCard": 310112200610271500
          },
          {
            "name": "何鑫煌",
            "idCard": 341021200807210050
          },
          {
            "name": "田瑞彬",
            "idCard": 231005200606220500
          },
          {
            "name": "田瑞翔",
            "idCard": 231005200606220540
          },
          {
            "name": "姜翁昕",
            "idCard": 310112200709192700
          },
          {
            "name": "陆思辰",
            "idCard": 310108200805052400
          },
          {
            "name": "孙瑞彭",
            "idCard": "36043020060510061X"
          },
          {
            "name": "孙晏卿",
            "idCard": 532801200908130500
          },
          {
            "name": "姚徐靖",
            "idCard": 310117200901024830
          },
          {
            "name": "刘怡宁",
            "idCard": 310112200401290050
          },
          {
            "name": "郑又齐",
            "idCard": 120103200905060160
          },
          {
            "name": "高智强",
            "idCard": "31010120051027373X"
          },
          {
            "name": "仇皓",
            "idCard": 310105201002282800
          },
          {
            "name": "程梓涵",
            "idCard": 310103201006295040
          },
          {
            "name": "王一舟",
            "idCard": 32051200405085256
          },
          {
            "name": "白欣妍",
            "idCard": 31011200811122170
          },
          {
            "name": "汤芷安",
            "idCard": 310112197808262149
          }
        ],
        names: [
          "沈鑫哲",
          "杜祎煦",
          "殷悦",
          "汪稼琦",
          "周皓洋",
          "何鑫煌",
          "田瑞彬",
          "田瑞翔",
          "姜翁昕",
          "陆思辰",
          "孙瑞彭",
          "孙晏卿",
          "姚徐靖",
          "刘怡宁",
          "郑又齐",
          "高智强",
          "仇皓",
          "程梓涵",
          "王一舟",
          "白欣妍",
          "汤芷安"
        ],
        nickNames: [],
        cards: [
          310112200810172710,
          310113200702084832,
          320682200807188955,
          "31010420040331681X",
          310112200610271511,
          341021200807210031,
          231005200606220510,
          231005200606220537,
          310112200709192717,
          310108200805052410,
          "36043020060510061X",
          532801200908130510,
          310117200901024838,
          310112200401290046,
          120103200905060154,
          "31010120051027373X", 
          310105201002282832,
          310103201006295013,
          32051200405085255,
          31011200811122168,
          310112197808262149
        ],
        mobiles: [],
        emails: [],
        classNames: []

      };
    },
    created () {
      this.userList = []
      this.names.forEach((item) => {
        let obj = {
            name: item
          }
          this.userList.push(obj)
      })
      this.cards.forEach((cItem,cIndex) => {
        this.userList[cIndex].idCard = cItem
      })
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let userNameTag = false
            let username = this.ruleForm.userName.toUpperCase()
            let pass = this.ruleForm.pass.toUpperCase()

            this.userList.forEach((item) => {
              if (item.idCard == username) {
                userNameTag = true
              }
            })
            if (!userNameTag) {
              this.$message.error("请填写正确用户名")
              return false
            }

            let passTag = false
            let rightPass = pass.substring(pass.length-6)
            if (rightPass != pass) {
              this.$message.error("密码错误")
              return false
            }
            localStorage.clear()
            this.$message.success("登录成功")
            setTimeout(() => {
              this.$router.push("/answer?type=1")
            }, 500)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="less">
.login-page{
  background: #39a5a8;
  min-height: 100vh;
  .login-header{
    height: 80px;
    line-height: 80px;
  }
  .login-container{
    width: 1200px;
    margin: 0 auto 0;
    background: #fff;
  }
  .login-wrap{
    margin-right: 500px;
    img{
      display: block;
      width: 100%;
    }
  }
  .demo-ruleForm{
    padding-top: 25px;
    width: 380px;
    margin: 0 40px;
    .title{
      text-align: center;
      padding: 25px 15px;
      font-size: 22px;
      color: #333;
      font-weight: bold;
    }
  }
}
</style>
