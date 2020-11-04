<template>
  <div class="login-page">
    <div class="login-header bg-white">
      <p class="p-l-50 fs-32" style="letter-spacing: 2px;">MTA</p>
    </div>
    <div style="height: 50px;"></div>
    <div style="width: 100%;background:#ebebeb;">
      <div class="bg-white p-l-15 p-r-15">
        <div class="login-container">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm pull-right">
            <!--            <p class="title">登  录</p>-->
            <img src="URLhttps://zlybc.com/answer/toplog.png" style="display: block;margin: 0 auto" alt="">
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
        userList: [],
        names: ["徐倪睿	", "刘传昊	", "赵君卓	", "汤思烨	", "李昊霖	", "林雪文	", "顾梦琦	", "荀子骞	", "孙宇昊	", "岑锐峰	", "洪诚骏	", "马明阳	", "邱宏民	", "陆承乾	", "朱加怿	", "王祥瑞	", "赵睿宸	", "齐若辰	", "王钰涵	", "于明歆	", "倪润之	", "任知宜	", "孙子媛	", "雍旖玥	", "吴柄颉	", "张晓赟	", "沈楹嘉	", "李浩源	", "金匡禹	", "杨子健	", "朱卉	", "冯翎郡	", "徐晨曦	", "董峻涛	", "杨张祺	", "郑铄	", "顾宝义	", "范馨予	", "王欣语	", "沈逸菲	", "刘子睿	", "曾庆博	", "陈嵘越	", "陈鸿宇	", "赵家骏	", "蔡心妍	", "潘子豪	", "高沚扬	", "李沁峰	", "李沁恒	", "陈建辉	", "孔庆丞	", "胡奕轩	", "王仕元	", "张乐	", "陈书豪	", "王圣涵	", "宦易宏	", "谈靖尧	", "李熠歆	", "王偲铭	", "鄂彦博	", "杨定钧	", "周字鹏	"],
        nickNames: [],
        cards: ["310101200908051037", "341126200811116715", "310110200901230514", "31010920040830203X", "35092520100414005X", "310110200412165125", "310109201011124540", "310110200810258810", "310110200909011017", "330282201010254251", "310110201107194418", "410725200811230511", "34082220080318623X", "310115201007236475", "310101201009291031", "310109200810064519", "320481200801167611", "310110200707265625", "410181200807030144", " 310108201004200561", "310110200709035153", "310115200805090920", "310110200808225120", "310110200705101520", "310115201008186393", "310115200709110637", "31011020080818201X", "350122200505050135", "310110201103234419", "31011020080813443X", "310110200807245621", "310109200708214066", "310110200909265113", "310110200906255710", "310109200607252071", "31023020100325291X", "310107200709013028", "310107200812150426", "410104200901210106", "310107201106194418", "420117200902040034", "360821200907224138", "110106201012073611", "000000000031010120"],
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
            var loading = this.$loading({
              lock: true,
              text: '登录中...',
              spinner: 'el-icon-loading',
              background: 'rgba(255, 255, 255, 0.8)'
            });
            setTimeout(() => {
              loading.close();
              this.$message.success("登录成功")
              this.$router.push("/answer?type=1")
            }, 3000)
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
