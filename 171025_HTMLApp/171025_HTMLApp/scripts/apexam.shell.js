var apexam;
(function (apexam) {
    var Shell = (function () {
        function Shell() {
            var _this = this;
            this.htmlStructure = '';
            this.initModule = function ($mainId) {
                apexam.homeModule.initModule($mainId);
                apexam.menuModule.initModule($mainId);
                apexam.esam2Module.initModule($mainId);
                _this.bindCrickHandle($mainId);
            };
            this.bindCrickHandle = function ($bodyContent) {
                console.log("start shellModule bindCrickHandle");
                $bodyContent.find('#signin01').bind('click', function () {
                    var email = $bodyContent.find('#inputEmail').val();
                    var password = $bodyContent.find('#inputPassword').val();
                    //if (email == null || email.length == 0)
                    //    apexam.homeModule.loadHomeView($bodyContent);
                    email == null ? "YOUR_DEFAULT_EMAIL_ADDRESS" : email;
                    var name = email.substring(0, email.indexOf('@'));
                    console.log("name " + name);
                    var url01 = "https://function2017121601.azurewebsites.net/api/HttpTriggerCSharp1?code=YOUR_API_CODE";
                    var url02 = "https://function20171231.azurewebsites.net/api/HttpTriggerCSharp1?code=YOUR_API_CODE";
                    if (password == null || password.length == 0) {
                        console.log("request url01");
                        console.log("inputEmail " + email);
                        $.ajax({
                            type: 'POST',
                            url: url01,
                            dataType: 'json',
                            data: { name: name, email: email },
                            timeout: 20000
                        })
                            .then(function (resData) {
                            console.log("リクエスト成功 " + resData.response.toString());
                            _this.refCode = resData.response.toString();
                        });
                    }
                    else {
                        console.log("request url02");
                        console.log("refCode " + _this.refCode + " inputCode " + password);
                        $.ajax({
                            type: 'POST',
                            url: url02,
                            dataType: 'json',
                            data: { refCode: _this.refCode, inputCode: password },
                            timeout: 20000
                        })
                            .then(function (resData) {
                            console.log("リクエスト成功 " + resData.response.toString());
                            console.log("resData.response.toString() " + resData.response.toString());
                            apexam.homeModule.loadHomeView($bodyContent);
                        });
                    }
                });
            };
        }
        return Shell;
    }());
    apexam.shell = new Shell();
})(apexam || (apexam = {}));
