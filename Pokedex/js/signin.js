window.onload = init;

function init() {
    if(!localStorage.getItem("Token")){
    document.querySelector('.btn-secondary').addEventListener('click', function(){
        window.location.href = "login.html"
    })

    document.querySelector('.btn-primary').addEventListener('click',signin)
    

     
}else{
    window.location.href = "pokedex.html"
}
}

function signin() {

    var mail  = document.getElementById('input-mail').value;

    var passw = document.getElementById('input-password').value;

    var name = document.getElementById('input-name').value;
    axios({

        method : 'post' ,
        url: 'http://localhost:4000/user/signin',
        data : {
            user_mail : mail ,
            user_password : passw ,
            user_name : name
        }
    }).then(function(res){

        console.log(res)
        window.location.href = "login.html"
    }).catch(function(err){
        console.log(err)
    })
}