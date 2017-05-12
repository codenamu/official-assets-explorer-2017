고위공직자 재산 공개
================
CC Korea와 뉴스타파가 함께 만든 고위공직자 재산 공개 프로젝트 사이트입니다. 매년 3월말 공개되는 고위공직자 재산 정보를 기반으로 누구나 쉽게 공직자들의 재산 내역을 검색해볼 수 있습니다.(http://financial-disclosure.codenamu.org/)

배경(뉴스타파)
---
크리에이티브 커먼즈 코리아에서는 2011년 오픈데이터 프로젝트 코드나무를 시작하였습니다.
우리 사회에 보다 많은 데이터가 공개되고 보다 많은 사람들이 데이터에 접근하고 활용할 수 있도록 아래와 같은 다양한 활동을 이어오고 있습니다.

데이터를 활용하여 사회 문제를 해결하기 위한 해커톤
공공데이터 관련 정책 제언, 책 출판
IT기술로 사회 문제 해결을 위한 커뮤니티 코드포서울
시민단체와 미디어의 역할은 사람들에게 꼭 필요한 이야기를 전달하고자 노력하고 있습니다. 사람들을 중요한 사실과 메시지를 전달하는 것입니다. 중요한 사실을 대중들에게 인식 시키고 마음을 움직일때에 데이터는 중요한 역할을 합니다. 그러나 미디어, 시민 단체에서는 데이터를 관리하고 활용할 수 있는 기술, 데이터를 보다 쉽고 다양한 방법으로 읽고 전달할 수 있는 기술이부족한 경우가 있습니다.

그로 인해 중요한 데이터들이 관리되지 못하고 공개되지 못하거나 중요한 사실들이 효과적으로 전달되지 못하는 경우도 종종 있습니다. 그동안 데이터를 통한 다양한 프로젝트를 해온 코드나무는 다양한 시민단체, 미디어들과 협력하여 국내 오픈 데이터가 더욱 풍성해질 수 있도록 데이터를 공개하고 사람들에게 꼭 필요한 이야기를 데이터 저널리즘 활동을 통해 효과적으로 전달할 수 있는 프로젝트를 이어가고자 합니다.

그 첫번째 프로젝트로 뉴스타파와 함께 한 고위공직자 재산 데이터를 활용한 프로젝트입니다.
우리 사회를 책임지고 있는 고위공직자 들의 재산 정보는 그 책임성과 청렴도로 비추어 보아 많은 시민들이 꼭 함께 지켜볼 필요가 있는 정보입니다. 2013년부터 데이터 형태로 보관해왔던 뉴스타파와 함께 누구나 사용할 수 있는 형태로 데이터를 공개하여 보다 다양한 언론 기관과 일반인들이 자유롭게 활용할 수 있게 되기를 바랍니다. 또한 누구나 접근 가능하고 검색 가능하도록 구현하여 데이터를 모르는 일반인들도 쉽게 활용할 수 있기를 바랍니다.

배경(뉴스타파)
---
고위공직자 재산 공개 제도는 1993년 김영삼 대통령 때 처음 시작됐습니다. 공직자들의 재산을 공개함으로써 공직사회의 투명성을 늘리기 위한 취지로 도입된 제도입니다. 그러나 시민들이 이 자료를 활용해서 공직자를 감시하는 것은 매우 어려운 일입니다. 우선 이 자료는 전자관보 사이트를 통해 공개되는데, 사이트에서는 내용 검색을 하기가 어렵습니다. 불과 몇 해 전인 2010년 자료만 해도 pdf 자료가 문자 정보가 들어 있지 않은 스캔 파일로 되어 있어서, 내용 검색이 불가능합니다.

뉴스타파는 지난 2013년부터 그림으로 되어 있는 정보를 문자인식하고, 검증하는 작업을 반복하여 고위공직자 재산 자료를 데이터화하는 작업을 해왔습니다. 올해는 그 결과물을 온라인 상에 처음 공개합니다. 언론사 기자, 시민단체 관계자를 포함한 일반 시민 누구나 관심있는 공직자를 검색하고, 재산 정보를 직접 확인할 수 있도록 했습니다. 또한 저희가 만든 데이터를 인용 절차를 거쳐 누구나 사용할 수 있도록 CC라이선스로 공개할 예정입니다.

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

