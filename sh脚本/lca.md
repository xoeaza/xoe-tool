1. 定位进程信息 ps aux |grep didi
   找到 4 个相似进程：
   /opt/didi/lca/bin/lcasensor
   /opt/didi/lca/bin/lcaupdater
   /opt/didi/lca/bin/LCAService
   /opt/didi/lca/bin/lcaagent

2. 检查自动启动目录
   /Library/LaunchDaemons
   /Library/LaunchAgents
   ~/Library/LaunchAgents
   /System/Library/LaunchDaemons
   /System/Library/LaunchAgents

   找到 4 份配置文件：
   /Library/LaunchAgents/com.didi.lca.lcaagent.plist
   /Library/LaunchDaemons/com.didi.lca.lcasensor.plist
   /Library/LaunchDaemons/com.didi.lca.lcaservice.plist
   /Library/LaunchDaemons/com.didi.lca.lcaupdater.plist

3. 修改自动启动选项分别修改 com.didi.lca.\_.plist 的内容，
   主要改下面 2 个地方。请确认修改以后的效果是：KeepAlive=false，RunAtLoad=false
   <key>KeepAlive</key>
   <false/>
   <key>RunAtLoad</key>
   <false/>
4. 重新启动电脑验证检查一下进程信息，确认进程已经停止运行 ps aux |grep didi

删除上述提到的相关文件即可避免再次运行
sudo rm -rf /Library/LaunchAgents/com.didi.lca.\_.plist
sudo rm -rf /Library/LaunchDaemons/com.didi.lca.\*.plist
sudo rm -rf /opt/didi/lca
sudo rmdir /opt/didi
End!【以上信息需要在 MacOS 环境下操作】
