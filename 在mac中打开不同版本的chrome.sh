# 首先可在https://www.chromedownloads.net找到你需要的版本的chrome安装包，下载安装后，选同时保留两者
# 然后来执行下面的命令，把Google Chrome 48那改成你安装的低版本的chrome名，xoeaza那换成你的用户名
# 执行成功的话，会弹出一个安装页面，直接按引导走即可，最后在链接栏输入chrome://version/查看版本是否正确
# 注意不要打开设置，否则可能会自动同步至最新版本
"/Applications/Google Chrome 56.app/Contents/MacOS/Google Chrome" --user-data-dir="/Users/xoeaza/Library/Application Support/Google/Chrome56" > /dev/null 2>&1 &