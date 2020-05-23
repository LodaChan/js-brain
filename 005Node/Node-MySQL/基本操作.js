var MySQLConnectModule = require('mysql');

var mySQLSN = MySQLConnectModule.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test'
});

mySQLSN.connect();

mySQLSN.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});

connection.query('INSERT INTO t_user(username, pass) VALUES(?, ?)', ['whg', '123'], (err, results) => {
    if (err) {
        console.log(err);
    }
    console.log(results);
})

connection.query('DELETE FROM t_user  WHERE id = 1', (err, results) => {
    if (err) {
        console.log(err);
    }
    console.log(results);
})

connection.query('UPDATE t_user SET pass = "321" WHERE username = "whg"', (err, results) => {
    if (err) {
        console.log(err);
    }
    console.log(results);
})

// SELECT boy.hid,boy.bname,girl.gname FROM boy INNER JOIN girl ON girl.hid = boy.hid;
// SELECT  * FROM a_table a left join b_table b ON a.a_id = b.b_id;
// SELECT boy.hid,boy.bname,girl.gname FROM boy RIGHT JOIN girl ON girl.hid = boy.hid;
// 三表左连接
// SELECT COUNT(*) FROM table_1 t1 
// LEFT JOIN table_2 t2 ON t1.t2id=t2.id 
// LEFT JOIN table_3 t3 ON t2.t3id=t3.id

// 添加索引
// create index 索引名 on 表 (列1,列名2);
// 主键索引
// alter table 表名 add primary key (列名);
// 全文索引
// CREATE TABLE articles (
//     id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
//     title VARCHAR(200),
//     body TEXT,
//     FULLTEXT (title,body)
//   )engine=InnoDB charset utf8;
// 默认utf8
// ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;
// AUTO_INCREMENT 一般用于主键，数值会自动加1

// 存储引擎是基于表的存在。
// InnoDB把表数据放在一个黑盒里，自己管理，它可以把每一个InnoDB存储引擎的表单独放到一个ibd里。
// InnoDB是聚集存放，每张表都按照主键的顺序存储。
// 事务型存储引擎，也是最重要，使用最广泛的存储引擎。在没有特殊情况下，一般优先使用InnoDB存储引擎
// https://www.cnblogs.com/liqiangchn/p/9066686.html


// MyISAM 不一样的一点是它的缓存只缓存索引，
// 而不缓存数据，数据文件的缓存交给操作系统来做，这个其他使用LRU算法缓存数据的大部分数据库不同。
// 索引与数据分离的形式，将数据保存在三个文件中.frm.MYD,.MYIs
// MyISAM不支持行锁，所以读取时对表加上共享锁，在写入是对表加上排他锁。由于是对整张表加锁，相比InnoDB，在并发写入时效率很低
// 不支持事务
connection.end(function (err) {

});

// connection.release();
// connection.destroy();