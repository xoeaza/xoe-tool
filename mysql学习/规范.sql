-- 每个表，都必须存在以下五个字段
-- id 主键
-- `version` 乐观锁
-- is_delete 伪删除
-- gmt_create 创建时间
-- gmt_update 修改时间

-- 所有的创建和删除操作尽量加上判断，以免报错
DROP TABLE IF EXISTS teacher1

-- 物理外键，数据库级别的外键，不建议使用。(仅做了解)
-- 最佳实践，数据库就是单纯的表，只用来存数据，只有行（数据）和列（字段）
-- 我们想使用多张表的数据，想使用外键（程序去实现）
ALTER TABLE `student` 
ADD CONSTRAINT `FK_gradeid` FOREIGN KEY(`gradeid`) REFERENCES `grade`(`gradeid`)
-- ALTER TABLE 表 ADD CONSTRAINT 约束名 FOREIGN KEY（作为外键的列）REFERENCES 那个表（哪个字段）

-- 数据库中的表达式：文本值，列，NULL，函数，计算表达式，系统变量...

--  join on 连接查询
--  where   等值查询

SELECT [ALL | DISTINCT]
{* | table.* [table.field1[as aliasl][,table.field2[as alias2]][,...]]}
FROM table_name[as table_alias]
[left | right | inner join table_name2] --联合查询
[WHERE ...] --指定结果需满足的条件
[GROUP BY ...] --指定结果按照哪几个字段来分组
[HAVING] --过滤分组的记录必须满足的次要条件
[ORDER BY ...]--指定查询记录按一个或多个条件排序
[LIMIT {[offset,]row_count | row_count OFFFSET offset}];
--指定查询的记录从哪条至哪条

-- 事务
SET autocommit = 0; --关闭自动提交
START TRANSACTION --开启一个事务（一组事务）

UPDATE account SET money=money-500 WHERE `name` = 'A' --A减500
UPDATE account SET money=money=500 WHERE `name` = 'B' --B加500

COMMIT; --提交事务，就被持久化了
ROLLBACK; --回滚

SET autocommit = 1; --恢复默认值

-- 索引原则
-- 索引不是越多越好
-- 不要对经常变动数据加索引
-- 小数据量的表不需要加索引
-- 索引一般加载常用来查询的字段上
-- 索引的底层原理参考文档 http://blog.codinglabs.org/articles/theory-of-mysql-index.html
