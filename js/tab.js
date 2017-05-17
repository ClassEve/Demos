function tab(obj) {
    var html = `
        <nav class="title">
        <a href="#a">${obj.title[0]}</a>
        <a href="#b">${obj.title[1]}</a>
        <a href="#c">${obj.title[2]}</a>
        </nav>
        <ul class="content">
            <li id="a">${obj.content[0]}</li>
            <li id="b">${obj.content[1]}</li>
            <li id="c">${obj.content[2]}</li>
        </ul>
    `;

    var sty = `
        <style>
            body,div,nav,ul,li{
            margin:0;
            padding:0;
        }
        ul{
            list-style:none;
        }
        #tab{
            width:300px;
            margin:100px auto;
        }
        #tab .title a{
            float:left;
            width:33.333333333%;
            height:35px;
            line-height:35px;
            text-align:center;
            border:1px solid #dedede;
            box-sizing:border-box;
            text-decoration:none;
        }
        #tab .title a:nth-last-of-type(-n+2){
            border-left:none;
        }
        #tab .content{
            clear:both;
            position:relative;
        }
        #tab .content li{
            width:100%;
            height:300px;
            outline:1px solid #dedede;
            background-color:#fff;
            position:absolute;
            left:0;
            top:0;
            z-index:-999;
        }
        
        #tab .content li:first-of-type{
            z-index:2;
        }
        #tab .content li:target{
            z-index:3;
        }
        </style>
    `;

    document.getElementById('tab').innerHTML = html;
    document.getElementsByTagName('head')[0].innerHTML += sty;
}