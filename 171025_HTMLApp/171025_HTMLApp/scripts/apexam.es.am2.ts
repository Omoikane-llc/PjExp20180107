namespace apexam {
    class EsAm2 implements ApExamElement {
        private bodyContents: JQuery;
        private viewData: any[];
        private currentIndex: number;
        htmlStructure = apexamLayout.esAm2;
        initModule = ($mainId: JQuery) => {
            this.bodyContents = $mainId.find('#bodyContents');
            this.bindCrickHandle(this.bodyContents);
        };

        loadEsAm2View = (viewData: object[]): void => {
            console.log("start esAm2Module loadMenuView");
            this.bodyContents.empty().append(this.htmlStructure);
            this.viewData = viewData;
            this.currentIndex = 1;
            this.setViewData(this.viewData);
        };

        private bindCrickHandle = ($bodyContent: JQuery): void => {
            console.log("start esAm2Module bindCrickHandle");
            $bodyContent.bind('click', (eo: JQueryEventObject) => {
                let objId: string = eo.target.id;
                //alert(eo.target.id + " " + eo.target.innerHTML);
                switch (objId) {
                    case "select01":
                    case "select02":
                    case "select03":
                    case "select04":
                        this.checkSelectAns(objId);
                        break;
                    case "goTop01":
                        if (this.currentIndex == 1) {
                            menuModule.loadMenuView();
                        };
                        this.currentIndex = 1;
                        this.setViewData(this.viewData);
                        break;
                    case "goPrev01":
                        this.currentIndex = this.currentIndex - 1;
                        this.setViewData(this.viewData);
                        break;
                    case "goNext01":
                        this.currentIndex = this.currentIndex + 1;
                        this.setViewData(this.viewData);
                        break;
                    case "goEnd01":
                        this.currentIndex = this.viewData.length - 1;
                        this.setViewData(this.viewData);
                        break;
                    default:
                        break;
                };
            });
            //alert("this.currentIndex " + this.currentIndex);
        };

        private setViewData = (viewData: any[]): void => {
            let title: string = viewData[this.currentIndex].title;
            let questionData: string = viewData[this.currentIndex].question;
            let questions: string[] = questionData.split("。");
            //let answerData: string = viewData[1].answer;
            //let answer: string = answerData.substring(0, 8);
            //let guideContent: string = '<li>' + answerData.substring(4).split("。").join("</li><li>") + '</li>';
            
            this.bodyContents.find('#title01').text(title.substring(0, title.length - 8));
            this.bodyContents.find('#title02').text(title.substring(title.length - 8, title.length));
            
            console.log("title " + title + " Math.max(5, questions.length) " + Math.max(5, questions.length));

            for (var i = 0; i < 9; i++) {
                let targetId: string = "#question0" + (i + 1);
                let questionData: string = (questions.length < i) ? "" : questions[i];
                if (questionData == null) {
                    this.bodyContents.find(targetId).text(questionData);
                } else if (questionData.indexOf("<") > 0) {
                    this.bodyContents.find(targetId).html(questionData);
                } else {
                    this.bodyContents.find(targetId).text(questionData);
                }
                
            }
            this.bodyContents.find('#result01').text("");
            this.bodyContents.find('#answer01').text("");
            this.bodyContents.find('#guide01').html("<li></li>");
            
            //console.log(title.substring(0,title.length-8));
            //alert(this.bodyContents.find('#title01').text() + " " + viewData[1].index);
        };

        private checkSelectAns = (selectId: string) => {
            let selectAns: string = this.bodyContents.find('#' + selectId).text();
            let collectAns: string = this.viewData[this.currentIndex].answer.substring(0, 8);
            
            if (collectAns.indexOf(selectAns) >= 0) {
                alert("正解です");
                this.bodyContents.find('#result01').text("正解");
            } else {
                alert("不正解です");
                this.bodyContents.find('#result01').text("不正解");
            }
            this.showAnsAndGuide(this.currentIndex);
        }

        private showAnsAndGuide = (viewDataIndex: number) => {
            let answerData: string = this.viewData[viewDataIndex].answer;
            let answer: string = answerData.substring(0, 8);
            let guideContent: string = '<li>' + answerData.substring(4).split("。").join("</li><li>") + '</li>';

            this.bodyContents.find('#answer01').text(answer);
            this.bodyContents.find('#guide01').html(guideContent);

        }
    }
    export var esam2Module = new EsAm2();
}