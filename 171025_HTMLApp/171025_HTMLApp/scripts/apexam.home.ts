namespace apexam {
    class Home implements ApExamElement {
        private bodyContents: JQuery;
        htmlStructure = apexamLayout.home;

        initModule = ($mainId: JQuery) => {
            this.bodyContents = $mainId.find('#bodyContents');
            this.bindCrickHandle(this.bodyContents);
        };

        loadHomeView = ($bodyContents: JQuery): void => {
            console.log("start homeModule loadHomeView");
            this.bodyContents.empty().append(this.htmlStructure);
            this.bindCrickHandle(this.bodyContents);
        };

        private bindCrickHandle = ($bodyContent: JQuery): void => {
            console.log("start homeModule bindCrickHandle");

            $bodyContent.find('#ap01').bind('click', () => {
                alert("準備中です 利用できません");
            });
            $bodyContent.find('#es01').bind('click', () => {
                //alert("es01 bind click");
                menuModule.loadMenuView();
            });
        };
    }
    export var homeModule = new Home();
}