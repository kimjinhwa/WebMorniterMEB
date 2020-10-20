var express = require('express');
var router = express.Router();

/**
* BaseUrl : web.js router에 선언한 BaseUrl을 표시. request url을 쉽게 파악하기 위함
*  : /club
*/

/**
* 실제 업무처리 로직이 명시된 router import
*/
var clubList = require('./clubList');    //클럽목록
var clubDetail = require('./clubDetail');    //클럽상세

/* clubList 출력. 담당개발자 A */
router.get('/list', function (req, res) {
    clubList.list(req, res);
});

/* 클럽상세. 담당개발자 B */
router.get('/detail/:clubSn', function (req, res) {
    clubDetail.detail(req, res);
});

module.exports = router;