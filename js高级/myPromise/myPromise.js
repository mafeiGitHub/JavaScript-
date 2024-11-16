const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class MyPromise {
  constructor(executor) {
    executor(this.resolve, this.reject);
  }
  // promise状态
  status = PENDING;
  // 成功值
  value = undefined;
  // 失败原因
  reason = undefined;
  //成功回调
  successCallback = [];
  //失败回调
  failCallback = [];
  resolve = (value) => {
    // 如果状态不是等待 阻止程序向下执行
    if (this.status !== PENDING) return;
    // 将状态改为成功
    this.status = FULFILLED;
    // 保存成功值
    this.value = value;
    // 判断成功回调是否存在，存在则调用
    // this.successCallback && this.successCallback(value);
    while (this.successCallback.length)
      this.successCallback.shift()(this.value);
  };
  reject = (reason) => {
    // 如果状态不是等待 阻止程序向下执行
    if (this.status !== PENDING) return;
    // 将状态改为失败
    this.status = REJECTED;
    // 保存失败原因
    this.reason = reason;
    // 判断失败回调是否存在，存在则调用
    // this.failCallback && this.failCallback(reason);
    while (this.failCallback.length) this.failCallback.shift()(this.reason);
  };
  then(successCallback, failCallback) {
    // 判断状态
    if (this.status === FULFILLED) {
      successCallback(this.value);
    } else if (this.status === REJECTED) {
      failCallback(this.reason);
    } else {
      //等待状态
      // 将成功回调和失败回调存储起来
      this.successCallback.push(successCallback);
      this.failCallback.push(failCallback);
    }
  }
}
module.exports = MyPromise;
