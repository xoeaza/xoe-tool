class StorageFn {
  constructor() {
    this.ls = window.localStorage;
    this.ss = window.sessionStorage;
  }

  /* -----------------cookie--------------------- */
  setCookie(name, value, day) {
    let setting = arguments[0];
    if (Object.prototype.toString.call(setting).slice(8, -1) === "Object") {
      for (let i in setting) {
        if ({}.hasOwnProperty.call(setting, i)) {
          let oDate = new Date();
          oDate.setDate(oDate.getDate() + day);
          document.cookie = i + "=" + setting[i] + ";expires=" + oDate;
        }
      }
    } else {
      let oDate = new Date();
      oDate.setDate(oDate.getDate() + day);
      document.cookie = name + "=" + value + ";expires=" + oDate;
    }
  }

  getCookie(name) {
    let arr = document.cookie.split("; ");
    for (let i = 0; i < arr.length; i++) {
      let arr2 = arr[i].split("=");
      if (arr2[0] == name) {
        return arr2[1];
      }
    }
    return "";
  }

  removeCookie(name) {
    this.setCookie(name, 1, -1);
  }

  /* -----------------localStorage--------------------- */
  setLocal(key, val) {
    let setting = arguments[0];
    if (Object.prototype.toString.call(setting).slice(8, -1) === "Object") {
      for (let i in setting) {
        if ({}.hasOwnProperty.call(setting, i)) {
          this.ls.setItem(i, JSON.stringify(setting[i]));
        }
      }
    } else {
      this.ls.setItem(key, JSON.stringify(val));
    }
  }

  getLocal(key) {
    if (key && this.ls.getItem(key)) return JSON.parse(this.ls.getItem(key));
    return null;
  }

  removeLocal(key) {
    this.ls.removeItem(key);
  }

  clearLocal() {
    this.ls.clear();
  }

  /* -----------------sessionStorage--------------------- */
  setSession(key, val) {
    let setting = arguments[0];
    if (Object.prototype.toString.call(setting).slice(8, -1) === "Object") {
      for (let i in setting) {
        if ({}.hasOwnProperty.call(setting, i)) {
          this.ss.setItem(i, JSON.stringify(setting[i]));
        }
      }
    } else {
      this.ss.setItem(key, JSON.stringify(val));
    }
  }

  getSession(key) {
    if (key && this.ss.getItem(key)) return JSON.parse(this.ss.getItem(key));
    return null;
  }

  removeSession(key) {
    this.ss.removeItem(key);
  }

  clearSession() {
    this.ss.clear();
  }
}

export default new StorageFn();
