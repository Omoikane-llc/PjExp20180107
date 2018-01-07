namespace apexam {
    class Shell implements ApExamElement{
        private refCode:string;
        htmlStructure = '';
        initModule = ($mainId: JQuery) => {
            homeModule.initModule($mainId);
            menuModule.initModule($mainId);
            esam2Module.initModule($mainId);
            this.bindCrickHandle($mainId);
        };

        private bindCrickHandle = ($bodyContent: JQuery): void => {
            console.log("start shellModule bindCrickHandle");

            $bodyContent.find('#signin01').bind('click', () => {
                //alert("signin01 bind click");
                let email: string = $bodyContent.find('#inputEmail').val();
                let password: string = $bodyContent.find('#inputPassword').val();

                // for debug
                //if (email == null || email.length == 0) homeModule.loadHomeView($bodyContent);
                
                email == null ? "YOUR_DEFAULT_EMAIL_ADDRESS" : email;

                let name: string = email.substring(0, email.indexOf('@'));
                console.log("name " + name);

                let url01: string = "https://function2017121601.azurewebsites.net/api/HttpTriggerCSharp1?code=YOUR_API_CODE";
                let url02: string = "https://function20171231.azurewebsites.net/api/HttpTriggerCSharp1?code=YOUR_API_CODE";

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
                        .then((resData) => {
                            console.log("リクエスト成功 " + resData.response.toString());
                            this.refCode = resData.response.toString();
                        });
                } else {
                    console.log("request url02");
                    console.log("refCode " + this.refCode + " inputCode " + password);
                    $.ajax({
                        type: 'POST',
                        url: url02,
                        dataType: 'json',
                        data: { refCode: this.refCode, inputCode: password },
                        timeout: 20000
                    })
                        .then((resData) => {
                            console.log("リクエスト成功 " + resData.response.toString());
                            console.log("resData.response.toString() " + resData.response.toString());
                            homeModule.loadHomeView($bodyContent);
                        });
                }

            });
        };


    }
    export var shell = new Shell();
}