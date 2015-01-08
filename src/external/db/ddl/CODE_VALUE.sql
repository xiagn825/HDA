DROP TABLE CODE_VALUE CASCADE CONSTRAINTS;

CREATE TABLE CODE_VALUE 
(
  CATEGORY_CODE VARCHAR2(2) NOT NULL 
, CATEGORY_NAME VARCHAR2(20) NOT NULL 
, CODE VARCHAR2(2) NOT NULL 
, VALUE VARCHAR2(50) NOT NULL 
, CREATE_DATE DATE 
, CREATE_USER VARCHAR2(20) 
, UPDATE_DATE DATE 
, UPDATE_USER VARCHAR2(20) 
);

COMMENT ON TABLE CODE_VALUE IS '各类别代码内容参照信息';
COMMENT ON COLUMN CODE_VALUE.CATEGORY_CODE IS '类别代码';
COMMENT ON COLUMN CODE_VALUE.CATEGORY_NAME IS '类别名称';
COMMENT ON COLUMN CODE_VALUE.CODE IS '代码';
COMMENT ON COLUMN CODE_VALUE.VALUE IS '内容';
COMMENT ON COLUMN CODE_VALUE.CREATE_DATE IS '创建时间';
COMMENT ON COLUMN CODE_VALUE.CREATE_USER IS '创建者';
COMMENT ON COLUMN CODE_VALUE.UPDATE_DATE IS '更新时间';
COMMENT ON COLUMN CODE_VALUE.UPDATE_USER IS '更新者';

ALTER TABLE CODE_VALUE ADD CONSTRAINT CODE_VALUE_PK PRIMARY KEY (CATEGORY_CODE, CODE);