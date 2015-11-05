function loadUser() {
    ajax_Request("GET", "http://api.rpexams-dev.com/users", true, create_UserList);
};

function create_UserList(jsonData){
    user_list.className = "col-lg-6 col-md-6 col-sm-12 col-xs-12";
    var users_ul = document.getElementById("users-ul");
    $('#users-ul li').remove();
    for(var i=0; i<jsonData.length;i++){
        var users_li = document.createElement("li");
        users_li.className = "user-li"
        users_li.innerHTML = jsonData[i].name;
        users_ul.appendChild(users_li);
    }
};

function get_user_details(jsonData, id){

};

function editUser(){
    var myform = $('#register_form').clone();
    $('#edit_user').html(myform);
    var edituser = document.getElementById("edit_user");

    var delete_account = document.createElement("div");
    delete_account.id = "delete_account";
    delete_account.className = "col-lg-6";
    var delete_btn = document.createElement("button");
    delete_btn.innerHTML = "Delete My Account";
    var a_span = document.createElement("span");
    a_span.className = "glyphicon glyphicon-warning-sign";
    a_span.setAttribute("aria-hidden", true);

    delete_btn.className = "btn btn-danger";
    delete_btn.addEventListener("click", function(){
        delete_Account();
    });
    delete_account.appendChild(delete_btn);
    delete_account.appendChild(a_span);

    document.getElementById("edit_user").appendChild(delete_account);
};

function sort_user(){
    var select_sort_value  = document.getElementById("sort_user").value;
    if ( select_sort_value == "asc"){
        sort_asc();
    } else if (select_sort_value == "dsc"){
        sort_dsc();
    }
};

function sort_asc(){
    var users = [];
    users = document.getElementsByClassName("user-li");
    var user_list = [];
    for (var i=0;i<users.length;i++){
        user_list.push(users[i].innerHTML);
    }
    user_list.sort();

    for(var i=0;i<user_list.length;i++){
        users[i].innerHTML = user_list[i];
    }
};

function sort_dsc(){
    var users = [];
    users = document.getElementsByClassName("user-li");
    var user_list = [];
    for (var i=0;i<users.length;i++){
        user_list.push(users[i].innerHTML);
    }
    user_list.sort();
    user_list.reverse();

    for(var i=0;i<user_list.length;i++){
        users[i].innerHTML = user_list[i];
    }
};

function login_user(){
    var username = document.getElementById("username").value;
    document.getElementById("your_gallery_title").innerHTML = "";
    var xhttp;
    if (window.XMLHttpRequest){
        xhttp = new XMLHttpRequest();
    } else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.onreadystatechange = function(){
        if (xhttp.readyState == 4 && xhttp.status == 200){
            var jsonData = eval("("+xhttp.responseText+")");
            if (jsonData == ""){
                alert("Username doesn't exist. Please register to continue!");
            } else {
                fill_update_form(jsonData);
            }
        } else {
            console.log(xhttp.status);
            //console.log(xhttp.responseText);
        }
    }
    xhttp.open("GET", "http://api.rpexams-dev.com/users?username="+username, true);
    xhttp.send();

    //ajax_Request("GET", "http://api.rpexams-dev.com/users?username="+username, true, fill_update_form);
};

function fill_update_form(jsonData){
    load_your_album(jsonData[0].id);
    var name = [];
    name = jsonData[0].name.split(' ');
   
    document.getElementById("fname").placeholder = name[0];
    document.getElementById("lname").placeholder = name[1];
    document.getElementById("username").placeholder = jsonData[0].username;
    document.getElementById("email").placeholder = jsonData[0].email;
    document.getElementById("address1").placeholder = jsonData[0].address.street;
    document.getElementById("address2").placeholder = jsonData[0].address.suite;
    document.getElementById("city").placeholder = jsonData[0].address.city;
    document.getElementById("zipcode").placeholder = jsonData[0].address.zipcode;
    document.getElementById("phone").placeholder = jsonData[0].phone;
    document.getElementById("website").placeholder = jsonData[0].website;
    document.getElementById("company").placeholder = jsonData[0].company.name;
    document.getElementById("catchphrase").placeholder = jsonData[0].company.catchphrase;
    document.getElementById("business").placeholder = jsonData[0].company.bs;
};

function delete_Account(){
    var warning_elem = document.createElement("div");
    warning_elem.className = "alert alert-warning warning_msg";
    warning_elem.innerHTML = "Warning! This will delete your account permanently from our system.";
    warning_elem.setAttribute("font-weight", "bold");

    document.getElementById("delete_account").appendChild(warning_elem);
};