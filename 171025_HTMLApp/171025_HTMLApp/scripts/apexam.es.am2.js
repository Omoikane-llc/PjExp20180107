var apexam;
(function (apexam) {
    var EsAm2 = (function () {
        function EsAm2() {
            var _this = this;
            this.htmlStructure = apexam.apexamLayout.esAm2;
            this.initModule = function ($mainId) {
                _this.bodyContents = $mainId.find('#bodyContents');
                _this.bindCrickHandle(_this.bodyContents);
            };
            this.loadEsAm2View = function (viewData) {
                console.log("start esAm2Module loadMenuView");
                _this.bodyContents.empty().append(_this.htmlStructure);
                _this.viewData = viewData;
                _this.currentIndex = 1;
                _this.setViewData(_this.viewData);
            };
            this.bindCrickHandle = function ($bodyContent) {
                console.log("start esAm2Module bindCrickHandle");
                $bodyContent.bind('click', function (eo) {
                    var objId = eo.target.id;
                    switch (objId) {
                        case "select01":
                        case "select02":
                        case "select03":
                        case "select04":
                            _this.checkSelectAns(objId);
                            break;
                        case "goTop01":
                            if (_this.currentIndex == 1) {
                                apexam.menuModule.loadMenuView();
                            }
                            ;
                            _this.currentIndex = 1;
                            _this.setViewData(_this.viewData);
                            break;
                        case "goPrev01":
                            _this.currentIndex = _this.currentIndex - 1;
                            _this.setViewData(_this.viewData);
                            break;
                        case "goNext01":
                            _this.currentIndex = _this.currentIndex + 1;
                            _this.setViewData(_this.viewData);
                            break;
                        case "goEnd01":
                            _this.currentIndex = _this.viewData.length - 1;
                            _this.setViewData(_this.viewData);
                            break;
                        default:
                            break;
                    }
                    ;
                });
            };
            this.setViewData = function (viewData) {
                var title = viewData[_this.currentIndex].title;
                var questionData = viewData[_this.currentIndex].question;
                var questions = questionData.split("。");
                _this.bodyContents.find('#title01').text(title.substring(0, title.length - 8));
                _this.bodyContents.find('#title02').text(title.substring(title.length - 8, title.length));
                console.log("title " + title + " Math.max(5, questions.length) " + Math.max(5, questions.length));
                for (var i = 0; i < 9; i++) {
                    var targetId = "#question0" + (i + 1);
                    var questionData_1 = (questions.length < i) ? "" : questions[i];
                    if (questionData_1 == null) {
                        _this.bodyContents.find(targetId).text(questionData_1);
                    }
                    else if (questionData_1.indexOf("<") > 0) {
                        _this.bodyContents.find(targetId).html(questionData_1);
                    }
                    else {
                        _this.bodyContents.find(targetId).text(questionData_1);
                    }
                }
                _this.bodyContents.find('#result01').text("");
                _this.bodyContents.find('#answer01').text("");
                _this.bodyContents.find('#guide01').html("<li></li>");
            };
            this.checkSelectAns = function (selectId) {
                var selectAns = _this.bodyContents.find('#' + selectId).text();
                var collectAns = _this.viewData[_this.currentIndex].answer.substring(0, 8);
                if (collectAns.indexOf(selectAns) >= 0) {
                    alert("正解です");
                    _this.bodyContents.find('#result01').text("正解");
                }
                else {
                    alert("不正解です");
                    _this.bodyContents.find('#result01').text("不正解");
                }
                _this.showAnsAndGuide(_this.currentIndex);
            };
            this.showAnsAndGuide = function (viewDataIndex) {
                var answerData = _this.viewData[viewDataIndex].answer;
                var answer = answerData.substring(0, 8);
                var guideContent = '<li>' + answerData.substring(4).split("。").join("</li><li>") + '</li>';
                _this.bodyContents.find('#answer01').text(answer);
                _this.bodyContents.find('#guide01').html(guideContent);
            };
        }
        return EsAm2;
    }());
    apexam.esam2Module = new EsAm2();
})(apexam || (apexam = {}));
