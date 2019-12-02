/**
 * Returns the parentNode or the host of the element
 * @method
 * @argument {Element} element
 * @returns {Element} parent
 */
export default function getParentNode(element) {
    if (element.nodeName === 'HTML') {
        return element;
    }
    return element.parentNode || element.host;
}
