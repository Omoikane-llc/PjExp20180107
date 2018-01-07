var apexam;
(function (apexam) {
    var Menu = (function () {
        function Menu() {
            var _this = this;
            this.htmlStructure = apexam.apexamLayout.esMenu;
            this.initModule = function ($mainId) {
                _this.bodyContents = $mainId.find('#bodyContents');
            };
            this.loadMenuView = function () {
                console.log("start menuModule loadMenuView");
                _this.bodyContents.empty().append(_this.htmlStructure);
                _this.bindCrickHandle(_this.bodyContents);
            };
            this.bindCrickHandle = function ($bodyContent) {
                console.log("start menuModule bindCrickHandle");
                $bodyContent.bind('click', function (eo) {
                    if (eo.target.id != null && eo.target.id.length == 8) {
                        var reqParam = "?action=get&data1=" + eo.target.id;
                        $.ajax({
                            type: 'GET',
                            url: 'https://script.google.com/macros/s/AKfycbyjnJ85TfEWjUuuJOssxP26uwnNXX6nG61M2qRAGqHU8m-qZzs/exec' + reqParam,
                            dataType: 'jsonp',
                            timeout: 20000
                        })
                            .then(function (data) {
                            console.log("読み込み成功 " + data.response[1].index + " " + data.response.length);
                            apexam.esam2Module.loadEsAm2View(data.response);
                        }, function () {
                            alert("読み込み失敗 時間をおいてもう一度アクセスしてください");
                        });
                    }
                });
            };
            this.getViewParam = function (viewId) {
                var paramEs01 = {
                    "title1": ["午前II試験（年度別）"],
                    "selector1": ["2017年春期", "2016年春期", "2015年春期"],
                    "value1": ["29SESAM2", "28SESAM2", "27SESAM2"]
                };
                var paramDefault = null;
                switch (viewId) {
                    case ("es01"):
                        return paramEs01;
                    default:
                        return paramDefault;
                }
                ;
            };
            this.getViewDataList = function (dataList) {
                for (var item in dataList) {
                }
            };
        }
        return Menu;
    }());
    apexam.menuModule = new Menu();
})(apexam || (apexam = {}));
