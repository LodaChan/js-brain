class moviesList extends Array {
    constructor(name, ...movies) {
        super(...movies);
        this.name = name;
    }
    add(movie) {
        this.push(movie)            // push 方法来自Array的继承
    }
    topStar(limit) {                // 排序 方法来自Array的继承
        return this.sort((a, b) => { return a.star > b.star ? -1 : 1 }).slice(0, limit)
    }
}

// 构造函数传参
var movies = new moviesList('电影列表',
    { name: '泰坦尼克号', star: 9.7 },
    { name: '星际穿越', star: 9.8 },
    { name: '流浪地球', star: 8.5 },
    { name: '陈翔六点半之重楼别', star: 9.3 }
)
movies.add({ name: '小黄人', star: 9 })