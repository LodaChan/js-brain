wx.request({
    method: 'GET',
    url: "https://xxx.com",
    header: {
        'content-type': 'application/json'
    },
    data: {
        id: "my id"
    },
    success: function (res) {
        console.log(res.data);
    }
});
