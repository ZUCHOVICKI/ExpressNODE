window.onload = init;

var headers = {};
var url = "http://localhost:4000"

function init(){

    
    if(localStorage.getItem("Token")){
        
        headers = {
            headers:{
                'Authorization':"bearer " + localStorage.getItem("Token")
            }
        }
        loadPokemon()


    }
    else{
        window.location.href="index.html"
    }
}

function loadPokemon(){

    axios.get(url + "/pokemon",headers)
    .then(function(res){
        console.log(res)
        DisplayPOK(res.data.message)
    }).catch(function(error){
        console.log(error)
    })
}

function DisplayPOK(pok){
    
    var body = document.querySelector("body")

    for(var i = 0;i<pok.length;i++){

        body.innerHTML += `<h3>${pok[i].pok_name}</h3>`
    }

}