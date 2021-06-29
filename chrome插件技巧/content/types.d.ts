export interface MockResponse {
  add_time: number
  api_opened: boolean
  catid: number
  desc: string
  edit_uid: number
  index: number
  markdown: string
  method: "POST" | "GET"
  path: string
  project_id: number
  query_path: {path: string, params: Array<unknown>}
  req_body_form: Array<unknown>
  req_body_is_json_schema: boolean
  req_body_other: string
  req_body_type: "json" | string
  req_headers: any
  req_params: Array<unknown>
  req_query: Array<{desc: string,
    example: string,
    name: string
    required: string
    _id: string}>
  res_body: string
  res_body_is_json_schema: true
  res_body_type: "json" | string
  status: string
  tag: Array<unknown>
  title: string
  type: string
  uid: number
  up_time: number
  username: string
  __v: 0
  _id: number
}