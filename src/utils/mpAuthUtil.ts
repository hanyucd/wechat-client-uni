
// 定义权限项的类型
type AuthItem = {
  apiName: string[];
  modalContent: string;
};

// 定义权限列表的类型
type AuthListType = {
  userLocation: AuthItem;
  record: AuthItem;
  writePhotosAlbum: AuthItem;
};

// 微信小程序授权列表
const authList: AuthListType = {
  userLocation: {
    apiName: ['getLocation', 'chooseLocation'],
    modalContent: '需要获取您的地理位置，请确认授权'
  },
  record: {
    apiName: ['startRecord'],
    modalContent: '需要获取您的录音权限，请确认授权'
  },
  writePhotosAlbum: {
    apiName: ['saveImageToPhotosAlbum'],
    modalContent: '需要获取您的相册访问权限，请确认授权'
  },
};

/**
 * 引导去授权设置页面
 * @param {String} key 权限名称
 */
const _openModal = (key: string) => {
  return new Promise(resolve => {
    uni.showModal({
      title: '提示',
      content: authList[key as keyof AuthListType]?.modalContent,
      confirmColor: '#2F84EB',
      cancelColor: '#333',
      success: res => {
        if (res.confirm) {
          uni.openSetting({
            success: res2 => {
              const authSetting = res2.authSetting;
              if (authSetting[`scope.${ key }`] === true) {
                uni.showToast({ title: '授权成功', icon: 'none', duration: 1000 });
                resolve(true);
              } else {
                uni.showToast({ title: '授权失败', icon: 'none', duration: 1000 });
                resolve(false);
              }
            },
            fail: error => {
              resolve(false);
            }
          });
        } else {
          resolve(false);
        }
      }
    });
  });
};

/**
 * 获取小程序授权权限
 * @param {String} key 权限名称
 */
const getMpSetting = (key: string) => {
  if (typeof key === 'string' && !(key in authList)) return false;

  return new Promise(resolve => {
    uni.getSetting({
      success: async (res: UniApp.GetSettingSuccessResult) => {
        // res.authSetting['scope.userLocation'] == undefined 表示初始化进入该页面
        // res.authSetting['scope.userLocation'] == false     表示 非初始化进入该页面,且拒绝授权
        // res.authSetting['scope.userLocation'] == true      表示 非初始化进入该页面,且同意授权
        const authSetting = res.authSetting;
        // 用户拒绝过
        if (authSetting[`scope.${key}` as keyof UniApp.AuthSetting] === false) {
          // 引导去授权页
          const authResult = await _openModal(key);
          resolve(authResult);
        } else {
          // 已授权，或者还未授权
          resolve(true);
        }
      }
    });
  });
};

export default { getMpSetting };
