//index.js
//获取应用实例
var app = getApp();
Page({
  STANDARD: 22,
  rules: [
    [18.5, 24, 28],
    [18.5, 25, 30, 35, 40],
    [18.5, 23, 25, 30]
  ],
  ruleConfig: ['偏瘦', '正常', '偏胖', '肥胖', '重度肥胖', '极重度肥胖'],
  dangerConfig: ['低（但其它疾病危险性增加）', '平均水平', '增加', '中度增加', '严重增加', '非常严重增加'],
  data: {
    array: ['中国标准', '国际标准', '亚洲标准'],
    index: 0,
    score_0: 0,
    score_1: 0,
    height_0: 0,
    weight_0: 0,
    height_1: 0,
    weight_1: 0,
    goal: 0,
    physicalCondition_1: '未知',
    physicalCondition_0: '未知',
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
      height_0: e.detail.value
    })
  },
  bindKeyWeightInput0: function (e) {
    this.setData({
      weight_0: e.detail.value
    })
  },
  bindKeyHightInput1: function (e) {
    this.setData({
      height_1: e.detail.value
    })
  },
  bindKeyWeightInput1: function (e) {
    this.setData({
      weight_1: e.detail.value
    })
  },
  calculateBtn: function (e) {
    if (!this.data.height_0 || !this.data.height_1) {
      wx.showToast({
        title: '请输入身高'
      })
      return false;
    }

    if (!this.data.weight_0 || !this.data.weight_1) {
      wx.showToast({
        title: '请输入体重'
      })
      return false;
    }
    this.calculate0();


    this.physicalConditionCalculate0();
    this.physicalConditionCalculate1();

  },
  //计算IBM值
  calculate0: function () {
    let score_0 = 0;
    let height_0 = this.data.height_0 / 100;
    score_0 = (this.data.weight_0 / (height_0 * height_0)).toFixed(1);
    this.setData({
      score_0: score_0
    })

    let score_1 = 0;
    let height_1 = this.data.height_1 / 100;
    score_1 = (this.data.weight_1 / (height_1 * height_1)).toFixed(1);
    this.setData({
      score_1: score_1
    })
    let goal = 0;
    if (score_0 >= score_1) {
      goal = (score_1 / score_0) * 100
    } else {
      goal = (score_0 / score_1) * 100
    }
    this.setData({
      goal: goal
    })
  },

  //身体状况计算
  physicalConditionCalculate0: function () {
    let rule = this.rules[this.data.index];
    let value = 0;
    let score_0 = + this.data.score_0;
    let length = rule.length;
    if (score_0 >= rule[length - 1]) {
      value = length;
    } else {
      for (let length = rule.length, i = length; i >= 1; --i) {
        if (score_0 < rule[i] && score_0 >= rule[i - 1])
          value = i;
      }
    }


    this.setData({
      physicalCondition_0: this.ruleConfig[value]
    })

    this.setData({
      danger: this.dangerConfig[value]
    })
  },
  physicalConditionCalculate1: function () {
    let rule = this.rules[this.data.index];
    let value = 0;
    let score_1 = + this.data.score_1;
    let length = rule.length;
    if (score_1 >= rule[length - 1]) {
      value = length;
    } else {
      for (let length = rule.length, i = length; i >= 1; --i) {
        if (score_1 < rule[i] && score_1 >= rule[i - 1])
          value = i;
      }
    }


    this.setData({
      physicalCondition_1: this.ruleConfig[value]
    })

    this.setData({
      danger: this.dangerConfig[value]
    })
  }
})
