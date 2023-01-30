import requests

proxy = '192.168.8.26:8080'
proxies = {'http': 'http://' + proxy, 'https': 'https://' + proxy}

headers = {
    'authority': 'weibo.com',
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'zh-TW,zh;q=0.9,zh-CN;q=0.8',
    'cache-control': 'no-cache',
    'client-version': 'v2.35.3',
    'cookie':
    'SINAGLOBAL=4378273806153.57.1635303366501; UOR=,,www.google.com.hk; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9W5CS0mFn2Eneda2s5wWb7rs5JpX5KMhUgL.Fo-pSh2Reoep1hq2dJLoIpjLxKqLB.eLBo2LxKqL1-qLB-qLxKMLB-eL1K2t; ULV=1658476311174:2:1:1:5767333866646.815.1658476311151:1635303366505; PC_TOKEN=e6d04c8a54; ALF=1695353700; SSOLoginState=1663817700; SCF=AuXqxmUJn0Ce_pQ-XMK38SPoNLt5JebhWKW6zcoI3NyJ_WMjG4RDnPNmeEt5ZU2gOXrVQm5aPia9R-XqeZ3GieM.; SUB=_2A25OL6e0DeRhGeNP71MZ8i3NwzqIHXVtXJ58rDV8PUNbmtAKLUjEkW9NToR4-T3jpA1sAUufsTdiVEP0gO1k7SsT; XSRF-TOKEN=QIrIoRLns4o9J_tiSg_iTyP1; WBPSESS=wVv1xE5HArtoBS6Sn_X3c2DhOKmn__sDPHSqJ-FL6A9WQN2weoPPmoaEiJM1g3YvYvTeSwiTTq_UOs88TeAW_g0hyXhkd-852xtQ5UPBIixe-I00AG2Li8Q9ApRb8iY4oOoLdXiOrbFB8FSOkXtXyg==',
    'dnt': '1',
    'pragma': 'no-cache',
    'referer': 'https://weibo.com/',
    'sec-ch-ua':
    '"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'server-version': 'v2022.09.21.1',
    'traceparent': '00-fcdea8fd3f833b8d1b12e1edb9d04952-3d114c58bd97b698-00',
    'user-agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
    'x-requested-with': 'XMLHttpRequest',
    'x-xsrf-token': 'QIrIoRLns4o9J_tiSg_iTyP1',
}

response = requests.get('https://weibo.com/ajax/side/cards/sideBusiness',
                        proxies=proxies,
                        headers=headers)

response_dict = response.json()
print(response_dict)
