const menusOptions = {
  id: 'page',
  title: '新建菜单 page',
  contexts: ['page'],
};
// 创建菜单
chrome.contextMenus.create(menusOptions, () => {
  console.log('新建菜单 page')
});

const selectionOptions = {
  id: 'selection',
  title: '新建菜单 selection',
  contexts: ['selection'],
};
// 创建菜单
chrome.contextMenus.create(selectionOptions);

// 点击事件
chrome.contextMenus.onClicked.addListener((options) => {
  console.log(options, '==options=')
})