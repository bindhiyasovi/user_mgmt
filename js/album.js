//*********** For loading Albums ************
function loadAlbum() {
      ajax_Request("GET", "http://api.rpexams-dev.com/albums", true, create_Album);
};

function create_Album(jsonData){
    var album_body = document.getElementById("album");
    album_body.innerHTML = "";
    $("#album").removeClass();

    var body_title = document.getElementById("album_Title");
    body_title.innerHTML = "";

    for(var i=0; i<=jsonData.length;i++){
        album_body.className = "album-aln";
        create_grid_layout(6,4,3,2,i,"album");

        if (i>=0 && i<jsonData.length){
            var album_box = document.createElement("div");
            album_box.className = "col-lg-2 col-md-3 col-sm-4 col-xs-6 album-box well";
            var album_link = document.createElement("a");
            var title_text = document.createTextNode((i+1) + ". " + jsonData[i].title);
            album_box.setAttribute("data-album-id", jsonData[i].id);
            album_box.setAttribute("data-album-title",jsonData[i].title);
            album_link.appendChild(title_text);
            album_box.addEventListener("click", function(){
                var body_title = document.getElementById("album_Title");
                body_title.innerHTML = "Album: " + this.getAttribute("data-album-title");
                get_pictures(this.getAttribute("data-album-id"), this.getAttribute("data-album-title"));
            });
            album_box.appendChild(album_link);
            album_body.appendChild(album_box);  
        }
    }
};

function load_your_album(uid){
    ajax_Request("GET", "http://api.rpexams-dev.com/albums?userId="+uid, true, show_your_album);
};

function show_your_album(jsonData){
    var your_album = document.getElementById("your_album");
    your_album.innerHTML = "";
    $("#your_album").removeClass();

    for(var i=0; i<jsonData.length;i++){
        your_album.className = "album-aln";
        create_grid_layout(3,3,2,1,i,"your_album");

        if (i>=0 && i<jsonData.length){
            var album_box = document.createElement("div");
            album_box.className = "col-lg-4 col-md-4 col-sm-6 col-xs-12 album-box well";
            //album_box.id = "album_box_id";

            var album_delete = document.createElement("button");
            //album_delete.id = "album_delete_btn";
            album_delete.className = "glyphicon glyphicon-remove del-album";
            album_delete.setAttribute("data-album-id", jsonData[i].id);
            album_delete.setAttribute("data-album-title", jsonData[i].title);
            album_delete.addEventListener("click", function(){
                delete_album(this.getAttribute("data-album-id"), this.getAttribute("data-album-title"));
            });
            album_box.appendChild(album_delete);

            var album_link = document.createElement("a");
            var title_text = document.createTextNode((i+1) + ". " + jsonData[i].title);
            album_box.setAttribute("data-album-id", jsonData[i].id);
            album_box.setAttribute("data-album-title",jsonData[i].title);
            album_link.appendChild(title_text);

            album_box.addEventListener("click", function(){
                var body_title = document.getElementById("your_gallery_title");
                body_title.innerHTML = "You are viewing album: " + this.getAttribute("data-album-title");
                get_your_pictures(this.getAttribute("data-album-id"), this.getAttribute("data-album-title"));
            });

            album_box.onmouseenter = function() {
                var del_btn = this.getElementsByTagName("button")[0];
                del_btn.style.display = "block";
            };

            album_box.onmouseleave = function() {
                var del_btn = this.getElementsByTagName("button")[0];
                del_btn.style.display = "none";
            };

            album_box.appendChild(album_link);
            your_album.appendChild(album_box);  
        }
    }  
};

function delete_album(album_id, album_title){
    alert("Are you sure you want to delete "+"'"+album_title+"'"+" ?");
};