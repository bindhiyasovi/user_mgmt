$(document).ready(function(){
    loadPost();
});

function ajax_Request(method, url, async, callback, data, content_Type){
    //console.log("Url = "+url+" and callback = "+callback);
    var xhttp;
    if (window.XMLHttpRequest){
        xhttp = new XMLHttpRequest();
    } else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.onreadystatechange = function(){
        if (xhttp.readyState == 4 && xhttp.status == 200){
            var jsonData = eval("("+xhttp.responseText+")");
            callback(jsonData);
        } else {
            console.log(xhttp.status);
            //console.log(xhttp.responseText);
        }
    }
    xhttp.open(method, url,async);
    xhttp.send();
};

function create_grid_layout(lrg, med, sml,xsml, i, selector){
    var album_clearfix = document.createElement("div");
    //var blog_body = document.getElementById("read_blog");
    var body_toAppend = document.getElementById(selector);
    if(i%lrg == 0){
        album_clearfix.className = "clearfix  visible-lg-block";
        body_toAppend.appendChild(album_clearfix);
    } else if(i%med == 0){
        album_clearfix.className = "clearfix  visible-md-block";
        body_toAppend.appendChild(album_clearfix);
    } else if(i%sml == 0){
        album_clearfix.className = "clearfix  visible-sm-block";
        body_toAppend.appendChild(album_clearfix);
    } else if(i%xsml == 0){
        album_clearfix.className = "clearfix  visible-xs-block";
        body_toAppend.appendChild(album_clearfix);
    } 
};

function create_new_album(){
    var album = document.getElementById("new-album");
    album.style.display = "block";
    //album.setAttribute("placeholder", "Enter new album name");
};

function get_album(){
    var select_option = document.getElementById("select_album").value;
    if (select_option == "create"){
        create_new_album();
    } else if (select_option == "getlist"){
        var xhttp;
        if (window.XMLHttpRequest){
            xhttp = new XMLHttpRequest();
        } else {
            xhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhttp.onreadystatechange = function(){
            if (xhttp.readyState == 4 && xhttp.status == 200){
                var jsonData = eval("("+xhttp.responseText+")");
                get_album_list(jsonData);
            } else {
                console.log(xhttp.status);
                //console.log(xhttp.responseText);
            }
        }
        xhttp.open("GET", "http://api.rpexams-dev.com/albums", true);
        xhttp.send();
    }
};

function get_album_list(jsonData){
    var album_options = document.getElementById("select_album");
    for(var i=0; i<jsonData.length;i++){
        var add_option = document.createElement("option");
        add_option.text = jsonData[i].title;
        album_options.appendChild(add_option);
    }
};

function submit_form(){
    var post_title = $("#new_post_title").val();
    var post_content = $("#new_post_content").val();
    //console.log("Title "+post_title);
    //console.log("Content "+post_content);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log("Response from AJAX : "+xhttp.responseText);
        }
    }
    xhttp.open("POST", "http://api.rpexams-dev.com/posts", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({
        userId:10,
        title: post_title,
        body: post_content
    }));

    console.log(JSON.stringify({
        title: post_title,
        body: post_content
        //userId: "'"+post_UserId+"'"
    }));
};

function submit_comments(){
    var comment_name = $("#comment_name").val();
    var comment_email = $("#comment_email").val();
    var comment_text = $("#new_comment").val();
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log("Response from AJAX : "+xhttp.responseText);
        }
    }
    xhttp.open("POST", "http://api.rpexams-dev.com/comments", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({
        postId:10,
        name: comment_name,
        email: comment_email,
        body: comment_text
    }));
};