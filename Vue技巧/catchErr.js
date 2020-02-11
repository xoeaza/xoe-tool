import { Message } from 'element-ui'

export default async function catchErr(promise, successInfo, errorInfo, showErrorInfo = true) {
    try {
        const res = await promise
        if (successInfo) Message.success(successInfo)
        return [null, res]
    } catch (error) {
        const msg = error && error.data ? error.data.error_msg || error.data.msg : ''
        const i = errorInfo || msg || 'Failed! Please try again.'
        if (showErrorInfo) {
            Message.error(i)
        }
        return [error, null]
    }
}
