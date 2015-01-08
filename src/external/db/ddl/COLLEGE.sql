DROP TABLE COLLEGE CASCADE CONSTRAINTS;

CREATE TABLE COLLEGE 
(
  COLLEGE_CODE VARCHAR2(9) NOT NULL 
, COLLEGE_NAME VARCHAR2(100) NOT NULL 
, PROVINCE_CODE VARCHAR2(6) NOT NULL 
, COLLEGE_TYPE VARCHAR2(2) NOT NULL 
, COLLEGE_CATEGORY VARCHAR2(2) NOT NULL 
, FLAG_EDUCATION_DIRECT VARCHAR2(1) NOT NULL 
, FLAG_985 VARCHAR2(1) NOT NULL 
, FLAG_211 VARCHAR2(1) NOT NULL 
, FLAG_CENTER_MINISTRY VARCHAR2(1) NOT NULL 
, FLAG_SELF_ENROLLMENT VARCHAR2(1) NOT NULL 
, CREATE_DATE DATE 
, CREATE_USER VARCHAR2(20) 
, UPDATE_DATE DATE 
, UPDATE_USER VARCHAR2(20) 
);

COMMENT ON TABLE COLLEGE IS '院校信息';
COMMENT ON COLUMN COLLEGE.COLLEGE_CODE IS '院校代码';
COMMENT ON COLUMN COLLEGE.COLLEGE_NAME IS '院校名称';
COMMENT ON COLUMN COLLEGE.PROVINCE_CODE IS '省份代码';
COMMENT ON COLUMN COLLEGE.COLLEGE_TYPE IS '院校性质';
COMMENT ON COLUMN COLLEGE.COLLEGE_CATEGORY IS '院校类别';
COMMENT ON COLUMN COLLEGE.FLAG_EDUCATION_DIRECT IS '是否教育部直属院校(0:否,1:是)';
COMMENT ON COLUMN COLLEGE.FLAG_985 IS '是否985工程院校(0:否,1:是)';
COMMENT ON COLUMN COLLEGE.FLAG_211 IS '是否211工程院校(0:否,1:是)';
COMMENT ON COLUMN COLLEGE.FLAG_CENTER_MINISTRY IS '是否中央部委院校(0:否,1:是)';
COMMENT ON COLUMN COLLEGE.FLAG_SELF_ENROLLMENT IS '是否自主招生试点院校(0:否,1:是)';
COMMENT ON COLUMN COLLEGE.CREATE_DATE IS '创建时间';
COMMENT ON COLUMN COLLEGE.CREATE_USER IS '创建者';
COMMENT ON COLUMN COLLEGE.UPDATE_DATE IS '更新时间';
COMMENT ON COLUMN COLLEGE.UPDATE_USER IS '更新者';

ALTER TABLE COLLEGE ADD CONSTRAINT COLLEGE_PK PRIMARY KEY (COLLEGE_CODE);