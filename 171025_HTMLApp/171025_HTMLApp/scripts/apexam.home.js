var apexam;
(function (apexam) {
    var Home = (function () {
        function Home() {
            var _this = this;
            this.htmlStructure = apexam.apexamLayout.home;
            this.initModule = function ($mainId) {
                _this.bodyContents = $mainId.find('#bodyContents');
                _this.bindCrickHandle(_this.bodyContents);
            };
            this.loadHomeView = function ($bodyContents) {
                console.log("start homeModule loadHomeView");
                _this.bodyContents.empty().append(_this.htmlStructure);
                _this.bindCrickHandle(_this.bodyContents);
            };
            this.bindCrickHandle = function ($bodyContent) {
                console.log("start homeModule bindCrickHandle");
                $bodyContent.find('#ap01').bind('click', function () {
                    alert("準備中です 利用できません");
                });
                $bodyContent.find('#es01').bind('click', function () {
                    apexam.menuModule.loadMenuView();
                });
            };
        }
        return Home;
    }());
    apexam.homeModule = new Home();
})(apexam || (apexam = {}));
