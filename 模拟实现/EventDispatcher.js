class EventDispatcher {
  constructor() {
    this._callbacks_ = {}
  }

  addListener(eventType, func) {
    if (this._callbacks_[eventType] !== undefined) {
      this._callbacks_[eventType].push(func)
    } else {
      this._callbacks_[eventType] = [func]
    }
  }

  removeListener(eventType, func) {
    if (this._callbacks_[eventType]) {
      if (func) {
        this._callbacks_[eventType] = this._callbacks_[eventType].filter(element => element !== func)
      } else {
        this._callbacks_[eventType] = []
      }
    }
  }

  dispatchEvent(eventType, ...args) {
    if (this._callbacks_[eventType]) {
      const _callbacks_ = this._callbacks_[eventType]
      for (const callback of _callbacks_) {
        try {
          callback.apply(this, args)
        } catch (e) {
          console.error(e)
        }
      }
    }
  }

  addOnceListener(eventType, func) {
    const that = this
    this.addListener(eventType, function once(...args) {
      func.apply(that, args)
      that.removeListener(eventType, once)
    })
  }

  removeAllListener() {
    for (const key in this._callbacks_) {
      if (this._callbacks_[key]) this._callbacks_[key] = []
    }
  }
}

export default EventDispatcher

// ===========================
class Emitter {
  constructor() {
    this.callBacks = {}
  }

  addListener(event, func) {
    if (!this.callBacks[event]) {
      this.callBacks[event] = []
    }
    this.callBacks[event].push(func)
  }

  removeListener(event, func) {
    if (this.callBacks[event]) {
      const index = this.callBacks[event].indexOf(func)
      this.callBacks[event].splice(index, 1)
    }
  }

  dispatchEvent(event, ...args) {
    if (this.callBacks[event]) {
      for (const callback of this.callBacks[event]) {
        callback.apply(this, args)
      }
    }
  }

  addOnceListener(event, func) {
    const once = (...args) => {
      func(...args)
      this.removeListener(event, once)
    }
    this.addListener(event, once)
  }
}
