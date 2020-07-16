<template>
  <div class="answer-page">
    <answerRuleDialog ref="answerRuleDialog"></answerRuleDialog>
    <div class="answer-content bg-white text-black p-b-40" v-loading="loading">
      <div class="answer-content-header fs-20">
        Python编程应用能力测试
        <div class="count-down pull-right p-r-50">{{  isEnd ? '考试结束' : countDown}}</div>
      </div>
      <div class="answer-content-main p-l-20">
        <p class="p-t-20 p-b-30">
          <span><span class="text-blue">{{activeAnswer}}</span> / 40</span>
          <span class="fs-16 p-l-5 text-bold">{{activeAnswerText}}</span>
        </p>
        <div v-for="(item, index) in answerList" :key="index" v-show="activeAnswer == (index+1)">
          <!--        <p class="answer-name p-b-20">下列选项总那个样式是对的</p>-->
          <div class="anser-name p-b-20 fs-16">
            <p class="text-bold p-b-10" style="max-width: 650px;line-height: 1.5;letter-spacing: 0.5px;">
              {{index + 1}}. <span v-html="item.name"></span>
            </p>
            <div class="p-l-30 answer-desc" v-html="item.desc">

            </div>
          </div>
          <!-- 单选题-->
          <div v-if="item.type == 1">
            <el-radio v-for="(result, rIndex) in item.resultList"
                      :key="rIndex"
                      :label="result.value"
                      v-model="item.resultValue"
                      border><span v-html="result.label"></span>
            </el-radio>
<!--            <el-radio v-model="radio1" label="2" border>备选项2</el-radio>-->
          </div>
          <!-- 单选题-->
          <div v-if="item.type == 3" class="judgement p-l-30">
            <p  v-for="(result, resultIndex) in item.resultList" :key="resultIndex">
              {{result.label}}
              <el-radio v-for="(buttonItem, buttonIndex) in result.buttonList"
                        :key="buttonIndex"
                        v-model="item.resultValue[resultIndex].value"
                        :label="buttonIndex+1">{{buttonItem}}
              </el-radio>
            </p>
            <!--            <el-radio v-model="radio1" label="2" border>备选项2</el-radio>-->
          </div>
          <!-- 多选题-->
<!--                  <div>-->
<!--                    <el-checkbox v-model="checked2" label="备选项2" border></el-checkbox>-->
<!--                  </div>-->
          <div v-if="item.type == 2">
            <el-checkbox v-for="(result, resultIndex) in item.resultList"
                         :key="resultIndex" v-model="item.resultValue[resultIndex]"
                         :label="result.value" border>{{result.label}}
            </el-checkbox>
<!--            <el-radio v-for="result in item.resultList" v-model="item.resultValue" :label="result.value" border>{{result.label}}</el-radio>-->
            <!--            <el-radio v-model="radio1" label="2" border>备选项2</el-radio>-->
          </div>
        </div>
      </div>
      <div class="text-center p-t-15">
        <el-button type="primary" @click="doPrev" v-if="activeAnswer > 1">上一题</el-button>
        <el-button type="primary" @click="doNext" v-if="activeAnswer < 40">下一题</el-button>
        <el-button type="primary" @click="submitAnswer" v-if="activeAnswer == 40">交 卷</el-button>
      </div>

      <AnswerTabs :answerList="answerList" :activeAnswer="activeAnswer" @toggleAnswer="toggleAnswer"></AnswerTabs>

    </div>
  </div>
</template>

<script>
  import AnswerRuleDialog from '../components/answerRuleDialog'
  import AnswerTabs from '../components/answerTabs'

  export default {
    name: 'answerRuleDialogComp',
    components: {AnswerRuleDialog, AnswerTabs},
    data() {
      return {
        countDown: '',
        answerEndTime: null,
        radio1: '1',
        activeAnswer: 1,
        loading: false,
        isEnd: false,
        answerList: [
          {
            id: 1,
            type: 1,
            resultValue: '',
            rightResultValue: 1,
            resultList: [
              { label: '无需更改', value: 1 },
              { label: '代码能够运行，但内含逻辑错误', value: 2 },
              { label: '代码将生成运行时错误', value: 3 },
              { label: '代码将生成语法错误', value: 4 },
            ],
            name: '本问题要求你评估带有下划线的文本，以确定其是否正确.你编写了以下代码。',
            desc: `
              import sys <br/>
              try: <br/>
                    &nbsp&nbsp file_in = open(“in.txt”,’r’)<br/>
                    &nbsp&nbsp file_out = open(“out.txt”,”w+”)<br/>
                  except IOError:<br/>
                    &nbsp&nbsp print(‘无法打开’,file_in)<br/>
                  else:<br/>
                    &nbsp&nbsp i = 1<br/>
                    &nbsp&nbsp for line in file_in:<br/>
                    &nbsp&nbsp&nbsp&nbsp print(line.rstrip())<br/>
                    &nbsp&nbsp&nbsp&nbsp file_out.write(“line ” + str(i) +”: ”+line)<br/>
                    &nbsp&nbsp&nbsp&nbsp i = i + 1<br/>
                    &nbsp&nbsp file_in.close()<br/>
                    &nbsp&nbsp file_out.close()<br/>
                  <p>out.txt 文件不存在，你运行代码。<u>代码将正确运行不会报错</u>。</p>
                  <p>查看带有下划线的文本，如果陈述正确，请选择“无需更改“，如果陈述不正确，请选择能
                    够更正陈述的答案选项。</p>
              `
          },
          {
            id: 2,
            type: 3,
            resultValue: [{},{},{},{}],
            rightResultValue: [1,2,3],
            resultList: [
              { label: '一个 try 语句可包含一个或多个 except 子句。', value: 1 , buttonList: ['是', '否']},
              { label: '一个 try 语句可包含 finally 子句但不含 except 子句。', value: 2, buttonList: ['是', '否']},
              { label: '一个 try 语句可同时包含一个 finally 子句和一个 except 子句。', value: 3, buttonList: ['是', '否']},
              { label: '一个 try 语句可包含一个或多个 finally 子句。', value: 4, buttonList: ['是', '否']},
            ],
            name: '对于以下每项陈述，如果陈述为真，请选择“是“，否则，请选择”否“。',
            desc: ''
          },
          {
            id: 3,
            type: 2,
            resultValue: [],
            rightResultValue: [6,7,8],
            resultList: [
              { label: '第 01 行', value: 1 },
              { label: '第 02 行', value: 2 },
              { label: '第 03 行', value: 3 },
              { label: '第 04 行', value: 4 },
              { label: '第 05 行', value: 5 },
              { label: '第 06 行', value: 6 },
              { label: '第 07 行', value: 7 },
              { label: '第 08 行', value: 8 }
            ],
            name: '你编写了以下代码，行号仅供参考。',
            desc: `
              01 import os <br/>
              02 def read_file(file): <br/>
              03 line = None <br/>
              04 if os.path.isfile(file): <br/>
              05 data = open(file, ’r’) <br/>
              06 while line != ‘’: <br/>
              07 line = data.readline() <br/>
              08 print(line) <br/>
              <p>即使文件不存在，代码也会尝试读取文件。</p>
              <p>你需要更正代码。</p>
              <p>哪三行存在缩进问题，每个正确答案都是解决方案的一部分，选择三项。</p>
             `
          },
          {
            id: 4,
            type: 3,
            resultValue: [{},{},{},{}],
            rightResultValue: [1,2,3],
            resultList: [
              { label: '第一次 print 后显示什么信息？', value: 2, buttonList: ['true', 'false']},
              { label: '第二次 print 后显示什么信息？', value: 2, buttonList: ['true', 'false']},
              { label: '第三次 print 后显示什么信息？', value: 1, buttonList: ['true', 'false']},
              { label: '第四次 print 后显示什么信息？', value: 1, buttonList: ['true', 'false']},
            ],
            name: '你正在为公司开发一个 Python 应用程序。你编写了以下代码：',
            desc: `
              numList = [1,2,3,4,5] <br/>
              alphaList = [“a”,”b” ,”c” ,”d” ,”e”] <br/>
              print(numList is alphaList) <br/>
              print(numList == alphaList) <br/>
              numList = alphaList <br/>
              print(numList is alphaList) <br/>
              print(numList == alphaList) <br/>
              <p>使用下拉菜单，基于代码段中呈现的信息，选择每个问题的答案选项。</p>
            `
          },
          {
            id: 5,
            type: 3,
            resultValue: [{},{},{}],
            rightResultValue: [2,2,2],
            resultList: [
              { label: '首先计算表达式的哪一部分？', value: 2, buttonList: ['a+b', 'b*c', 'c-d']},
              { label: '最后进行哪个运算?', value: 2, buttonList: ['加', '减']},
              { label: '哪个表达式与函数中的表达式等效?', value: 2, buttonList: ['(a+b) * (c-d)', '(a +（b*c）) - d', 'a + ((b*c)-d)']},
            ],
            name: '你为公司开发了一款 Python 应用程序。代码如下所示，行号仅供参考',
            desc: `
              01 def main(a,b,c,d): <br/>
              02 value = a+b*c-d <br/>
              03 return value <br/>
              <p>使用下拉菜单，根据代码段中提供的信息，选择每个问题的答案选项。</p>
            `
          },
          {
            id: 6,
            type: 3,
            resultValue: [{},{},{}],
            rightResultValue: [3,4,2],
            resultList: [
              { label: '第 01 行的 rooms 清单中存储了哪两种数据类型？', value: 3, buttonList: ['bool 和 string', 'float 和 bool', 'int 和 string', 'float 和 int']},
              { label: '第 02 行中的 room 的数据类型是什么？', value: 4, buttonList: ['bool', 'float', 'int', 'string']},
              { label: '第 03 行无法找到房间的原因是什么？', value: 2, buttonList: ['语法无效', '数据类型不匹配', '变量名称错误']},
            ],
            name: '你创建了以下用于寻找会议室并显示房间名称的程序，行号仅供参考。',
            desc: `
              01 rooms = {1:”休息室”, 2:”会议室”} <br/>
              02 room = input(“输入房间编号:”) <br/>
              03 if not room in rooms: <br/>
              04 &nbsp&nbsp print(“房间不存在！”) <br/>
              05 else: <br/>
              06 &nbsp&nbsp print(“房间名称为” + rooms[room]) <br/>
              <p>同事反映该程序有时会产生错误结果。</p>
              <p>你需要排除程序中的问题。使用下拉菜单，根据代码段中提供的信息选择每个问题的答案选项。</p>
            `
          },
          {
            id: 7,
            type: 1,
            resultValue: '',
            rightResultValue: 4,
            resultList: [
              { label: 'totalItems = float(input(“需要多少件物品?”))', value: 1 },
              { label: 'totalItems = str(input(“需要多少件物品?”))', value: 2 },
              { label: 'totalItems = input(“需要多少件物品?”)', value: 3 },
              { label: 'totalItems = int(float(input(“需要多少件物品?”)))', value: 4 },
            ],
            name: ' Northwind Traders 请你作为实习生加入编写电子商务应用程序的代码团队。',
            desc: `
              <p>你需要编写一个要求客户输入数值的脚本。即使用户输入的是小数值，该值也必须作为整数用于计算。</p>
              <p>你需要编写满足上述要求的代码。</p>
              <p>你应使用哪个代码段？</p>
              `
          },
          {
            id: 8,
            type: 3,
            resultValue: [{},{},{}],
            rightResultValue: [1,1,2],
            resultList: [
              { label: '执行代码段1后，变量a的数据类型为str。', value: 1, buttonList: ['是', '否']},
              { label: '执行代码段2后，变量b的数据类型为float。', value: 1, buttonList: ['是', '否']},
              { label: '执行代码段3后，变量c 的数据类型为int。', value: 2, buttonList: ['是', '否']},
            ],
            name: '学校放假期间，你志愿为低年级同学讲解一些基本的编程概念。你想要介绍 Python 中的数据类型概念。你编写了以下三个代码段：',
            desc: `
              #代码段 1 x1 = “20” <br/>
              &nbsp&nbsp y1 = 3 <br/>
              &nbsp&nbsp a = x1 *y1 <br/>
              #代码段 2 <br/>
              &nbsp&nbsp x2 = 6 <br/>
              &nbsp&nbsp y2 = 4 <br/>
              &nbsp&nbsp b = x2 / y2 <br/>
              #代码段 3 <br/>
              &nbsp&nbsp x3 = 2.5 <br/>
              &nbsp&nbsp y3 = 1 <br/>
              &nbsp&nbsp c = x3 + y3 <br/>
              <p>你需要评估这些代码段。</p>
              <p>对于以下每项描述，如果陈述为真，请选择“是“。否则，请选择”否“。</p>
            `
          },
          {
            id: 9,
            type: 2,
            resultValue: [],
            rightResultValue: [2,3],
            resultList: [
              { label: 'employees[0:-5]', value: 1 },
              { label: 'employees[0:-4]', value: 2 },
              { label: 'employees[:-5]', value: 2 },
              { label: 'employees[1:-4]', value: 2 },
              { label: 'employees[1:-5]', value: 2 },
            ],
            name: `你为公司开发一个python程序。名为employees的列表，包含200个员工姓名，最后五个是公司管理层员工，您需要对该列表进行切片，显示除管理层以外的所有员工，你是用哪两个代码段？每个正确答案都可提供完整的解决方案，选择两项。`,
            desc: ''
          },
          {
            id: 10,
            type: 1,
            resultValue: '',
            rightResultValue: 1,
            resultList: [
              { label: 'print(“恭喜入职”+(int(end)-int(start))+” 周年!”)', value: 1 },
              { label: 'print(“恭喜入职”+int(end-start))+”周年!”)', value: 2 },
              { label: 'print(“恭喜入职”+str(int(end)-int(start))+” 周年!”)', value: 3 },
              { label: 'print(“恭喜入职”+str(end-start))+” 周年!”)', value: 4 }
            ],
            name: '你正在创建一个Python程序，该程序计算员工服务得年限，并为其显示祝贺信息。你需要显示服务年限并显示贺词。<br>你已编写以下代码。行号仅供参考。',
            desc: `
              01 start = input(“你在公司开始工作时几岁?”) <br/>
              02 end = input(“你现在几岁?”) <br/>
              03 <br/>
              <p>你需要完成该程序。应该在第03行使用什么代码？</p>
             `
          },
          {
            id: 11,
            type: 1,
            resultValue: '',
            rightResultValue: 1,
            resultList: [
              { label: '3', value: 1 },
              { label: '13', value: 2 },
              { label: '15', value: 3 },
              { label: '69', value: 4 }
            ],
            name: '计算以下Python算术表达式:(3*(1+2)**2-(2**2)*3)',
            desc: `
              结果是什么? <br/>
              `
          },
          {
            id: 12,
            type: 1,
            resultValue: '',
            rightResultValue: 1,
            resultList: [
              { label: '05 if line !=”\n”: 06 if line != ””:', value: 1 },
              { label: '05 if line !=””: 06 if line != ””:', value: 2 },
              { label: '05 if line !=””: 06 if line != ”\n”:', value: 3 },
              { label: '05 if line !=”\n”: 06 if line != None:', value: 4 }
            ],
            name: '您正在编写一个用于库存自动化的Python程序。你的任务是读物库存交易文件。该文件包含前一天的销售信息，包括商品编号、价格和数量。',
            desc: `
              结果是什么? <br/>
              文件中的数据示例如下: <br/>
              10, 200, 5 <br/>
              20, 100, 1 <br/>
              代码必须满足以下要求: <br/>
              &nbsp&nbsp 必须读取并显示文件的每一行 <br/>
              &nbsp&nbsp 如果遇到空行，必须忽略该行 <br/>
              &nbsp&nbsp 读取所有行后，必须关闭文件 <br/>
              您创建了以下代码，行号仅供参考：<br/>
              01 inventory= open(“inventory.txt”,’r’) <br/>
              02 eof = False <br/>
              03 while eof == False： <br/>
              04    &nbsp&nbsp  line = inventory.readline() <br/>
              05 <br/>
              06 <br/>
              07    &nbsp&nbsp  print(line.strip()) <br/>
              08     else: <br/>
              09    &nbsp&nbsp  print(“文件结束”) <br/>
              10 eof= True <br/>
              11 &nbsp inventory.close() <br/>
             `
          },
          {
            id: 13,
            type: 1,
            resultValue: '',
            rightResultValue: 1,
            resultList: [
              { label: 'open(“local_data”, ”r”)', value: 1 },
              { label: 'open(“local_data, ”r+”)', value: 2 },
              { label: 'open(“local_data”, “w+”)', value: 3 },
              { label: 'open(“local_data”, ”w”)', value: 4 },
            ],
            name: '你为学校开发一个Python程序.你需要同时读写一个文本文件。如果文件不存在，必须创建文件。如果文件包含内容，必须删除全部内容。你应使用哪个代码？',
            desc: `
              `
          },
          {
            id: 14,
            type: 1,
            resultValue: '',
            rightResultValue: 1,
            resultList: [
              { label: 'name = input', value: 1 },
              { label: 'input(name)', value: 2 },
              { label: 'name = input()', value: 3 },
              { label: 'input(“name”)', value: 4 },
            ],
            name: '你为公司开发一个Python 程序.你需要接受用户的输入并将该信息显示在用户的屏幕上。你编写了以下代码。行号仅供参考。',
            desc: `
              01 print(“你的名字：”) </br>
              02 </br>
              03 print(name) </br>
              你应在第02行编写什么代码？
             `
          },
          {
            id: 15,
            type: 1,
            resultValue: '',
            rightResultValue: 1,
            resultList: [
              { label: '将备注添加到代码的最后一行之后，以空白行分隔', value: 1 },
              { label: '将备注置于#符号后添加到任意一行', value: 2 },
              { label: '将备注置于括号中添加到任意一行', value: 3},
              { label: '将备注添加到代码的第一行之前，以空白行分割', value: 4 },
            ],
            name: '你为公司开发一个Python程序。你想要为代码添加备注，以便其他同事能看懂你的程序代码。你应该怎么做？',
            desc: ''
          },
          {
            id: 16,
            type: 2,
            resultValue: [],
            rightResultValue: [2,3],
            resultList: [
              { label: '01 def get_name():', value: 1 },
              { label: '01 def get_name(biker):', value: 2 },
              { label: '01 def get_name(name):', value: 3 },
              { label: '04 def calc_calories():', value: 4 },
              { label: '04 def calc_calories(kms, burn_rate):', value: 5 },
              { label: '04 def calc_calories(kms, calories_per_km):', value: 6 }
            ],
            name: `Adventure WorksCycles 正在创建一个程序，该程序允许用户记录骑行里程。该程序将根据客户记录的公里数发送消息。你创建了以下Python代码，行号仅供参考。`,
            desc: `
              01 </br>
              02     name = input(“你的姓名：”) </br>
              03     return name </br>
              04  </br>
              05     calories = kms * calories_per_km </br>
              06     return calories </br>
              07 distance = int(input(“本周骑行的里程：”)) </br>
              08 burn_rate = 50 </br>
              09 biker = get_name() </br>
              10 calories_burned = calc_calories(distance,burn_rate) </br>
              11 print(biker, “,你消耗了约”, calories_burned, “卡路里”) </br>
              <p>你必须定义两个函数。</p>
              <p>应在第01行和第04行使用哪些代码段，每个正确答案都是解决方案的一部分，选择两项。</p>
            `
          },
          {
            id: 17,
            type: 3,
            resultValue: [{},{},{},{}],
            rightResultValue: [1,2,2,1],
            resultList: [
              { label: '语法检查将忽略第01到04行.', value: 1 , buttonList: ['是', '否']},
              { label: '第02行和第03行的井号（#）不是必须的.', value: 2, buttonList: ['是', '否']},
              { label: '第06行中的字符串将被解释为注释.', value: 2, buttonList: ['是', '否']},
              { label: '否第07行包含行内注释.', value: 1, buttonList: ['是', '否']},
            ],
            name: '你使用python编写了一个函数，该函数用于计算数值的乘幂。你需要确保该函数包含注释。你编写了以下代码，行号仅供参考。',
            desc: `
              01 #calc_power函数用来进行指数运算 <br/>
              02 # x 为底 <br/>
              03 # y 为指数 <br/>
              04 # 返回x的y次方的值 <br/>
              05 def cal_power(x,y): <br/>
              06 &nbsp&nbsp  comment = “#返回值“ <br/>
              07 &nbsp&nbsp return x**y #x 的y次方 <br/>
              <p>对于以下每项陈述，如果陈述为真，请选择“是“，否则请选择”否“.</p>
            `
          },
          {
            id: 18,
            type: 1,
            resultValue: '',
            rightResultValue: 4,
            resultList: [
              { label: 'import math.sqrt as squareRoot', value: 1 },
              { label: 'from math.sqrt as squareRoot', value: 2 },
              { label: 'import sqrt from math as squareRoot', value: 3 },
              { label: 'from math import sqrt as squareRoot', value: 4 }
            ],
            name: '你正在编写一个使用sqrt函数的程序。该程序必须以squareRoot为名引用该函数。你需要导入该函数。你应使用哪个代码段？',
            desc: ''
          },
           {
            id: 19,
            type: 2,
            resultValue: [],
            rightResultValue: [4,5],
            resultList: [
              { label: 'math.ceil(x)', value: 1 },
              { label: 'math.frexp(x)', value: 2 },
              { label: 'math.fmod(x)', value: 3 },
              { label: 'math.fabs(x)', value: 4 },
              { label: 'math.floor(x)', value: 5 }
            ],
            name: '你正在创建一个数值运算的函数，该函数必须满足以下要求:',
            desc: `
              &nbsp&nbsp 将一个filter参数传递到该函数中 </br>
              &nbsp&nbsp 该函数必须使用符合参数的绝对值 </br>
              &nbsp&nbsp 必须去除整数后的小数位 </br>
              <p>你应使用哪两个math函数，每个正确答案都是解决方案的一部分，选择两项。</p>
             `
          },
          {
            id: 20,
            type: 2,
            resultValue: [],
            rightResultValue: [2,3],
            resultList: [
              { label: 'random.randrange(5,11,1)', value: 1 },
              { label: 'random.randrange(5,12,1)', value: 2 },
              { label: 'random.randint(5,11)', value: 3 },
              { label: 'random.randint(5,12)', value: 4 },
            ],
            name: '你正在编写生成随机整数的代码，代码生成的最小值为5，最大值为11.你应使用哪两个函数？每个正确答案都可提供完整的解决方案，选择两项。',
            desc: `
              numList = [1,2,3,4,5] <br/>
              alphaList = [“a”,”b” ,”c” ,”d” ,”e”] <br/>
              print(numList is alphaList) <br/>
              print(numList == alphaList) <br/>
              numList = alphaList <br/>
              print(numList is alphaList) <br/>
              print(numList == alphaList) <br/>
              <p>使用下拉菜单，基于代码段中呈现的信息，选择每个问题的答案选项。</p>
            `
          },
           {
            id: 21,
            type: 2,
            resultValue: [],
            rightResultValue: [2,3,5],
            resultList: [
              { label: 'print(“{0}, {1}”.format(item,sales))', value: 1 },
              { label: 'print(‘ “{0}”, {1}’.format(item,sales))', value: 2 },
              { label: 'print(‘ “%s”, {1}’%(item,sales))', value: 3 },
              { label: 'print(item +”,” +sales)', value: 4},
              { label: 'print(‘ “” ’ + item + ‘ “” ‘ +sales)', value: 5 },
            ],
            name: '你正在编写一个电商程序，该程序接受用户输入并以逗号分隔格式输出数据。你编写了以下代码行以接受输入。item= input(“输入产品名称：”)sales = input(“输入数量：”)输出必须满足以下要求：',
            desc: `
              字符串必须括在双引号中 <br/>
              数字不得括在引号或其他字符中 <br/>
              每一项必须以逗号分割 </br>
              <p>你要完成满足上述要求的代码。</p>
              <p>你应该使用哪三个代码段，每个正确答案都可提供完整的解决方案，选择三项。</p>
             `
          },
          {
            id: 22,
            type: 1,
            resultValue: '',
            rightResultValue: 1,
            resultList: [
              { label: '04-07-17   1234567.89', value: 1 },
              { label: '04-07-2017   1,234,567.8900', value: 2 },
              { label: '2017-April-07   1,234,567.890', value: 3 },
              { label: 'April-07-17   1,234,567.8900', value: 4 },
            ],
            name: '你编写了以下代码。',
            desc: `
              importdatetime </br>
              d = datetime.datetime(2017,4,7) </br>
              print(‘{:%B-%d-%y}’.format(d)) </br>
              num = 1234567.890 </br>
              print(‘{:,.4f}’.format(num)) </br>
              <p>运行程序，输出是什么？</p>
             `
          },
          {
            id: 23,
            type: 1,
            resultValue: '',
            rightResultValue: 2,
            resultList: [
              { label: '返回银行账户的当前余额 defget_balance(): return balance', value: 1 },
              { label: 'defget_balance(): #返回银行账户的当前余额 return balance', value: 2 },
              { label: 'defget_balance(): /*返回银行账户的当前余额*/ return balance', value: 3 },
              { label: '//返回银行账户的当前余额 defget_balance(): return balance', value: 4 },
            ],
            name: 'Woodgrove Bank正在将旧的银行交易程序迁移到Python。你负责为迁移的代码编译器注释。哪个文档注释的语法是正确的？',
            desc: ''
          },
          {
            id: 24,
            type: 1,
            resultValue: '',
            rightResultValue: 1,
            resultList: [
              { label: 'random.random()', value: 1 },
              { label: 'random.randint(0,1)', value: 2 },
              { label: 'random.randrange(0.0, 1.0)', value: 3 },
              { label: 'random.randrange()', value: 4 }
            ],
            name: '你需要编写生成随机 float代码，代码生成的最小值为0.0，最大值为1.0。你应使用什么语句？',
            desc: ''
          },
          {
            id: 25,
            type: 1,
            resultValue: '',
            rightResultValue: 1,
            resultList: [
              { label: 'os对象中不存在path方法', value: 1 },
              { label: 'path对象中不存在isfile方法', value: 2 },
              { label: 'isfile方法不接受单个参数', value: 3 },
              { label: '你需要导入os库', value: 4 }
            ],
            name: '你编写一个函数，该函数读取数据文件，并显示文件的每一行内容。你编写了以下代码，行号仅供参考。',
            desc: `
              01 def read_file(file): </br>
              02 line = None </br>
              03 if os.path.isfile(file): </br>
              04 data = open(file,’r’) </br>
              05 for linein data: </br>
              06 &nbsp&nbsp print(line) </br>
              <p>运行程序时，第03行报错，导致错误的原因是什么？</p>
             `
          },
          {
            id: 26,
            type: 2,
            resultValue: [],
            rightResultValue: [1,2],
            resultList: [
              { label: 'fromrandom import randint print(randint(0,20)*5)', value: 1 },
              { label: 'fromrandom import randrange print(randrange(5,105,5))', value: 2 },
              { label: 'fromrandom import randint print(randint(1,20)*5)', value: 3 },
              { label: 'fromrandom import randrange print(randrange(0,100,5))', value: 4 },
            ],
            name: '你的团队正在为AdventureWorks开发游戏。你需要编写能够产生随机数字的代码，产生的随机数必须满足以下条件：',
            desc: `
              &nbsp&nbsp 数字是5的倍数 <br>
              &nbsp&nbsp 最小数字为5 <br>
              &nbsp&nbsp 最大数字为100 <br>
              <p>哪两个代码段将满足这些要求？每个正确答案都可提供完整的解决方案，选择两项。</p>
            `
          },
          {
            id: 27,
            type: 1,
            resultValue: '',
            rightResultValue: 1,
            resultList: [
              { label: '[1,2,3,4, 1,2,3,4, 1,2,3,4]', value: 1 },
              { label: '[3,6,9,12]', value: 2 },
              { label: '[[1,2,3,4], [1,2,3,4], [1,2,3,4]]', value: 3 },
              { label: '[[1,2],[3,4], [1,2],[3,4], [1,2],[3,4]]', value: 4 },
            ],
            name: '你编写了以下代码：',
            desc: `
              list_1 = [1,2] <br/>
              list_2 = [3,4] <br/>
              list_3 = list_1 + list_2 <br/>
              list_4 = list_3 *3 <br/>
              print(list_4) <br/>
              <p>运行代码，输出的值是什么？</p>
             `
          },
          {
            id: 28,
            type: 1,
            resultValue: '',
            rightResultValue: 1,
            resultList: [
              { label: 'colors[2:2]', value: 1 },
              { label: 'colors[1:2]', value: 2 },
              { label: 'colors[1::2]', value: 3 },
              { label: 'colors[::2]', value: 4 }
            ],
            name: '你为学校开发一个python程序。名为color的列表，包含200种颜色，你需要切片该列表，显示第二，第四，第六…（以类推种）颜色，你应使用哪个哪段代码？',
            desc: ''
          },
          {
            id: 29,
            type: 1,
            resultValue: '',
            rightResultValue: 4,
            resultList: [
              { label: 'if(not minor) and senior:', value: 1 },
              { label: 'if not (minor or senior):', value: 2 },
              { label: 'if (not minor) or senior:', value: 3 },
              { label: 'if not (minor and senior):', value: 4 }
            ],
            name: '你正在为一家舞蹈工作室编写一个python程序。该工作室想要鼓励青少年和老年人报名，未成年人和老人可享受九折优惠。你编写了以下代码，行号仅供参考。',
            desc: `
                01 defget_discount(minor,senior) <br/>
                02 discount = 0.1 <br/>
                03 <br/>
                04 discount = 0 <br/>
                05 return <br/>
                <p>你需要完整代码，应在第零三行添加什么代码？</p>
              `
          },
           {
            id: 30,
            type: 2,
            resultValue: [],
            rightResultValue: [6,7,8],
            resultList: [
              { label: 'average_balance=int(total_deposits / number_of_customers)', value: 1 },
              { label: 'average_balance=total_deposits ** number_of_customers', value: 2 },
              { label: 'average_balance=total_deposits // number_of_customers', value: 3 },
              { label: 'average_balance=float(total_deposits // number_of_customers)', value: 4 }
            ],
            name: 'WoodgroveBank需要生成显示所有客户每天平均余额的报告，报告需要去除余额的小数部分。你应使用哪两个代码段？每个正确答案都可提供完整的解决方案，选择两项。',
            desc: ''
          },
          {
            id: 31,
            type: 1,
            resultValue: '',
            rightResultValue: 1,
            resultList: [
              { label: 'False', value: 1 },
              { label: 'True', value: 2 },
              { label: '4', value: 3 },
              { label: '5', value: 4 }
            ],
            name: '你执行了以下代码：',
            desc: `
              numList = [0,1,2,3,4] <br/>
              print(5 in numList) <br/>
              打印输出的内容是什么？ <br/>
             `
          },
          {
            id: 32,
            type: 3,
            resultValue: [{},{},{},{}],
            rightResultValue: [1,2,1,1],
            resultList: [
              { label: '第 04 行的 print 语句仅在两个数字的值相等时生效。', value: 1, buttonList: ['是', '否']},
              { label: '第 06 行的 print 语句仅在 num1 小于 num2 时生效。', value: 2, buttonList: ['是', '否']},
              { label: '第 08 行的 print 语句仅在 num1 大于 num2 时生效。', value: 3, buttonList: ['是', '否']},
              { label: '第 09 行的 print 语句为无效比较。', value: 4, buttonList: ['是', '否']},
            ],
            name: '你正在编写一个比较数字的 Python 程序。你编写了以下代码，行号仅供参考。',
            desc: `
              01 num1 = eval(input(“请输入第一个数字：”)) <br/>
              02 num2 = eval(input(“请输入第二个数字”)) <br/>
              03 if num1 == num2: <br/>
              04 &nbsp&nbsp print(“两个数字相等。”) <br/>
              05 if num1 <= num2: <br/>
              06 &nbsp&nbsp print(“第一个数字小于第二个数字”) <br/>
              07 if num1 > num2: <br/>
              08 &nbsp&nbsp print(“第一个数字大于第二个数字”) <br/>
              09 if num2 = num1: <br/>
              10 &nbsp&nbsp print(“两个数字相同。”) <br/>
              <p>您需要确保比较，准确无误。</p>
              <p>对于以下每项陈述，如果陈述为真，请选择“是”，否则请选择“否”</p>
            `
          },
          {
            id: 33,
            type: 1,
            resultValue: '',
            rightResultValue: 1,
            resultList: [
              { label: '派对 生日 生日 蛋糕', value: 1 },
              { label: '生日 派对 庆祝 蛋糕', value: 2 },
              { label: '派对 庆祝 生日 蛋糕', value: 3 },
              { label: '生日 庆祝 派对 蛋糕', value: 4 }
            ],
            name: '一位同学，请你调试以下代码：',
            desc: `
              numList = [0,1,2,3,4] <br/>
              x = 4 <br/>
              while x >= 1: <br/>
              if x % 4 == 0: <br/>
              &nbsp&nbsp print(“派对”) <br/>
              elif x – 2 < 0: <br/>
              &nbsp&nbsp print(“蛋糕”) <br/>
              elif x / 3 == 0: <br/>
              &nbsp&nbsp print(“庆祝”) <br/>
              else: <br/>
              &nbsp&nbsp print(“生日”) <br/>
              x = x - 1 <br/>
              <p>屏幕上显示的输出信息是什么？</p>
             `
          },
          {
            id: 34,
            type: 3,
            resultValue: [{},{},{}],
            rightResultValue: [1,2,1],
            resultList:  [
              { label: '第一次打印后显示什么信息？', value: 1, buttonList: ['Test1', 'Test1Test2', 'Test2']},
              { label: '最后进行哪个运算?', value: 2, buttonList: ['Test1', 'Test1Test2', 'Test2']},
              { label: '哪个表达式与函数中的表达式等效?', value: 2, buttonList: ['Test1', 'Test1Test2', 'Test2']}
            ],
            name: '你编写了以下代码：',
            desc: `
              a = ‘Test1’<br/>
              &nbsp&nbsp print(a) <br/>
              b = a <br/>
              a += ‘Test2’ <br/>
              &nbsp&nbsp print(a) <br/>
              &nbsp&nbsp print(b) <br/>
              <p>使用下拉菜单，根据代码段中提供的信息，选择每道问题的，正确答案。</p>
            `
          },
          {
            id: 35,
            type: 1,
            resultValue: '',
            rightResultValue: 3,
            resultList: [
              { label: '第 05 行导致运行时错误，原因是表达式不完整', value: 1 },
              { label: '第 08 行存在语法错误，因为 += 是无效语句', value: 2 },
              { label: '第 07 行导致运行时错误，原因是除数为零', value: 3 },
              { label: '第 05 行存在语法错误，应写为（power == True）', value: 4 },
            ],
            name: 'ailspin Toys 使用 python 控制新玩具”欢乐小丑”。该程序存在错误，导致小丑不停打转。你负责调试下列欢乐小丑的代码，行号仅供参考。',
            desc: `
              01 import math <br/>
              02 # 欢乐小丑的默认动作 <br/>
              03 power = True <br/>
              04 move = 0 <br/>
              05 while(power): <br/>
              06 &nbsp&nbsp if move == 0: <br/>
              07 &nbsp&nbsp&nbsp&nbsp turnValue = math.pi /move <br/>
              08 &nbsp&nbsp&nbsp&nbsp move += 5 <br/>
              09 &nbsp&nbsp else: <br/>
              10 &nbsp&nbsp&nbsp&nbsp turnValue = 0 <br/>
              11 &nbsp&nbsp&nbsp&nbsp move = 0 <br/>
              <p>代码中存在哪个错误？</p>
             `
          },
          {
            id: 36,
            type: 3,
            resultValue: [{},{},{}],
            rightResultValue: [1,2],
            resultList:  [
              { label: '应在第 03 行使用哪个代码段？', value: 1, buttonList: ['while(index < 10):', 'while[index < 10]', 'while(index < 5):', 'while[index < 5]']},
              { label: '应在第 06 行使用哪个代码段？', value: 2, buttonList: ['if numbers[index] ==6:', 'if numbers[index] ==6', 'if numbers(index) =6:', 'if numbers(index) !=6']},
            ],
            name: '你在评估以下代码时发现错误行号仅供参考。',
            desc: `
              01 numbers = [0,1,2,3,4,5,6,7,8,9] <br/>
              02 index = 0 <br/>
              03 while(index < 10) <br/>
              04 &nbsp&nbsp print(numbers[index]) <br/>
              05 <br/>
              06 &nbsp&nbsp if numbers(index) = 6 <br/>
              07 &nbsp&nbsp&nbsp&nbsp break <br/>
              08 &nbsp&nbsp else: <br/>
              09 &nbsp&nbsp&nbsp&nbsp index += 1 <br/>
              <p>你需要更正第 03 行和第 06 行的代码。</p>
              <p>你应该如何更正代码？使用下拉菜单，根据代码段中提供的信息，选择每道问题的答案选项。</p>
              <p>应在第 03 行使用哪个代码段？</p>
            `
          },
          {
            id: 37,
            type: 3,
            resultValue: [{},{},{}],
            rightResultValue: [1,2,3,4],
            resultList:  [
              { label: '第 01 行中的 age 的数据类型是什么？', value: 2, buttonList: ["int", "str", "float", "boo"]},
              { label: '第 03 行中的 born 的数据类型是什么？', value: 1, buttonList: ["int", "str", "float", "boo"]},
              { label: '第 04 行中的 message 的数据类型是什么？', value: 2, buttonList: ["int", "str", "float", "boo"]},
            ],
            name: '你正在编写计算用户出生年份的程序，该程序询问用户的年龄和当前年份，然后输出用户的出生年份，你编写了以下代码，行号仅供参考。',
            desc: `
             01 def checkType(value): <br/>
             01 age = input(“输入你的年龄：”) <br/>
             02 year = input(“输入四位年份：”) <br/>
             03 born = eval(year)-eval(age) <br/>
             04 message = “你出生于” + str(born) +”年” <br/>
             05 print(message) <br/>
             <p>你需要确保该程序，使用适合的数据类型。</p>
             <p>哪些数据类型被使用了？使用下拉菜单，根据代码段中提供的信息，选择每个问题的答案选项。</p>
            `
          },
          {
            id: 38,
            type: 3,
            resultValue: [{},{},{},{}],
            rightResultValue: [1,2,3,4],
            resultList:  [
              { label: '第 04 行输出了什么信息？', value: 1, buttonList: ["<class ‘bool’>", "<class ‘float'>", "<class ‘int’>", "<class ‘str’>"]},
              { label: '第 05 行输出了什么信息？', value: 2, buttonList: ["<class ‘bool’>", "<class ‘float'>", "<class ‘int’>", "<class ‘str’>"]},
              { label: '第 06 行输出了什么信息？', value: 3, buttonList: ["<class ‘bool’>", "<class ‘float'>", "<class ‘int’>", "<class ‘str’>"]},
              { label: '第 07 行输出了什么信息？', value: 4, buttonList: ["<class ‘bool’>", "<class ‘float'>", "<class ‘int’>", "<class ‘str’>"]}
            ],
            name: '你正在编写一个函数，它会返回输入的数据类型。你编写了以下代码，行号仅供参考。',
            desc: `
             01 def checkType(value): <br/>
             02 &nbsp&nbsp dataType = type(value) <br/>
             03 &nbsp&nbsp return dataType <br/>
             04 print(checkType(True)) <br/>
             05 print(checkType(1.0)) <br/>
             06 print(checkType(1)) <br/>
             07 print(checkType(“True”)) <br/>
             <p>使用下拉菜单，根据代码段中提供的信息，选择每个问题的答案选项。</p>
            `
          },
          {
            id: 39,
            type: 3,
            resultValue: [{},{},{},{},{}],
            rightResultValue: [1,2,3,4],
            resultList:  [
              { label: 'age = 2', value: 1, buttonList: ["bool", "float", "int", "str"]},
              { label: 'minor = False', value: 2, buttonList: ["bool", "float", "int", "str"]},
              { label: 'name = “Contoso', value: 3, buttonList: ["bool", "float", "int", "str"]},
              { label: 'weight = 123.5', value: 4, buttonList: ["bool", "float", "int", "str"]},
              { label: 'zip = “81000”', value: 4, buttonList: ["bool", "float", "int", "str"]}
            ],
            name: `
              <p>你正在编写一个 Python 程序。该程序可收集客户资料并将其存储在数据库中。</p>
              <p>这个程序可处理多种数据。</p>
              <p>你需要确保该程序正确处理数据，以使数据可正确存储在数据库中。</p>
              <p>将数据类型与代码段相匹配。答题时，请对应的数据类型。</p>
              <p>每个数据类型可使用一次、多次或不使用。</p>
            `,
            desc: ``
          },
          {
            id: 40,
            type: 3,
            resultValue: [{},{},{}],
            rightResultValue: [3,2,1],
            resultList:  [
              { label: '2', value: 1, buttonList: ["print(a // b)", "print(a % b) ", "print(a / b) "]},
              { label: '3', value: 2, buttonList: ["print(a // b)", "print(a % b) ", "print(a / b) "]},
              { label: '2.75', value: 3, buttonList: ["print(a // b)", "print(a % b) ", "print(a / b) "]},
            ],
            name: '你正在编写一个 Python 程序，该程序用于算术运算。你编写了以下代码：',
            desc: `
              a = 11 </br>
              b = 4 </br>
              <p>请选择每项数学运算的结果是什么？<span style="font-size: 12px">(每个表达式可使用一次、多次或不使用)</span></p>
            `
          },



        ],
        timer: null
      };
    },
    mounted () {
      //     localStorage.setItem('isAnswer', '1');
      // localStorage.setItem('answerWebAnswerList', JSON.stringify(this.answerList));
      // localStorage.setItem('answerWebActiveAnswer', this.activeAnswer + '');
      let isAnswer = localStorage.getItem('isAnswer');
      console.log(isAnswer)
      if (isAnswer && isAnswer == '1') {
        let answerWebAnswerList = JSON.parse(localStorage.getItem('answerWebAnswerList'));
        let answerWebActiveAnswer = localStorage.getItem('answerWebActiveAnswer')
        this.answerList = answerWebAnswerList
        this.activeAnswer = Number(answerWebActiveAnswer) + 1
      }
      if (this.$route.query && this.$route.query.type == 1) {
        this.$refs.answerRuleDialog.answerRuleDialogVisible = true
      }
      this.answerEndTime = new Date().getTime() + 3600000;
      this.countDown = this.showTime()
      this.timer = setInterval (() => {
          this.countDown = this.showTime();
      }, 1000);  //反复执行函数本身
    },
    computed: {
      activeAnswerText () {
        let text ='';
        (this.answerList[this.activeAnswer - 1].type == 2) ? text = '多选题' : text = '单选题'
        return text
      }
    },
    methods: {
      toggleAnswer (activeAnswer) {
        this.activeAnswer = activeAnswer
      },
      submitAnswer (){
        //todo
        let answerResultCount = 0;
        for(let i = 0; i < this.answerList.length; i ++) {
          let it = this.answerList[i];
          if (it.type == 1 && it.resultValue) {
            answerResultCount = answerResultCount + 1
          } else if (it.type == 2) {
            let flag = false
            it.resultValue.forEach((childItem) => {
              if (childItem) {
                flag = true
              }
            })
            if (flag) {
              console.log(it.id)
              answerResultCount = answerResultCount + 1
            }
          } else if (it.type == 3) {
            let flag = false
            it.resultValue.forEach((childItem) => {
              if (JSON.stringify(childItem) != '{}') {
                flag = true
              }
            })
            if (flag) {
              console.log(it.id)
              answerResultCount = answerResultCount + 1
            }
          }
        }
        let text = this.$createElement('div', {
          domProps: {
            innerHTML: `共有试题${this.answerList.length}题,已做<span style="color: red"> ${answerResultCount} </span>题,您确认要交卷吗`
          }
        })
        this.$confirm(text, '交卷', {
          confirmButtonText: '确定交卷',
          cancelButtonText: '再检查一下',
          type: 'warning'
        }).then(() => {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            // this.$message.success("交卷成功")
            localStorage.clear()
            this.$router.replace("/success")
          }, 500)
        }).catch(() => {

        });

      },
      doPrev () {
        if (this.activeAnswer <=1) return
        this.activeAnswer = this.activeAnswer - 1
      },
      doNext () {
        localStorage.setItem('isAnswer', '1');
        localStorage.setItem('answerWebAnswerList', JSON.stringify(this.answerList));
        localStorage.setItem('answerWebActiveAnswer', this.activeAnswer + '');
        this.activeAnswer = this.activeAnswer + 1
      },
      showTime() {
          var nowtime = new Date(),  //获取当前时间
              endtime = new Date(this.answerEndTime);  //定义结束时间
          var lefttime = endtime.getTime() - nowtime.getTime(),  //距离结束时间的毫秒数
              leftd = Math.floor(lefttime/(1000*60*60*24)),  //计算天数
              lefth = Math.floor(lefttime/(1000*60*60)%24),  //计算小时数
              leftm = Math.floor(lefttime/(1000*60)%60),  //计算分钟数
              lefts = Math.floor(lefttime/1000%60);  //计算秒数
              lefth == 0 ? lefth = '00' : lefth
              leftm == 0 ? leftm = '00' : leftm
              lefts == 0 ? lefts = '00' : lefts
              if (lefttime < 1) {
                this.isEnd = true
                this.timer = null
              }
          return lefth + ": " + leftm + ": " + lefts;  //返回倒计时的字符串
      },
      // 必填提交逻辑
      // submitAnswer (){
      //   //todo
      //   let flag = true, errorIndex;
      //   for(let i = 0; i < this.answerList.length; i ++) {
      //     let it = this.answerList[i];
      //     if (it.type == 1 && !it.resultValue) {
      //       flag = false
      //     } else if (it.type == 2) {
      //       let type2Flag = true
      //       it.resultValue.forEach((childItem) => {
      //         if (!childItem) {
      //           type2Flag = true
      //         }
      //       })
      //       flag = type2Flag
      //     } else if (it.type == 3) {
      //       it.resultValue.forEach((childItem) => {
      //         if (JSON.stringify(childItem) == '{}') {
      //           flag = false
      //         }
      //       })
      //
      //     }
      //     if (!flag) {
      //       errorIndex = it.id;
      //       console.log(it)
      //       this.$message.error(`请先完成第${errorIndex}题,再提交`)
      //       break;
      //     }
      //   }
      //   if (!flag) {
      //     return false
      //   }
      //   this.loading = true
      //   setTimeout(() => {
      //     this.loading = false
      //     // this.$message.success("交卷成功")
      //     localStorage.clear()
      //     this.$router.replace("/success")
      //   }, 500)
      // },
    }
  }
</script>

<style lang="less">
  .answer-page{
    background: #eee;
    min-height: 100vh;
    padding-top: 40px;
    .anser-name{
      u{
        text-decoration: underline;
      }
    }
    .answer-desc{
      line-height: 2;
    }
    .judgement{
      .el-radio{
        display: inline-block;
        margin-right: 20px;
        &:first-child{
          margin-left: 40px;
        }
      }
      .el-radio.is-bordered+.el-radio.is-bordered{
        margin-left: 0;
        margin-right: 30px;
      }
    }
    .el-checkbox{
      display: block;
      margin-bottom: 15px;
    }
    .el-checkbox.is-bordered+.el-checkbox.is-bordered{
      margin-left: 0;
      margin-right: 30px;
    }
    .el-radio{
      display: block;
      margin-bottom: 15px;
    }
    .el-radio.is-bordered+.el-radio.is-bordered{
      margin-left: 0;
      margin-right: 30px;
    }
    .answer-content{
      position: relative;
      width: 1000px;
      margin: 0 auto;
    }
    .answer-content-header{
      height: 70px;
      line-height: 70px;
      padding: 0 20px;
      border-bottom: 1px solid #eee;
    }
  }

</style>
