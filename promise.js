const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

class myPromise {
  constructor(value) {
    this.status = PENDING
    this.value = value
    this.resolveCallBacks = []
    this.rejectCallBacks = []
  }

  resolve(value) {
    if (value instanceof myPromise) {
      return value.then(resolve, reject)
    }
    const that = this
    if (this.status === PENDING) {
      this.status = RESOLVED
      this.value = value
      this.resolveCallBacks.forEach((callBack) => {
        callBack(that.value)
      })
    }
  }

  reject() {
    const that = this
    if (this.status === PENDING) {
      this.status = REJECTED
      this.value = value
      this.rejectCallBacks.forEach((callBack) => {
        callBack(that.value)
      })
    }
  }

  then(onFulFilled, onRejected) {
    // const that = this
    onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : v => v
    onRejected = typeof onFulFilled === 'function' ? onRejected : r => { throw r }
    if (this.status === PENDING) {
      this.resolveCallBacks.push(onFulFilled)
      this.rejectCallBacks.push(onRejected)
    } else if (this.status === RESOLVED) {
      onFulFilled(this.value)
    } else {
      onRejected(this.value)
    }
  }
}