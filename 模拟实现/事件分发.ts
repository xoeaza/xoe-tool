// 事件分发es6写法
export class EventDispatcher {
  private _callbacks_: object = {};

  public addListener(eventType: string | symbol, func: (...args: any[]) => void) {
    if (this._callbacks_[eventType] !== undefined) {
      this._callbacks_[eventType].push(func);
    } else {
      this._callbacks_[eventType] = [func];
    }
  }

  public removeListener(eventType: string | symbol, func?: (...args: any[]) => void) {
    if (this._callbacks_[eventType]) {
      if (func) {
        this._callbacks_[eventType] = this._callbacks_[eventType].filter((element = (): void => { }) => element !== func);
      } else {
        this._callbacks_[eventType] = [];
      }
    }
  }

  public dispatchEvent(eventType: string | symbol, ...args: any[]) {
    if (this._callbacks_[eventType]) {
      const _callbacks_: Array<() => void> = this._callbacks_[eventType];
      for (const callback of _callbacks_) {
        try {
          callback.apply(this, args);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }

  public addOnceListener(eventType: string | symbol, func: (...args: any[]) => void) {
    const that = this;
    this.addListener(eventType, function once(...args) {
      func.apply(that, args);
      that.removeListener(eventType, once);
    });
  }

  public removeAllListener() {
    for (const key in this._callbacks_) {
      if (this._callbacks_[key])
        this._callbacks_[key] = [];
    }
  }
}
// 装饰器
export function EventDecorator() {
  const listenerMap = new Map();
  return {
    dispatcher<EventDispatch extends { new(...args: any[]): EventDispatcher }>(constructor: EventDispatch) {
      return class extends constructor {
        constructor(...args: any[]) {
          super(...args);
          listenerMap.forEach((listeners, eventType) => {
            for (const listener of listeners) {
              this.addListener(eventType, listener);
            }
          });
        }
      };
    },
    listen(eventType: string) {
      if (!Array.isArray(listenerMap.get(eventType))) listenerMap.set(eventType, []);
      return (desc: any) => {
        if (listenerMap.get(eventType).length) {
          listenerMap.get(eventType).push(desc.value);
        } else {
          listenerMap.set(eventType, [desc.value]);
        }
        return desc.value;
      };
    },
    unlisten(eventType: string, func?: () => void) {
      if (func === undefined) {
        listenerMap.set(eventType, []);
      } else {
        const listeners = listenerMap.get(eventType);
        if (listeners && listeners.length) {
          listenerMap.set(eventType, listeners.filter((listener: () => void) => listener !== func));
        }
      }
    }
  };
}
