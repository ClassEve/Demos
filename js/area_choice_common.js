/**
 * Created by wdd66 on 2016/12/14.
 */
//省份城市区域选择事件
//点击省份标题栏事件
$('#provinceShow').click(function () {
    $(this).addClass('active');
    $(this).siblings().html('请选择').removeClass('active').hide();
    $('.cityChoice').css('left','100%').find('li.active').removeClass('active');
    $('.districtChoice').css('left','100%').find('li.active').removeClass('active');
});
//点击城市标题栏事件
$('#cityShow').click(function () {
    $('#cityShow').addClass('active');
    $('#districtShow').html('请选择').removeClass('active').hide();
    $('.districtChoice').css('left','100%').find('li.active').removeClass('active');
});
//点击弹出省市区显示列表
$('#area').click(function () {
    $('.areaChoice').css('bottom',0);
    $('.mask').show();
});
//点击省份列表的事件
$('.provinceChoice').on('click','li',function () {
    $('.provinceChoice li.active').removeClass('active');
    $(this).addClass('active');
    $('.cityChoice').css('left',0);
    $('#provinceShow').html(this.innerHTML).removeClass('active');
    $('#cityShow').show().addClass('active');
    $('#provinceCode').val($(this).attr('value'));
    $('#provinceCodeId').val($(this).attr('value'));
    provinceCode = $(this).attr('value');
    $.ajax({
        type : "POST",
        url : queryServiceAreaUrl,
        data : {
            bizType : bizType,
            provinceCode : provinceCode
        },
        dataType : "json",
        success : function(data) {
            if (data.status) {
                $("#cityCode").html("<li value='-1'>地级市</li>");
                $("#districtCode").html(
                    "<li value='-1'>市、县级市</li>");
                $.each(data.result, function(i, city) {
                    var li = '<li value="' + city.cityCode
                        + '">' + city.cityName + '</li>';
                    $("#cityCode").append(li);
                });
                $("#suburbN").prop("checked",true);
                calcuAmount();
            } else {
                showDelLab("提示", "加载地级市失败!");
                setTimeout(function() {
                    $(".cover").hide().html("");
                }, 2000);
            }
        }
    });
});
//点击城市列表的事件
$('.cityChoice').on('click','li',function () {
    $('.cityChoice li.active').removeClass('active');
    $(this).addClass('active');
    $('.districtChoice').css('left',0);
    $('#cityShow').html(this.innerHTML).removeClass('active');
    $('#districtShow').show().addClass('active');
    $('#cityCode').val($(this).attr('value'));
    $('#cityCodeId').val($(this).attr('value'));
    var cityCode = $(this).attr('value');
    $.ajax({
        type : "POST",
        url : queryServiceAreaUrl,
        data : {
            bizType : bizType,
            provinceCode : provinceCode,
            cityCode : cityCode
        },
        dataType : "json",
        success : function(data) {
            if (data.status) {
                $("#districtCode").html(
                    "<li value='-1'>市、县级市</li>");
                $.each(data.result, function(i, district) {
                    var li = '<li value="'
                        + district.districtCode + '" suburbData="'
                        + district.suburb + '">'
                        + district.districtName + '</li>';
                    $("#districtCode").append(li);
                });
                $("#suburbN").prop("checked",true);
                calcuAmount();
            } else {
                showDelLab("提示", "加载地级市失败!");
                setTimeout(function() {
                    $(".cover").hide().html("");
                }, 2000);
            }
        }
    });
});
//点击区域列表的点击事件
$('.districtChoice').on('click','li',function () {
    var allStr = '';
    $('.districtChoice li.active').removeClass('active');
    $(this).addClass('active');
    $('#districtCode').val($(this).attr('value'));
    $('#districtCodeId').val($(this).attr('value'));
    $('.areaChoice li.active').each(function (idx, li) {
        allStr += li.innerHTML;
    });
    $('#area').val(allStr);     //把选择的区域展示在input中
    $('.areaChoice').css('bottom','-275px');
    $('.mask').hide();


    // 获取省/城市/区域名称
    if("" != $("#provinceCode").val() || null != $("#provinceCode").val()) {
        var provinceName=$("#provinceCode").find("li.active").text();
        $("#province").val(provinceName);
    }
    if("" != $("#cityCode").val() || null != $("#cityCode").val()) {
        var cityName=$("#cityCode").find("li.active").text();
        $("#city").val(cityName);
    }
    if("" != $("#districtCode").val() || null != $("#districtCode").val()) {
        var districtName=$("#districtCode").find("li.active").text();
        $("#district").val(districtName);
    }
    var suburb = $("#districtCode li.active").attr("suburbData");
    setSuburb(suburb);
    calcuAmount();
});
$('.mask').click(function () {
    $('.areaChoice').css('bottom','-275px');
    $('.mask').hide();
});
