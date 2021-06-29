import { MockResponse } from "../types";
const jstt = (window as any).jstt
import { getInsterfaceName, getInterfacePath } from './getInterface'
import { getInterface } from "./api";
import { addBtnAndEvent, copyToClip, Toast } from "./dom";
import { memoize } from 'lodash-es'
const memoGetInterFace = memoize(getInterface)

abstract class CompileBase {
  abstract selector: string // 需要插入位置的类名，用于鉴定
  abstract innerText: string // 需要插入位置的部分内容文字，用于鉴定
  abstract suffixName: string // 后缀名
  public mockData: MockResponse // mock接口返回
  public parseData //解析后json
  public btnClsName?: string = 'btnCls__' // 按钮类名，用于鉴定
  public btnText?: string = '复制到剪贴板' // 按钮内的文字
  public isOnPage?: boolean = false // 是否在页面上有
  // 解析data成schema，由子类实现
  abstract setParseData()
  // 执行请求解析复制的流程
  public async run() {
    let path = getInterfacePath()
    const res = await memoGetInterFace(path)
    this.mockData = res
    this.setParseData()
    this.compileAndClip(this.parseData, this.mockData)
  }
  // 增加监听函数
  public addBtnAndEvent() {
    addBtnAndEvent({
      selector: this.selector,
      innerText: this.innerText,
      btnClsName: this.btnClsName,
      btnText: this.btnText,
      compile: this.run.bind(this)
    })
  }
  public getInsterfaceName() {
    return getInsterfaceName(this.mockData.path, this.suffixName)
  }
  // 生成ts并复制到剪贴板
  public async compileAndClip(parseData: any, mockData: MockResponse) {
    try {
      let ts = await jstt.compile(
        parseData,
        this.getInsterfaceName(),
        {
          bannerComment: (`
          /**\n  接口名称： ${mockData.title};\n  author: ${mockData.username};\n  mock: ${location.href}\n*/`)
        }
      )
      copyToClip(ts)
    } catch (error) {
      console.error(error)
      Toast({
        msg: '复制失败',
        type: 'error'
      })
    }
  }
}

export class Res_bodyCompile extends CompileBase {
  selector = '.interface-title'
  innerText = '返回数据'
  btnClsName = 'compileRes_body'
  btnText = '复制全部response类型'
  suffixName = 'Res'
  setParseData() {
    this.parseData = JSON.parse(this.mockData.res_body)
  }
}

export class Res_body_dataCompile extends CompileBase {
  selector = '.interface-title'
  innerText = '返回数据'
  btnClsName = 'compileRes_body_data'
  btnText = '复制data部分类型'
  suffixName = 'ResData'
  setParseData() {
    this.parseData = JSON.parse(this.mockData.res_body).properties.data
  }
}

export class Req_queryCompile extends CompileBase {
  selector = '.col-title'
  innerText = 'Query'
  suffixName = 'Query'
  btnText = '复制query类型'
  setParseData() {
    const schema = {
      type: "object",
      properties: {},
      required: []
    }
    this.mockData.req_query.forEach((query) => {
      schema.properties[query.name] = {
        type: 'string',
        description: query.desc,
      }
      if (query.required === '1') {
        schema.required.push(query.name)
      }
    })
    this.parseData = schema
  }
}

export class Req_bodyComplile extends CompileBase {
  selector = '.col-title'
  innerText = 'Body'
  suffixName = 'ReqBody'
  btnText = '复制body类型'
  setParseData() {
    this.parseData = JSON.parse(this.mockData.req_body_other)
  }
}
