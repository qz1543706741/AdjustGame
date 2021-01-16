//用户基本信息填报表单
const userBasicInfoForm = [{
  lable: '基本信息',
  template_name: 'label',
  flex: 'flex-column'
}, {
  lable: '玩家昵称',
  template_name: 'input',
  flex: 'flex-row',
  name: 'nickname',
  placeholder: '中/英文,不得以数字开头'
}, {
  lable: '玩家年龄',
  template_name: 'input',
  flex: 'flex-row',
  name: 'age',
  placeholder: '大于18岁',
  rules: {
    type: 'number',
    maxlength: 2
  }
}, {
  lable: '考研信息',
  template_name: 'label',
  flex: 'flex-column'
}, {
  lable: '考研所报院校代码或名称',
  template_name: 'input',
  flex: 'flex-column',
  name: 'adjust_school_info',
  placeholder: '建议填写院校代码',
  inputValueKey:'school_name'
}, {
  lable: '考研所报专业代码或名称',
  template_name: 'input',
  flex: 'flex-column',
  name: 'adjust_major_info',
  placeholder: '建议填写专业代码'
}, {
  lable: '考研分数',
  template_name: 'input',
  flex: 'flex-row',
  name: 'adjust_score',
  placeholder: '请填写考研分数',
  rules: {
    type: 'number',
    maxlength: 3
  }
}, {
  lable: '本科信息',
  template_name: 'label',
  flex: 'flex-column',
  name: 'nickname'
}, {
  lable: '本科院校代码或名称',
  template_name: 'input',
  flex: 'flex-column',
  name: 'undergraduate_school_info',
  placeholder: '建议填写院校代码'
}, {
  lable: '本科专业代码或名称',
  template_name: 'input',
  flex: 'flex-column',
  name: 'undergraduate_major_info',
  placeholder: '建议填写专业代码'
}, {
  lable: '本科专业排名',
  template_name: 'input',
  flex: 'flex-row',
  name: 'undergraduate_rank',
  placeholder: '请填写您的本科专业排名',
  rules: {
    type: 'number',
    maxlength: 5
  }
}]

//单人闯关信息填报表单
const singleForm = [{
  flex: 'adjust-form',
  template_name: 'variable_form',
  has_add_btn: true,
  add_btn_url: getApp().globalData.imageUrl + 'add.png',
  form_item: [{
    name:'adjust_info',
    template_name: 'input_group',
    flex: 'input-group',
    lable: '调剂志愿',
    group_name: 'adjust_single',
    group_index: 1,
    group_items: [{
      lable: '调剂院校代码或名称',
      name: 'adjust_school_info',
      placeholder: '建议填写院校代码'
    }, {
      lable: '调剂专业代码或名称',
      name: 'adjust_major_info',
      placeholder: '建议填写专业代码'
    }]
  }]
}]




//关卡配置
const gameLevelList = [{
    lable: '单人填报',
    levelId: '0',
    extendClass: '',
    isPassed: false,
    isBggray: false
  },
  {
    lable: '人机对战',
    levelId: '1',
    extendClass: 'animate__delay-1s',
    isPassed: false,
    isBggray: true
  },
  {
    lable: '真实对战',
    levelId: '2',
    extendClass: 'animate__delay-2s',
    isPassed: false,
    isBggray: true
  }
]

module.exports = {
  userBasicInfoForm,
  gameLevelList,
  singleForm
}