const sendSchema = function(action, param, callbackId) {
    const iframeNode = document.createElement('iframe')
    const url = `jsbridge://${action}?data=${param}&callbackId=${callbackId}`
    iframeNode.style.width = '1px'
    iframeNode.style.height = '1px'
    iframeNode.style.display = 'none'
    iframeNode.src = url
    document.body.appendChild(iframeNode)
    setTimeout(function() {
        iframeNode.remove()
    }, 100)
}

const jsBridge = {
    callbackId: Math.floor(Math.random() * 2000000000),
    callbacks: {},
    invoke(action, params, onSuccess, onFail) {
        const self = this
        this.callbackId++
        this.callbacks[self.callbackId] = {
            success: onSuccess,
            fail: onFail,
        }
        sendSchema(action, params, this.callbackId)
    },
    callbackSuccess(callbackId, params) {
        try {
            jsBridge.callbackFromNative(callbackId, params, true)
        } catch (e) {
            console.log('Error in error callback: ' + callbackId + ' = ' + e)
        }
    },
    callbackError(callbackId, params) {
        try {
            jsBridge.callbackFromNative(callbackId, params, false)
        } catch (e) {
            console.log('Error in error callback: ' + callbackId + ' = ' + e)
        }
    },
    callbackFromNative(callbackId, params, isSuccess) {
        const callback = this.callbacks[callbackId]
        if (callback) {
            if (isSuccess) {
                callback.success && callback.success(callbackId, params)
            } else {
                callback.fail && callback.fail(callbackId, params)
            }
            delete jsBridge.callbacks[callbackId]
        }
    },
}

export default jsBridge
