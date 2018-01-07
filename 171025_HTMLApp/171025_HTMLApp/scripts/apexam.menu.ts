namespace apexam {
    class Menu implements ApExamElement {
        private bodyContents: JQuery;
        htmlStructure = apexamLayout.esMenu;
        initModule = ($mainId: JQuery) => {
            this.bodyContents = $mainId.find('#bodyContents');
        };

        loadMenuView = (): void => {
            console.log("start menuModule loadMenuView");
            this.bodyContents.empty().append(this.htmlStructure);
            this.bindCrickHandle(this.bodyContents);
        };

        private bindCrickHandle = ($bodyContent: JQuery): void => {
            console.log("start menuModule bindCrickHandle");
            $bodyContent.bind('click', (eo:JQueryEventObject) => {
                //alert(eo.target.id + " " + eo.target.innerHTML);
                if (eo.target.id != null && eo.target.id.length == 8) {
                    var reqParam = "?action=get&data1=" + eo.target.id;

                    $.ajax({
                        type: 'GET',
                        url: 'https://script.google.com/macros/s/AKfycbyjnJ85TfEWjUuuJOssxP26uwnNXX6nG61M2qRAGqHU8m-qZzs/exec' + reqParam,
                        dataType: 'jsonp',
                        timeout: 20000
                    })
                    .then((data) => {
                        console.log("読み込み成功 " + data.response[1].index + " " + data.response.length);
                        //var viewDataObj = JSON.parse(data);
                        esam2Module.loadEsAm2View(data.response);
                        },
                        () => {
                            alert("読み込み失敗 時間をおいてもう一度アクセスしてください");
                        }
                    );
                }

            });
            //$bodyContent.find('#29SESAM2').bind('click', () => {
            //    alert("bind click");
            //});
        };

        private getViewParam = (viewId: string) => {
            var paramEs01: { [key: string]: string[] } = {
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
            };
        };

        private getViewDataList = (dataList: Array<any>) => {
            for (var item in dataList) {
                //item.index
            }
        }

        
    }
    export var menuModule = new Menu();
}