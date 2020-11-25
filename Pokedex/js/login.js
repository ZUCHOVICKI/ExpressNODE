window.onload = init;

function init() {
    if(!localStorage.getItem("Token")){
    document.querySelector('.btn-secondary').addEventListener('click', function(){
        window.location.href = "signin.html"
    })

    document.querySelector('.btn-primary').addEventListener('click',login)
    

     
}else{
    window.location.href = "pokedex.html"
}
}

function login() {
    
    var mail  = document.getElementById('input-mail').value;

    var passw = document.getElementById('input-password').value;

    axios({

        method : 'post' ,
        url: 'http://localhost:4000/user/login',
        data : {
            user_mail : mail ,
            user_password : passw 
        }
    }).then(function(res){

        

        if(res.data.code=== 200){
            localStorage.setItem("Token",res.data.message)
            window.location.href = "pokedex.html"
        }
        else{
            alert("ERROR EN LOS DATOS")
        }
    }).catch(function(err){
        console.log(err)
        
    })
}