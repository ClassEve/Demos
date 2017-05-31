/**
 * Created by Eve on 2017/5/31.
 */
//todo 优服网共用弹出框
var yfBox ={
    //todo 公共方法 methods
    methods:{
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
        },
        //生成随机数的方法
        randomNum: function (min,max) {
            var range = max - min + 1;
            return parseInt(Math.random() * range + min);
        },
        //给弹出盒子定位并显示的方法
        showBox: function (ele) {
            var el = $('#' + ele);
            var offset = 30;						//进入时初始位置差
            var win = {                             //可视窗口的
                width: $(window).width(),
                height: $(window).height()
            };
            var box = {                             //弹出框
                width: el.width(),
                height: el.height()
            };
            var boxPosition = {                     //确定弹出框最终位置
                left: (win.width - box.width) / 2,
                top: (win.height - box.height) / 3
            };
            el.css({"left": boxPosition.left,"top": boxPosition.top + offset,'opacity':0}).animate({"top": boxPosition.top,'opacity':1},300).show();  //定位并显示盒子
        },
        //退出盒子时的动画方法
        hideBox: function(son, popId, maskId){	//son当前触发事件的元素，parent当前父元素，mask遮盖层
            var offset = 30,	//进入时初始位置差
                pop = $('#' + popId),   //获得弹框
                mask = $('#' + maskId); //获得遮盖层
            if(son){			//如果有子元素的话
                var parentTop = parseInt(pop.css('top'));
                pop.animate({ 'top': parentTop - offset, 'opacity': 0},300);
                mask.fadeOut(500);
                setTimeout(function () {
                    pop.remove();
                    mask.remove();
                },600);
            }else{		//为tip定制
                var parentTop = parseInt(pop.css('top'));
                pop.animate({ 'top': parentTop - offset, 'opacity': 0},300);
                mask.fadeOut(500);
                setTimeout(function () {
                    pop.remove();
                    mask.remove();
                },600);
            }
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
            no = options.no,                              //取消时，执行的方法
            closeBtn = options.closeBtn,		  		  //控制是否出现叉叉
            maskID = 'mask' + yfBox.methods.randomNum(1,9999999999),
            popId  = 'pop' + yfBox.methods.randomNum(1,9999999999); //遮盖层和弹出框的id

        //todo 创建弹出框的整体结构
        var boxCover = $('<div class="yfPromptMask" id="'+maskID+'"></div>'),           //背景层
            boxContent = $('<div class="yfPromptContent" id="'+popId+'"></div>'),      //pop盒子
            boxTitle = $("<p class='yfTitle'>"+title+"</p>"),           //标题框
            boxTxt = $("<div class='yfTxt'></div>"),                    //提示内容框
            boxFoot = $("<p class='yfFoot'></p>");                      //弹框底部

        if(closeBtn != 'none'){
            var boxClose = $('<i class="yfClose">&times;</i>');             //关闭X
            //todo 给X添加关闭事件并追加到标题栏中
            boxClose.click(function () {
                var _this = this;
                yfBox.methods.hideBox(_this,popId, maskID); //关闭事件
            });
            boxTitle.append(boxClose);
        }

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
                if(typeof ok === 'function'){
                    ok();
                }
                var _this = this;
                yfBox.methods.hideBox(_this, popId,maskID);	//关闭事件
            });
            return boxConfirm;
        }
        //创建取消按钮
        function createCancelBtn(){
            var boxCancel = $('<a class="yfCancel">'+btnNo+'</a>');
            //点击取消时触发事件
            boxCancel.click(function () {
                if(typeof no === 'function'){
                    no();
                }
                var _this = this;
                yfBox.methods.hideBox(_this, popId, maskID);	//关闭事件
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
        yfBox.methods.showBox(popId);
        $('#' + maskID).fadeIn(300);
    },
    //todo 提示消息自动消失框
    tip: function (type,txt,times) {
        var times = times || 1500,  //弹出提示消失时间，默认1500ms
            maskID = 'mask' + yfBox.methods.randomNum(1,9999999999),
            popId  = 'pop' + yfBox.methods.randomNum(1,9999999999); //遮盖层和弹出框的id
        //取得内容
        //todo 创建弹出框的整体结构
        var boxCover = $('<div class="yfTipMask" id="'+maskID+'"></div>'),                  		//背景层
            boxContent =   $('<div class="yfTipContent" id="'+popId+'"></div>'),      				//内容框
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
        yfBox.methods.showBox(popId);
        $('#' + maskID).fadeIn(300);

        setTimeout(function () {	//自动消失
            yfBox.methods.hideBox(null,popId,maskID);
        },times);
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
    },
    //单纯的购物车动画框
    shopCar: function(e){
        var $shop=$('.J-shoping');
        var $target=$(e.target);
        x = $target.offset().left + 30;
        y = $target.offset().top + 10;
        X = $shop.offset().left+10;
        Y = $shop.offset().top;
        var during = parseInt(Math.sqrt(Math.pow((X - x),2) + Math.pow((y - Y),2)))*1.2;
        var ranClass = "floatOrder" + parseInt(Math.random()*100000000000000000);
        $('body').append('<div id="floatOrder" class="'+ranClass+'"><img src="'+getProjectRootPath()+'/template/images/2.png" width="15" height="13" /></div>');
        var $obj=$('.'+ranClass);
        if(!$obj.is(':animated')){
            $obj.css({'left': x,'top': y}).animate({'left': [X,"easeOutExpo"],'top': Y-30},during,function() {
                $obj.stop(false, false).animate({'top': Y+20,'opacity':0},150,function(){
                    $obj.fadeOut(300,function(){$obj.remove();});
                });
            });
        }
    },
    //传入元素进行判断的购物车动画
    shopCarInput: function(){
        var preVal = '';		//之前的值
        var afterVal = '';		//操作之后的值
        for(var i = 0;i < arguments.length; i++ ){
            $(arguments[i]).focus(function(){
                preVal = $(this).val();		//获得焦点获得改变当前值
            }).blur(function(e){
                afterVal = $(this).val();	//失去焦点获得改变后值
                if(preVal != afterVal && afterVal){	//如果不相等且值存在
                    var $shop=$('.J-shoping');
                    var $target=$(e.target);
                    var x = $target.offset().left + 30;
                    var y = $target.offset().top + 10;
                    var X = $shop.offset().left+10;
                    var Y = $shop.offset().top;
                    var during = parseInt(Math.sqrt(Math.pow((X - x),2) + Math.pow((y - Y),2)))*1.2;
                    var ranClass = "floatOrder" + parseInt(Math.random()*100000000000000000);
                    $('body').append('<div id="floatOrder" class="'+ranClass+'"><img src="'+getProjectRootPath()+'/template/images/2.png" width="15" height="13" /></div>');
                    var $obj=$('.'+ranClass);
                    if(!$obj.is(':animated')){
                        $obj.css({'left': x,'top': y}).animate({'left': [X,"easeOutExpo"],'top': Y-30},during,function() {
                            $obj.stop(false, false).animate({'top': Y+20,'opacity':0},150,function(){
                                $obj.fadeOut(300,function(){$obj.remove();});
                            });
                        });
                    }
                }

            });
        }
    },
    //下单页面右侧的清单列表展示事件
    workRhScroll:function(){
        var workRh=$(".workAv_right").offset().top;
        var left=$(window).width()/2+$(".workAv_right ").width();
        var screenHeight = $(window).height();
        $(window).scroll(function(){
            var top=$(window).scrollTop() ;
            if(top>workRh){
                $(".sys_count").addClass("workAv_right_fix");
                $(".workAv_right_fix").css("left",left);
            }else{
                $(".sys_count ").removeClass("workAv_right_fix");
            }
        });
    },
    //悬浮显示title完整内容
    hoverAlert:function(elem){
        var derx=10;
        var dery=10;
        //获得窗口的宽高
        var screenWidth = $(window).width();
        var screenHeight = $(window).height();

        var alertWidth,      //弹框宽高
            alertHeight,
            clienX,         //鼠标位置相对窗口坐标
            clienY;

        $(elem).mouseover(function(e){
            this.txt = $(this).attr('title');
            this.title = '';
            $(this).css('cursor','pointer');
            var workAvDeret=$("<div class='hoverAlert'>"+this.txt+"</div>");
            $("body").append(workAvDeret);

            //获得弹窗宽高
            alertWidth = $('.hoverAlert').outerWidth();
            alertHeight = $('.hoverAlert').outerHeight();

            //获得鼠标相对视窗坐标
            clienX = e.clientX;
            clienY = e.clientY;

            if(alertHeight + clienY > screenHeight){    //如果高了
                $(".hoverAlert").css({
                    "top":(e.pageY - dery - alertHeight)+"px",
                    "left":(e.pageX+derx)+"px"
                }).show();
            }
            if(alertWidth + clienX > screenWidth){ //如果宽了
                $(".hoverAlert").css({
                    "left":(e.pageX - derx - alertWidth)+"px",
                    "top":(e.pageX+derx)+"px"
                }).show();
            }
            if(alertHeight + clienY > screenHeight && alertWidth + clienX > screenWidth){ //如果又宽又高
                $(".hoverAlert").css({
                    "top":(e.pageY - dery - alertHeight)+"px",
                    "left":(e.pageX - derx - alertWidth)+"px"
                }).show();
            }
            if(alertHeight + clienY < screenHeight && alertWidth + clienX < screenWidth){ //如果正常
                $(".hoverAlert").css({
                    "left":(e.pageX+derx)+"px",
                    "top":(e.pageY+dery)+"px"
                }).show();
            }
        }).mouseout(function(){
            this.title = this.txt;
            $(".hoverAlert").remove();
        }).mousemove(function(e) {
            //获得鼠标相对视窗坐标
            clienX = e.clientX;
            clienY = e.clientY;

            if(alertHeight + clienY > screenHeight){    //如果高了
                $(".hoverAlert").css({
                    "top":(e.pageY - dery - alertHeight)+"px",
                    "left":(e.pageX+derx)+"px"
                });
            }
            if(alertWidth + clienX > screenWidth){ //如果宽了
                $(".hoverAlert").css({
                    "left":(e.pageX - derx - alertWidth)+"px",
                    "top":(e.pageY + dery)+"px"
                });
            }
            if(alertHeight + clienY > screenHeight && alertWidth + clienX > screenWidth){ //如果又宽又高
                $(".hoverAlert").css({
                    "top":(e.pageY - dery - alertHeight)+"px",
                    "left":(e.pageX - derx - alertWidth)+"px"
                });
            }
            if(alertHeight + clienY < screenHeight && alertWidth + clienX < screenWidth){ //如果正常
                $(".hoverAlert").css({
                    "left":(e.pageX+derx)+"px",
                    "top":(e.pageY+dery)+"px"
                });
            }
        });
    }
};
//yfBox以上