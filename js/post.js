/**** Get all the posts *****/
function loadPost() {
    ajax_Request("GET", "http://api.rpexams-dev.com/posts", true, create_Blog);
};

/**** Create a reponsive layout for displaying the posts, including "read more" button to see the full post view ****/
function create_Blog(jsonData){
    var full_Post = document.getElementById("full_post");
    full_Post.innerHTML = "";
    document.getElementById("full_post_col").style.display = "none";

    var blog_body = document.getElementById("read_blog");
    blog_body.innerHTML = "";
    $("#read_blog").removeClass();
    
    for(var i=0; i<=jsonData.length;i++){
        blog_body.className = "blog-aln";
        create_grid_layout(3,3,2,2,i,"read_blog");

        if (i>=0 && i<jsonData.length){
            var post_box = document.createElement("div");
            post_box.className = "col-lg-4 col-md-4 col-sm-6 col-xs-6 post-box";
            var title = document.createElement("h4");
            var post_link = document.createElement("a");
            var title_text = document.createTextNode((i+1) + ". " + jsonData[i].title);
            
            post_link.appendChild(title_text);
            title.appendChild(post_link);

            var post_body = document.createElement("p");
            post_body.className = "post-Body";
            post_body.innerHTML = jsonData[i].body;

            var read_more_btn = document.createElement("a");
            read_more_btn.className = "read-more-btn";
            read_more_btn.innerHTML = "Read more ";
            var read_more_span = document.createElement("span");
            read_more_span.className = "glyphicon glyphicon-chevron-right";
            read_more_btn.appendChild(read_more_span);
            
            read_more_btn.setAttribute("data-post-id", jsonData[i].id);
            read_more_btn.setAttribute("data-post-uid", jsonData[i].userId);
            read_more_btn.setAttribute("data-post-title",jsonData[i].title);
            read_more_btn.setAttribute("data-post-body", jsonData[i].body);

            read_more_btn.addEventListener("click", function(){
                get_full_post(this.getAttribute("data-post-id"), this.getAttribute("data-post-title"),this.getAttribute("data-post-body"));
            });


            post_box.setAttribute("data-post-id", jsonData[i].id);
            post_box.setAttribute("data-post-uid", jsonData[i].userId);
            post_box.setAttribute("data-post-title",jsonData[i].title);
            post_box.setAttribute("data-post-body", jsonData[i].body);

            post_box.addEventListener("click", function(){
                get_full_post(this.getAttribute("data-post-id"), this.getAttribute("data-post-title"),this.getAttribute("data-post-body"));
            });

            post_box.appendChild(title);
            post_box.appendChild(post_body);
            post_box.appendChild(read_more_btn);
            blog_body.appendChild(post_box);
        }
    }
};

/***** Display the full post detail, it also shows the comment below and also posting new comment options for each post *****/
function get_full_post(id, title, body){
    document.getElementById("full_post_col").style.display = "block";
    var full_Post = document.getElementById("full_post");
    full_Post.innerHTML = "";

    var post_List = document.getElementById("read_blog");
    post_List.className = "col-lg-6 col-md-6 col-sm-12 col-xs-12";

    var post_Content = document.createElement("div");
    var post_Title = document.createElement("h4");
    post_Title.innerHTML = title;
    post_Content.appendChild(post_Title);
    
    var post_Body = document.createElement("p");
    post_Body.innerHTML = body;
    post_Content.appendChild(post_Body);

    var post_Comment = document.createElement("div");
    full_Post.appendChild(post_Content);

    show_comments(id);
};

/**** Get and Display the comments for the respective posts ******/
function show_comments(post_id){
    ajax_Request("GET", "http://api.rpexams-dev.com/comments?postId="+post_id, true, loading_comments);
};

function loading_comments(jsonData){
    var load_comment = document.getElementById("load_comments");
    load_comment.innerHTML = "";
    $("#load_comments").removeClass();

    var heading_comment = document.createElement("h4");
    heading_comment.innerHTML = "COMMENTS";
    load_comment.appendChild(heading_comment);

    for(var i=0; i<jsonData.length;i++){
        load_comment.className = "col-lg-6 col-md-6 col-sm-12 col-xs-12";

        var comment_List = document.createElement("div");
        var comment_name = document.createElement("h5");
        comment_name.className = "comment-name";
        comment_name.innerHTML = jsonData[i].name;
        var comment_conent = document.createElement("p");
        comment_conent.innerHTML = jsonData[i].body;
        comment_name.appendChild(comment_conent);
        comment_List.appendChild(comment_name);
        load_comment.appendChild(comment_List);
        var span_brk = document.createElement("hr");
        load_comment.appendChild(span_brk);
    }
};