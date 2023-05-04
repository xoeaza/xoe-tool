-- https://wangchujiang.com/mysql-tutorial/21-minutes-MySQL-basic-entry.html
-- 登录MySQL
mysql -h 127.0.0.1 -u <用户名> -p<密码>.   # 默认用户名<root>，-p 是密码，⚠️参数后面不需要空格
mysql -D 所选择的数据库名 -h 主机名 -u 用户名 -p
mysql> exit # 退出 使用 “quit;” 或 “\q;” 一样的效果
mysql> status;  # 显示当前mysql的version的各种信息
mysql> select version(); # 显示当前mysql的version信息
mysql> show global variables like 'port'; # 查看MySQL端口号

-- 创建数据库
-- 创建一个名为 samp_db 的数据库，数据库字符编码指定为 gbk
create database samp_db character set gbk;
drop database samp_db; -- 删除 库名为 samp_db 的库
show databases;        -- 显示数据库列表。
use samp_db;           -- 选择创建的数据库 samp_db 
show tables;           -- 显示 samp_db 下面所有的表名字
describe 表名;          -- 显示数据表的结构
delete from 表名;       -- 清空表中记录

-- 创建数据库表
-- 如果数据库中存在user_accounts表，就把它从数据库中drop掉
DROP TABLE IF EXISTS `user_accounts`;
CREATE TABLE `user_accounts` (
  `id`             int(100) unsigned NOT NULL AUTO_INCREMENT primary key,
  `password`       varchar(32)       NOT NULL DEFAULT '' COMMENT '用户密码',
  `reset_password` tinyint(32)       NOT NULL DEFAULT 0 COMMENT '用户类型：0－不需要重置密码；1-需要重置密码',
  `mobile`         varchar(20)       NOT NULL DEFAULT '' COMMENT '手机',
  `create_at`      timestamp(6)      NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_at`      timestamp(6)      NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  -- 创建唯一索引，不允许重复
  UNIQUE INDEX idx_user_mobile(`mobile`)
)
ENGINE=InnoDB DEFAULT CHARSET=utf8
COMMENT='用户表信息';

-- 删除数据库表
DROP TABLE 表名称;     -- 用于删除数据库中的现有表。
TRUNCATE TABLE 表名称; -- 用于删除表内的数据，但不删除表本身。

-- 增删改查

-- SELECT
-- 从 Customers 表中选择 CustomerName 和 City 列：
SELECT CustomerName, City FROM Customers;
-- 从 Customers 表中选择所有列：
SELECT * FROM Customers;
-- 表 station 取个别名叫 s，表 station 中包含 字段 id=13 或者 14 的，并且 id 不等于 4 的 查询出来，只显示 id
SELECT s.id from station s WHERE id in (13,14) and id not in (4);
-- 从表 users 选取 id=3 的数据，并只拉一条数据(据说能优化性能)
SELECT * FROM users where id=3 limit 1
-- 结果集中会自动去重复数据
SELECT DISTINCT Company FROM Orders 
-- 表 Persons 字段 Id_P 等于 Orders 字段 Id_P 的值，
-- 结果集显示 Persons表的 LastName、FirstName字段，Orders表的OrderNo字段
SELECT p.LastName, p.FirstName, o.OrderNo FROM Persons p, Orders o WHERE p.Id_P = o.Id_P

-- gbk 和 utf8 中英文混合排序最简单的办法 
-- ci是 case insensitive, 即 “大小写不敏感”
SELECT tag, COUNT(tag) from news GROUP BY tag order by convert(tag using gbk) collate gbk_chinese_ci;
SELECT tag, COUNT(tag) from news GROUP BY tag order by convert(tag using utf8) collate utf8_unicode_ci;

-- UPDATE
-- update语句设置字段值为另一个结果取出来的字段
UPDATE user set name = (SELECT name from user1 WHERE user1 .id = 1 )
WHERE id = (SELECT id from user2 WHERE user2 .name='小苏');
-- 更新表 orders 中 id=1 的那一行数据更新它的 title 字段
UPDATE `orders` set title='这里是标题' WHERE id=1;

-- INSERT
-- 向表 Persons 插入一条字段 LastName = JSLite 字段 Address = shanghai
INSERT INTO Persons (LastName, Address) VALUES ('JSLite', 'shanghai');
-- 向表 meeting 插入 字段 a=1 和字段 b=2
INSERT INTO meeting SET a=1,b=2;
-- 
-- SQL实现将一个表的数据插入到另外一个表的代码
-- 如果只希望导入指定字段，可以用这种方法：
-- INSERT INTO 目标表 (字段1, 字段2, ...) SELECT 字段1, 字段2, ... FROM 来源表;
INSERT INTO orders (user_account_id, title) SELECT m.user_id, m.title FROM meeting m where m.id=1;

-- 向表 charger 插入一条数据，已存在就对表 charger 更新 `type`,`update_at` 字段；
INSERT INTO `charger` (`id`,`type`,`create_at`,`update_at`) VALUES (3,2,'2017-05-18 11:06:17','2017-05-18 11:06:17') ON DUPLICATE KEY UPDATE `id`=VALUES(`id`), `type`=VALUES(`type`), `update_at`=VALUES(`update_at`);

-- DELETE
-- 在不删除table_name表的情况下删除所有的行，清空表。
DELETE FROM table_name
-- 或者
DELETE * FROM table_name
-- 删除 Person 表字段 LastName = 'JSLite' 
DELETE FROM Person WHERE LastName = 'JSLite' 
-- 删除 表meeting id 为2和3的两条数据
DELETE from meeting where id in (2,3);

-- WHERE
-- 从表 Persons 中选出 Year 字段大于 1965 的数据
SELECT * FROM Persons WHERE Year>1965
-- 从 Customers 表中选择 Country = Mexico 的所有数据：
SELECT * FROM Customers WHERE Country='Mexico';
-- 从 Customers 表中选择 CustomerID = 1 的所有数据：
SELECT * FROM Customers WHERE CustomerID=1;

-- AND & OR & NOT
-- 从 Customers 表中选择所有字段，其中 Country 为 Germany 且城市必须为 Berlin 或 München（使用括号构成复杂表达式）：
SELECT * FROM Customers WHERE Country='Germany' AND (City='Berlin' OR City='München');
-- 从 Customers 表中选择 Country 不是 Germany 和 NOT "USA" 的所有字段：
SELECT * FROM Customers WHERE NOT Country='Germany' AND NOT Country='USA';

-- ORDER BY
-- 从 Customers 表中选择所有字段，按 Country 列排序：
SELECT * FROM Customers ORDER BY Country;
-- 从 Orders 表中选择 Company, OrderNumber 字段，按 Company 列排序：
SELECT Company, OrderNumber FROM Orders ORDER BY Company
-- 从 Orders 表中选择 Company, OrderNumber 字段，按 Company 列降序排序：
SELECT Company, OrderNumber FROM Orders ORDER BY Company DESC
-- 从 Orders 表中选择 Company, OrderNumber 字段，按 Company 列降序排序，并 OrderNumber 以顺序显示：
SELECT Company, OrderNumber FROM Orders ORDER BY Company DESC, OrderNumber ASC

-- GROUP BY
-- 列出了 Orders 每个发货人 Shippers 发送的订单 Orders 数量
SELECT Shippers.ShipperName, COUNT(Orders.OrderID) AS NumberOfOrders FROM Orders
LEFT JOIN Shippers ON Orders.ShipperID = Shippers.ShipperID
GROUP BY ShipperName;

-- IN IN 语法 运算符允许您在 WHERE 子句中指定多个值。运算符是多个 OR 条件的简写。
-- 从表 Persons 选取 字段 LastName 等于 Adams、Carter
SELECT * FROM Persons WHERE LastName IN ('Adams','Carter')
-- 从表 Customers 选取 Country 值为 'Germany', 'France', 'UK' 的所有数据
SELECT * FROM Customers WHERE Country IN ('Germany', 'France', 'UK');
-- 从表 Customers 选取 Country 值不为 'Germany', 'France', 'UK' 的所有数据
SELECT * FROM Customers WHERE Country NOT IN ('Germany', 'France', 'UK');
-- 从表 Customers 选取与 Suppliers 表 Country 字段相同的所有数据：
SELECT * FROM Customers WHERE Country IN (SELECT Country FROM Suppliers);

-- UNION UNION 语法 操作符用于合并两个或多个 SELECT 语句的结果集
-- 列出所有在中国表（Employees_China）和美国（Employees_USA）的不同的雇员名
SELECT E_Name FROM Employees_China UNION SELECT E_Name FROM Employees_USA

-- 列出 meeting 表中的 pic_url，
-- station 表中的 number_station 别名设置成 pic_url 避免字段不一样报错
-- 按更新时间排序 UNION ALL 不去重
SELECT id,pic_url FROM meeting UNION ALL SELECT id,number_station AS pic_url FROM station  ORDER BY update_at;
-- 通过 UNION 语法同时查询了 products 表 和 comments 表的总记录数，并且按照 count 排序
SELECT 'product' AS type, count(*) as count FROM `products` union select 'comment' as type, count(*) as count FROM `comments` order by count;

-- BETWEEN 包含最小值和最大值
-- 选择 Products 表中 Price 字段在 10 到 20 之间的所有：
SELECT * FROM Products WHERE Price BETWEEN 10 AND 20;

-- AS
-- 创建两个别名，一个用于 CustomerID 的 ID 别名列，一个用于 CustomerName  的 Customer 别名列：
SELECT CustomerID AS ID, CustomerName AS Customer FROM Customers;

-- 这句意思是查找所有 Employee 表里面的数据，并把 Employee 表格命名为 emp。
-- 当你命名一个表之后，你可以在下面用 emp 代替 Employee.
-- 例如 SELECT * FROM emp.
SELECT * FROM Employee AS emp

-- 列出表 Orders 字段 OrderPrice 列最大值，
-- 结果集列不显示 OrderPrice 显示 LargestOrderPrice
SELECT MAX(OrderPrice) AS LargestOrderPrice FROM Orders

-- 显示表 users_profile 中的 name 列
SELECT t.name from (SELECT * from users_profile a) AS t;

-- 表 user_accounts 命名别名 ua，表 users_profile 命名别名 up
-- 满足条件 表 user_accounts 字段 id 等于 表 users_profile 字段 user_id
-- 结果集只显示mobile、name两列
SELECT ua.mobile,up.name FROM user_accounts as ua INNER JOIN users_profile as up ON ua.id = up.user_id;

-- JOIN
-- JOIN: 如果表中有至少一个匹配，则返回行
-- INNER JOIN:在表中存在至少一个匹配时，INNER JOIN 关键字返回行。
-- LEFT JOIN: 即使右表中没有匹配，也从左表返回所有的行
-- RIGHT JOIN: 即使左表中没有匹配，也从右表返回所有的行
-- FULL JOIN: 只要其中一个表中存在匹配，就返回行(MySQL 是不支持的，通过 LEFT JOIN + UNION + RIGHT JOIN 的方式 来实现)
