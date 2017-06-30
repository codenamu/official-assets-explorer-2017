고위공직자 재산 공개
================
사단법인 코드의 프로젝트 그룹 코드나무가 만든 고위공직자 재산 공개 프로젝트 사이트입니다. 매년 3월말 공개되는 고위공직자 재산 정보를 기반으로 누구나 쉽게 공직자들의 재산 내역을 검색해볼 수 있습니다.(http://financial-disclosure.codenamu.org/)

배경
---
공직자들의 재산 공개는 공직자윤리법에 근거해 1993년 처음 시행됐습니다. 재산공개제도는 고위공직자의 재산을 투명하게 공개함으로써 부정부패를 예방하기 위한 제도입니다. 공직자윤리법에 따라 정부, 국회, 대법원, 헌법재판소, 중앙선거관리위원회 등에는 각각 공직자윤리위원회가 설치되어 있고 이들 공직자윤리위원회는 관보나 공보를 통해 고위공직자들의 재산 내역을 공개하고 있습니다. 하지만 일반적으로 시민들이 각 기관의 공보나 관보를 직접 찾아 공직자들의 재산형성 과정을 확인한다는 것은 어려운 일로, 정보가 각 기관마다 산발적으로 공개되고, 포맷이 조금씩 달라 검색하기도 쉽지 않습니다. 


이를 해결하기 위해 코드나무는 2016년부터 고위공직자의 재산 내역을 모아 쉽게 파악할 수 있는 다양한 프로젝트를 진행해 왔습니다. 뉴스타파와 2016년 데이터를 이용하여 웹사이트를 제작하였고, 2017년에는 중앙일보와 함께 다수의 기사 시리즈를 작업하였습니다. 웹사이트와 함께, 사이트 구축 시 이용했던 데이터를 엑셀 형태로 만들어 공개합니다. 자유롭게 사용하시고, 혹시 잘못된 부분이 있다면 여기로 연락 주시기 바랍니다.


개발
-----------

1. config 폴더 및 파일 생성
  ```/config
  mkdir config
  ```
2. config.json 파일 생성(DB : postgresql)
  ``` DB 커넥션 정보 입력
{  
  "development": {
    "username": "",
    "password": "",
    "database": "",
    "host": "",
    "port": 5432,
    "dialect": "postgres"
  }
}  
  ```
  
3. POSTGRESQL에 `official_assets` 이름의 데이터베이스 설치 및 테이블 모델 생성
  ```postgresql
  CREATE DATABASE official_assets WITH ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';
  sequelize model:create --name officer --attributes organization:string,division:string,job_title:string,name:string,year_of_investigating:integer
  sequelize model:create --name tengible_asset --attributes category:integer,relation:integer,type_of_property:integer,description:text,previous_price:integer,increase_price:integer,increase_deal_price:integer,decrease_price:integer,decrease_deal_price:integer,present_price:integer,reason_for_change:text,year_of_investigating:integer
  sequelize model:create --name tengible_estate_asset --attributes category:integer,relation:integer,type_of_property:integer,description:text,previous_price:integer,increase_price:integer,increase_deal_price:integer,decrease_price:integer,decrease_deal_price:integer,present_price:integer,reason_for_change:text,year_of_investigating:integer
  sequelize model:create --name political_asset --attributes category:integer,relation:integer,type_of_property:integer,description:text,previous_price:integer,increase_price:integer,increase_deal_price:integer,decrease_price:integer,decrease_deal_price:integer,present_price:integer,reason_for_change:text,year_of_investigating:integer
  sequelize model:create --name financial_asset --attributes category:integer,relation:integer,type_of_property:integer,description:text,previous_price:integer,increase_price:integer,increase_deal_price:integer,decrease_price:integer,decrease_deal_price:integer,present_price:integer,reason_for_change:text,year_of_investigating:integer
  sequelize model:create --name liability_asset --attributes category:integer,relation:integer,type_of_property:integer,description:text,previous_price:integer,increase_price:integer,increase_deal_price:integer,decrease_price:integer,decrease_deal_price:integer,present_price:integer,reason_for_change:text,year_of_investigating:integer
  sequelize model:create --name summary --attributes organization:string,division:string,job_title:string,name:string,totals:integer,tengibles:integer,tengible_estates:integer,tengible_estate_amounts:integer,financials:integer,relations:integer,fluctuates:integer,year_of_investigating:integer
  sequelize db:migrate
  ```
  
4. pm2 설치(optional)  
  ```
  npm install -g pm2
  ```
  
5. 실행

  ```bash  
  npm install
  npm start
  ```

Credit
------------
- 데이터 가공 : 김승범
- 기획 : 강현숙
- 디자인 : 소원영
- 개발 : 조용식

