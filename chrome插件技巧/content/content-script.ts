
import debounce from 'lodash-es/debounce'
import { Req_bodyComplile, Req_queryCompile, Res_bodyCompile, Res_body_dataCompile } from './utils/compileAndClip'
const resbodyComp = new Res_bodyCompile()
const resbodydataComp = new Res_body_dataCompile()
const queryComp = new Req_queryCompile()
const bodyComp = new Req_bodyComplile()

document.addEventListener('DOMContentLoaded', () => {

  var observer = new MutationObserver(debounce(() => {
    resbodyComp.addBtnAndEvent()
    queryComp.addBtnAndEvent()
    resbodydataComp.addBtnAndEvent()
    bodyComp.addBtnAndEvent()
  }, 200) as any);

  observer.observe(
    document.body,
    {
      childList: true,
      subtree: true,
      characterData: true,
    }
  );
})
