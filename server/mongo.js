'use strict';

var mongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// 拼接 URI
var url = 'mongodb://1.116.158.210:27017/';

mongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    var db = db.db('testdb'); // 选择一个 db
    var col = db.collection('demoCol'); // 选择一个集合(表)
   // 插入数据
    col.insertOne(
        {
            a: 1234,
            something: "yba"
        },
        //可选参数
        //{
        //    w: 'majority' // 开启 “大多数”模式，保证数据写入 Secondary 节点
        //},
        function(err, r) {
            console.info("err:", err);
            assert.equal(null, err);
            // 断言写入成功
            assert.equal(1, r.insertedCount);
            // 查询数据
            col.find().toArray(function(err, docs) {
                assert.equal(null, err);
                console.info("docs:", docs);
                db.close();
            });
        }
    );
});