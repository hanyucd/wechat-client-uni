/**
 * 图片预览
 * @param {Array} imgList 图片列表
 * @param {String} imgUrl 当前显示图片链接
 * @param {String} imgUrlkey 图片资源链接名
 */
// export const previewImg = (imgList, curImgUrl, imgUrlKey = '') => {
//   const imgUrls = imgUrlKey ? imgList.map(item => item[imgUrlKey]) : imgList;
//   uni.previewImage({ urls: imgUrls, current: curImgUrl });
// };

/**
 * 实现延迟执行的效果，即等待指定的时间后才会继续执行后续的代码
 */
export const sleepWait = (ms: number) => {
  return new Promise((resolve) => {

    setTimeout(resolve, ms);
  });
};
