module.exports = [{
  name: '首页',
  id: 'Home',
  icon: 'el-icon-s-home'
}, {
  name: '基础',
  id: 'basic',
  icon: 'el-icon-s-data',
  sub: [{
    name: 'Layout 布局',
    componentName: 'BasicLayout'
  }, {
    name: 'Container 布局容器',
    componentName: 'BasicContainer'
  }]
}, {
  name: 'Form',
  id: 'form',
  icon: 'el-icon-folder-opened',
  sub: [{
    name: 'Radio 单选框',
    componentName: 'FormRadio'
  }, {
    name: 'Checkbox 多选框',
    componentName: 'FormCheckbox'
  }]
}, {
  name: '数据展示',
  id: 'data',
  icon: 'el-icon-pie-chart',
  sub: [{
    name: '列表数据展示增删改查',
    componentName: 'BasicLayout'
  }, {
    name: 'Container 布局容器',
    componentName: 'BasicContainer'
  }]
}]
