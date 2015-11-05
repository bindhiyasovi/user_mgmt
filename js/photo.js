function get_pictures (album_id, album_title) {
    ajax_Request("GET", "http://api.rpexams-dev.com/photos?albumId="+album_id, true, create_photo);
};

function create_photo(jsonData){
    var album_id = jsonData[0].albumId;
    var album_body = document.getElementById("album");
    album_body.innerHTML = "";
    $("#album").removeClass();

    album_body.className = "photos-Body photo-aln";
    
    for(var i=0; i<jsonData.length;i++){
        create_grid_layout(6,4,3,2,i,"album");

        var photo_box = document.createElement("div");
        photo_box.className = "col-lg-2 col-md-3 col-sm-4 col-xs-6 photo-box well";

        var album_link = document.createElement("a");
        album_link.setAttribute("data-toggle", "modal");
        album_link.setAttribute("data-target", "#photoModal");
        var image = document.createElement("img");

        image.src = jsonData[i].thumbnailUrl;
        image.alt = jsonData[i].title;
        album_link.appendChild(image);
        photo_box.setAttribute("data-img-alt", jsonData[i].title);
        photo_box.setAttribute("data-img-url", jsonData[i].url);
        photo_box.setAttribute("data-img-id", jsonData[i].id);
        photo_box.appendChild(album_link);
        photo_box.addEventListener("click", function(){
            show_Carousel(jsonData, album_id, this.getAttribute("data-img-id"));
        });
        album_body.appendChild(photo_box);       
    }
};

function show_Carousel(jsonData, album_id, img_id){
    var k = 0;
    var carousel_slide = document.createElement("div");
    carousel_slide.id = "myCarousel";
    carousel_slide.className = "carousel slide";
    carousel_slide.setAttribute("data-ride", "carousel");

    var carousel_inner = document.createElement("div");
    carousel_inner.className = "carousel-inner";
    carousel_inner.setAttribute("role", "listbox");

    var modal_body = document.getElementById("modal_body");
    modal_body.innerHTML = "";

    for(var i=0; i<jsonData.length;i++){
        if (jsonData[i].albumId == album_id){
            var carousel_item = document.createElement("div");
            
            carousel_item.id = "id_carousel_item";
            if ( jsonData[i].id == img_id){
                carousel_item.className = "item active";
                k++;
            } else {
                carousel_item.className = "item";
            }
            
            var img = document.createElement("img");
            img.src = jsonData[i].url;
            
            var carousel_title = document.createElement("h4");
            carousel_title.className = "carousel-title";
            carousel_title.innerHTML = jsonData[i].title;
            carousel_item.appendChild(carousel_title);
            carousel_item.appendChild(img);
            carousel_inner.appendChild(carousel_item);
        }
    }

    /**** Creating Carousel Slideshow - STARTS ****/
    var a_imgL = document.createElement("a");
    a_imgL.className = "left carousel-control";
    a_imgL.id = "carousel_Control_Left";
    a_imgL.href = "#myCarousel";
    a_imgL.setAttribute("role", "button");
    a_imgL.setAttribute("data-slide", "prev");
    var a_spanL = document.createElement("span");
    a_spanL.className = "glyphicon glyphicon-chevron-left";
    a_spanL.setAttribute("aria-hidden", true);
    a_imgL.appendChild(a_spanL);
    carousel_inner.appendChild(a_imgL);

    var a_imgR = document.createElement("a");
    a_imgR.className = "right carousel-control";
    a_imgR.id = "carousel_Control_Right";
    a_imgR.href = "#myCarousel";
    a_imgR.setAttribute("role", "button");
    a_imgR.setAttribute("data-slide", "next");
    var a_spanR = document.createElement("span");
    a_spanR.className = "glyphicon glyphicon-chevron-right";
    a_spanR.setAttribute("aria-hidden", true);
    a_imgR.appendChild(a_spanR);
    carousel_inner.appendChild(a_imgR);

    carousel_slide.appendChild(carousel_inner);
    modal_body.appendChild(carousel_slide);
    /**** Carousel Slideshow - ENDS ****/
};

function get_your_pictures(album_id, album_title) {
    ajax_Request("GET", "http://api.rpexams-dev.com/photos?albumId="+album_id, true, create_your_photo);
};

function create_your_photo(jsonData){
    var album_id = jsonData[0].albumId;
    var album_body = document.getElementById("your_album");
    album_body.innerHTML = "";
    $("#your_album").removeClass();

    album_body.className = "photos-Body photo-aln";
    
    for(var i=0; i<jsonData.length;i++){
        create_grid_layout(6,4,3,2,i,"album");

        var photo_box = document.createElement("div");
        photo_box.className = "col-lg-2 col-md-3 col-sm-4 col-xs-6 photo-box well";

        var album_link = document.createElement("a");
        album_link.setAttribute("data-toggle", "modal");
        album_link.setAttribute("data-target", "#photoModal");
        var image = document.createElement("img");

        image.src = jsonData[i].thumbnailUrl;
        image.alt = jsonData[i].title;
        album_link.appendChild(image);
        photo_box.setAttribute("data-img-alt", jsonData[i].title);
        photo_box.setAttribute("data-img-url", jsonData[i].url);
        photo_box.setAttribute("data-img-id", jsonData[i].id);
        photo_box.appendChild(album_link);

        photo_box.addEventListener("click", function(){
            show_Carousel(jsonData, album_id, this.getAttribute("data-img-id"));
        });
        album_body.appendChild(photo_box);       
    }
};