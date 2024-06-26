#!/bin/bash

# 定义包含多个字段的字符串
codes='KTG8N3 36FIJP UNWDDP 6TMP3C'

# 将字符串分割为数组
IFS=' ' read -r -a codes_array <<< "$codes"

# 循环替换每个字段并调用 curl 命令
for code in "${codes_array[@]}"
do
    # 打印每个 code 的值
    echo "Current code: $code"
    
    # 构建新的请求体数据
    new_data='{"code":"'$code'","headers":{"noninductive":true}}'

    # 执行 curl 命令并替换 code 字段的值
    curl 'https://juchats.com/gw/chatpay/order/exchange' \
      -H 'Accept: application/json, text/plain, */*' \
      -H 'Accept-Language: zh-TW,zh;q=0.9,zh-CN;q=0.8' \
      -H 'Connection: keep-alive' \
      -H 'Content-Type: application/json' \
      -H 'Cookie: _ga=GA1.1.1905729253.1709700375; _hjSession_3891016=eyJpZCI6IjI2NDRlY2I5LWIzYmYtNDA4NS1iZWIwLWI2MGU1NzMwMTk0ZSIsImMiOjE3MDk3MDAzNzY3NTksInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjoxfQ==; _hjSessionUser_3891016=eyJpZCI6IjNhZThjODMxLTNiNTUtNTYxNi05NmNjLWFhMDg0NzkzNzVmNiIsImNyZWF0ZWQiOjE3MDk3MDAzNzY3NTgsImV4aXN0aW5nIjp0cnVlfQ==; _ga_BGPCRVYLM7=GS1.1.1709700375.1.1.1709700444.0.0.0' \
      -H 'DNT: 1' \
      -H 'Jtoken: 306e5640204019c481a30dd91ee281afa157c3792364cdda493f28fcc755c6e7' \
      -H 'Origin: https://juchats.com' \
      -H 'Referer: https://juchats.com/gift' \
      -H 'Sec-Fetch-Dest: empty' \
      -H 'Sec-Fetch-Mode: cors' \
      -H 'Sec-Fetch-Site: same-origin' \
      -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36' \
      -H 'sec-ch-ua: "Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"' \
      -H 'sec-ch-ua-mobile: ?0' \
      -H 'sec-ch-ua-platform: "Windows"' \
      --data-raw "$new_data" \
      --compressed
done