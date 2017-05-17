//todo 优服网共用弹出框
var yfBox ={
    //todo 公共方法 methods
    methods:{
        //给弹出盒子定位并显示的方法
        showBox: function (ele) {
            var win = {                             //可视窗口的
                width: $(window).width(),
                height: $(window).height()
            };
            var box = {                             //弹出框
                width: $(ele).width(),
                height: $(ele).height()
            };
            var boxPosition = {                     //确定弹出框最终位置
                left: (win.width - box.width) / 2,
                top: (win.height - box.height) / 3
            };
            $(ele).css({"left": boxPosition.left,"top": boxPosition.top}).fadeIn(500);  //定位并显示盒子
        },
        //获得对象长度
        countObj: function (obj) {
            var t = typeof obj;
            if(t == 'string'){
                return obj.length;
            }else if(t == 'object'){
                var n = 0;
                for(var i in obj){
                    n++;
                }
                return n;
            }
            return false;
        }
    },
    //todo 确认取消信息弹出框
    prompt: function (options) {
        var title = options.title || '温馨提示',            //标题
            contxt = options.txt  || '确定执行此操作？',      //大文本内容
            mark = options.mark,                          //注解内容
            btns =  options.btns || {},                   //是否包含按钮选项
            btnOk = btns.ok || "确定",                     //是否包含确定文字
            btnNo = btns.no || "取消",                     //是否包含取消文字
            ok = options.ok,                              //确定时执行的方法
            no = options.no;                              //取消时，执行的方法
        //todo 创建弹出框的整体结构
        var boxCover = $('<div class="yfPromptMask"></div>'),           //背景层
            boxContent = $('<div class="yfPromptContent"></div>'),      //pop盒子
            boxTitle = $("<p class='yfTitle'>"+title+"</p>"),           //标题框
            boxClose = $('<i class="yfClose">&times;</i>'),             //关闭X
            boxTxt = $("<div class='yfTxt'></div>"),                    //提示内容框
            boxFoot = $("<p class='yfFoot'></p>");                      //弹框底部

        //todo 给X添加关闭事件并追加到标题栏中
        boxClose.click(function () {
            $(this).closest('.yfPromptContent').fadeOut(300);
            $('.yfPromptMask').fadeOut(500);
            setTimeout(function () {
                $('.yfPromptContent,.yfPromptMask').remove();
            },600);
        });
        boxTitle.append(boxClose);

        if(contxt){  //如果有大文本内容 创建元素
            boxTxt.append( $('<p>'+contxt+'</p>'));
        }

        if(mark){   //如果有注释内容 创建元素
            boxTxt.append( $('<span>'+mark+'</span>'));
        }

        //创建按钮们的方法，包括事件
        //创建确定按钮
        function createConfirmBtn(){
            var boxConfirm = $('<a class="yfConfirm">'+btnOk+'</a>');
            boxConfirm.click(function () {
                if(ok){
                    ok();
                }
                $(this).closest('.yfPromptContent').fadeOut(300);
                $('.yfPromptMask').fadeOut(500);
                setTimeout(function () {
                    $('.yfPromptContent,.yfPromptMask').remove();
                },600);
            });
            return boxConfirm;
        }
        //创建取消按钮
        function createCancelBtn(){
            var boxCancel = $('<a class="yfCancel">'+btnNo+'</a>');
            //点击取消时触发事件
            boxCancel.click(function () {
                if(no){
                    no();
                }
                $(this).closest('.yfPromptContent').fadeOut(300);
                $('.yfPromptMask').fadeOut(500);
                setTimeout(function () {
                    $('.yfPromptContent,.yfPromptMask').remove();
                },600);
            });
            return boxCancel;
        }

        //todo 生成确定按钮
        var btnsLen = yfBox.methods.countObj(btns);   //获得对象长度
        if(btnsLen == 1){
            var boxConfirm = createConfirmBtn();
            boxFoot.append(boxConfirm);

        }else if(btnsLen == 2 || btnsLen == 0){
            var boxConfirm = createConfirmBtn();
            var boxCancel = createCancelBtn();
            boxFoot.append(boxConfirm,boxCancel);
        }

//      todo 往body上追加弹出框
        boxContent.append(boxTitle,boxTxt,boxFoot);
        $('body').append(boxCover,boxContent);

        //todo 显示盒子和背景层
        yfBox.methods.showBox('.yfPromptContent');
        $('.yfPromptMask').fadeIn(300);
    },
    //todo 提示消息自动消失框
    tip: function (type,txt,times) {
        var times = times || 1500;  //弹出提示消失时间，默认1500ms
        //取得内容
        //todo 创建弹出框的整体结构
        var boxCover = $('<div class="yfTipMask"></div>'),                  		//背景层
            boxContent =   $('<div class="yfTipContent"></div>'),      				//内容框
            boxTxt = $("<div class='yfTxt'></div>"),                    			//提示内容框
            boxTitle = $("<p class='yfTitle' style='text-align:center'>提示</p>");   //标题框
        //判断传入的type值进行生成
        if(type == "info"){ //纯文字样式，不限制字数
            boxTxt.append( $('<p>'+txt+'</p>'));
        }else if(type == "success" || type == "warning" || type == "error"){  //success,error,warning 字数最长11个中文字符
            boxTxt.append($('<div class="yfTipTypeContent"><i class="'+type+'"></i><span class="tipTypeText">'+txt+'</span></div>'));
        }

        //全部追加到body
        boxContent.append(boxTitle,boxTxt);
        $('body').append(boxContent,boxCover);

        //todo 显示box和弹出框
        yfBox.methods.showBox('.yfTipContent');
        $('.yfTipMask').fadeIn(300);

        setTimeout(function () {
            $('.yfTipContent').fadeOut(300);
            $('.yfTipMask').fadeOut(500);
            setTimeout(function () {
                $('.yfTipContent,.yfTipMask').remove();
            },600);
        },times)
    },
    //todo  加载框
    load: function (txt) {
        var text = txt || '正在加载中...';
        // 创建加载框
        var loadingBox = $('<div class="yfLoadMask">'+
            '<div class="yfLoadBox">'+
            '<div class="yfLoadingContainer">'+
            '<div class=" block1"></div>'+
            '<div class=" block2"></div>'+
            '<div class=" block3"></div>'+
            '<div class=" block4"></div>'+
            '<div class=" block5"></div>'+
            '<div class=" block6"></div>'+
            '<div class=" block7"></div>'+
            '<div class=" block8"></div>'+
            '<div class=" block9"></div>'+
            '</div>'+
            '<p>'+text+'</p>'+
            '</div>'+
            '</div>');
        $('body').append(loadingBox);
    },
    //todo 关闭加载框
    closeLoad:function(){
        var mask = $('.yfLoadMask'),    //找到加载遮盖层
            loadBox = $('.yfLoadBox');  //找到盒子
        if(mask && loadBox){            //如果都存在就消失
            mask.fadeOut(500);
            loadBox.fadeOut(300);
            setTimeout(function () {
                mask.remove();
                loadBox.remove();
            },600);
        }
    }
};



