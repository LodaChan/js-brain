// 还需要 setInterval 2分钟1次空包，保持心跳
const config = require('../config')
const host = config.host.split('//')[1];

class Socket {

    constructor(senderFansId, receiverFansId) {
        this.senderFansId = senderFansId
        this.pageUnload = false
        this.connected = false
        this.wssHost = `wss://${host}/weipinChatWebSocket/${senderFansId}/${receiverFansId}`
        this.scoketInstance = wx.connectSocket({
            url: this.wssHost,
            success() {

            },
            fail(err) {
                console.error(err)
            }
        })

        wx.onSocketOpen((res) => {
            this.connected = true
        })


        wx.onSocketError((res) => {
            this.connected = false
            wx.connectSocket({
                url: this.wssHost
            })
        })


        wx.onSocketClose((res) => {
            this.connected = false
            if (!this.pageUnload) {
                wx.connectSocket({
                    url: this.wssHost
                })
            }
        })

    }

    sendMessage(data) {
        if (!this.connected) {
            return;
        }
        wx.sendSocketMessage({
            data: JSON.stringify(data)
        })
    }


    onMessage(callback) {
        if (typeof (callback) != 'function') {
            return
        }
        wx.onSocketMessage((res) => {
            const data = JSON.parse(res.data)
            callback(data)
        })
    }

    close() {
        this.pageUnload = true;
        this.scoketInstance.close({
            reason: 'page close',
            success() {
                console.log('scoket close')
            }
        });
    }
}

export default Socket