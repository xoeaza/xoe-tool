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