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
        let data = this.tUser.find(item => {
            return item.id === id;
        })

        return data;
    },
    fuzzy: function (str) {
        let data = this.tUser.filter(item => {
            return item.name.indexOf(str) > -1;
        })

        return data;
    },
    page: function (pageIndex, pageSize) {
        let data = this.tUser.filter((item, index) => {
            if (index > (((pageIndex - 1) * pageSize) - 1) &&
                index <= ((pageIndex * pageSize) - 1)) {
                return item;
            }
        })

        return data;
    },
    add: function (id, name) {
        try {
            this.tUser.push({ id: id, name: name });
            console.log(this.tUser)
            return this.tUser;
        }
        catch (err) {
            return false;
        }
    },
    update: function (id, name) {
        this.tUser.find((item, index) => {
            if (item.id === id) {
                this.tUser[index].name = name;
                return;
            }
        });

        return this.tUser;
    },
    delete: function (id) {
        this.tUser.splice(this.tUser.findIndex(item => item.id === id), 1);
        return this.tUser;
    }
}