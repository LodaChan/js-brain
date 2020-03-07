module.exports = {
    tUser: [
        {
            id: 1,
            name: "aaaa"
        },
        {
            id: 2,
            name: "bbbb"
        },
        {
            id: 3,
            name: "cccc"
        },
        {
            id: 4,
            name: "dddd"
        },
        {
            id: 5,
            name: "eeee"
        },
        {
            id: 6,
            name: "ffff"
        },
        {
            id: 7,
            name: "gggg"
        },
        {
            id: 8,
            name: "hhhh"
        },
        {
            id: 9,
            name: "iiii"
        },
        {
            id: 10,
            name: "jjjj"
        },
    ],
    get: function (id) {
        console.log("get>id", id, typeof id)
        // console.log("get>this",this)
        // console.log("get>this.tUser",this.tUser)
 
        let data = this.tUser.find(function (item) {
            return item.id === id;
        })

        return data;
    },
    fuzzy: function (str) {
        console.log("fuzzy>str", str, typeof str)
         
        let data = this.tUser.filter(function (item) {
            return item.name.indexOf(str) > -1;
        })

        return data;
    },
    page: function (pageIndex, pageSize) {

    },
    update: function (id, newData) {

    },
    delete: function (id) {

    }
}