//index.js
//获取应用实例
var app = getApp();
Page({
  STANDARD: 22,
  rules: [[0.1,0.3,0.5,0.7,1],
  [],
  []
  ],
  
  
  ruleConfig: ['100', '90', '80', '70', '50'],
  dangerConfig: ['低（但其它疾病危险性增加）', '平均水平', '增加', '中度增加', '严重增加', '非常严重增加'],
  data: {
    array: ['中国标准', '国际标准', '亚洲标准'],
    index: 0,
    score_0: 0,
    score_1: 0,
    score_2:0,
    goal:"0",
    income_0: 0,
    pay_0: 0,
    income_1: 0,
    pay_1: 0,
    weightStandard: 0,
    danger: '未知',
    charLt: '<'
  },
  onLoad: function () {

  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindKeyHightInput0: function (e) {
    this.setData({
     income_0: e.detail.value
    })
  },
  bindKeyWeightInput0: function (e) {
    this.setData({
      pay_0: e.detail.value
    })
  },
  bindKeyHightInput1: function (e) {
    this.setData({
      income_1: e.detail.value
    })
  },
  bindKeyWeightInput1: function (e) {
    this.setData({
      pay_1: e.detail.value
    })
  },
  calculateBtn: function (e) {
    if (!this.data.income_0 || !this.data.income_1) {
      wx.showToast({
        title: '请输入收入'
      })
      return false;
    }

    if (!this.data.pay_0 || !this.data.pay_1) {
      wx.showToast({
        title: '请输入支出'
      })
      return false;
    }
    this.calculate0();





  },
 
  calculate0: function () {
    let score_0 = 0;
    let income_1 = this.data.income_1;
    let income_0 = this.data.income_0;
    score_0 =Number(income_0)+Number(income_1);
    this.setData({
      score_0: score_0
    })
    let score_1 = 0;
    let pay_1 = this.data.pay_1;
    let pay_0 = this.data.pay_0;
    score_1 = Number(pay_1) + Number(pay_0);
    this.setData({
      score_1: score_1
    })
    let score_2 = 0;
    score_2 = score_1/score_0;
    this.setData({
      score_2: score_2
    })
    
    let rule = this.rules[this.data.index];
    let value = 0;
    let length = rule.length;
 
    if (score_2 >= rule[length - 1]) {
      value = length;
    } else {
      for (let length = rule.length, i = length; i >= 1; --i) {
        if (score_2 < rule[i] && score_2 >= rule[i - 1])
          value = i;
      }
    }


    this.setData({
      goal: this.ruleConfig[value]
    })

  },
 


})
