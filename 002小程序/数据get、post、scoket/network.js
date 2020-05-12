// @usage:在page组件 
// const network = require('.../utils/network.js');

function get(url, params, callback, errFun) {
    wx.request({
        url: url,
        header: 'content-type:application/json',
        data: params,
        method: 'GET',
        success: function (res) {
            callback(res.data);
        },
        fail: function (err) {
            errFun(err);
        }
    })
}

function post(url, params, callback, errFun) {
    wx.request({
        url: url,
        header: 'content-type:application/json',
        data: params,
        method: 'POST',
        success: function (res) {
            callback(res.data);
        },
        fail: function (err) {
            errFun(err);
        }
    })
}

module.exports = {
    get,
    post
}
