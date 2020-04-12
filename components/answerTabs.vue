<template>
  <div class="answer-tabs">
    <ul class="clearfix">
      <li v-for="(item, index) in answerList || []"
          @click="toggleAnswer(item, index)">
        <div class="item" v-if="item.type == 1" :class="[item.resultValue ? 'active': '', item.id == activeAnswer ?'selected' : '']">
          {{ item.id }}
        </div>
        <div class="item" v-if="item.type == 2" :class="[getClassName2(item), item.id == activeAnswer ?'selected' : '']">
          {{ item.id }}
        </div>
        <div class="item" v-if="item.type == 3" :class="[getClassName3(item), item.id == activeAnswer ?'selected' : '']">
          {{ item.id }}
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default{
    props: {
      activeAnswer: {
        default: 1,
        type: Number
      },
      answerList: {
        default: [],
        type: Array
      },
    },
    data () {
      return {}
    },
    methods: {
      toggleAnswer (item, index) {
        this.$emit("toggleAnswer", item.id)
      },
      getClassName2 (item) {
        let activeName = '';
        item.resultValue.forEach((it) => {
          if (it) {
            activeName = 'active'
          }
        })
        return activeName
      },
      getClassName3 (item) {
        let activeName = '';
        item.resultValue.forEach((it) => {
          if (JSON.stringify(it) != '{}') {
            activeName = 'active'
          }
        })
        return activeName
      }
    }
  }
</script>
<style lang="less">
  .answer-tabs{
    position: absolute;
    top: 80px;
    right: 20px;
    ul{
      width: 220px;
      background-color: #fff;
      overflow: hidden;
      padding: 16px 12px 11px;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      border-radius: 4px;
      font-size: 12px;
    }
    li{
      float: left;
    }
    .item{
      width: 24px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      background-color: rgba(57,165,168,0.5);
      color: #fff;
      margin-right: 4px;
      margin-bottom: 5px;
      border-radius: 2px;
      cursor: pointer;
      &:nth-child(7n){
        margin-right: 0px;
      }
      &.active{
        background-color: #39a5a8;
        color: #fff;
      }
      &.selected{
        background-color: orangered;
        color: #fff;
      }
    }
  }
</style>