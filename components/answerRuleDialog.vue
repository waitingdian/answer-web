<template>
  <div class="answer-rule-dialog-comp fs-18">
    <el-dialog
            title="答题规则"
            class="answer-rule-dialog"
            :show-close="false"
            :close-on-click-modal="false"
            :visible.sync="answerRuleDialogVisible"
            width="560px">
      <div class="content fs-16">
        <p class="title" style="font-size: 14px;font-weight: bold;">本次评测的时间为<span class="text-red">60分钟</span>，请在规定时间内作答。</p>
        <p>1、进入答题页面，评测开始计时。</p>
        <p>2、再评测过程中，您可以通过顶部的评测时间来掌握自己的答题进度。</p>
        <p>3、待所有题目都完成后，您可以点击下方的交卷结束评测。</p>
        <p>4、<span class="text-red">本次评测只有一次机会，不得重复进行评测。</span> </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="answerRuleDialogVisible = false">我知道了</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'answerRuleDialogComp',
    data() {
      return {
        answerRuleDialogVisible: false
      };
    },
    created () {
    },
    methods: {
    }
  }
</script>

<style lang="less">
  .answer-rule-dialog-comp{
    .el-dialog__body{
      padding: 10px 20px;
    }
    .content{
      line-height: 1.5;
      p{
        padding-left: 12px;
      }
      .title{
        padding-left: 0;
        padding-bottom: 8px;
        color: #424040;
      }
    }
  }

</style>
