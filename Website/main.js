//Initialize Key Variables
var apiKey = 'e147633507dc489e99b3bfaf9b235023'
var player_name = ""
const platform = '-1'
var member_id = ''
var clan_id = ''
const user = document.getElementById("User")
const clan = document.getElementById("Clan")
const players = document.getElementById('players')
const clan_header = document.getElementById('clan_name')
const go_button = document.getElementById('submit')
//-------------------------------------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------
go_button.onclick = function(e) {
    players.innerHTML = ''
    player_name = user.value
    displayClan()
}
function displayClan(){
    var xhr = new XMLHttpRequest()
    xhr.open("GET", `https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/${platform}/${player_name}/`, false)
    xhr.setRequestHeader("X-API-Key", apiKey)
    //console.log(xhr)
    xhr.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            var json = JSON.parse(this.responseText);
            member_id = json.Response[0].membershipId
            console.log(member_id)
        }
    }
    xhr.send()
    //---------------------------------------------------------------------------------------------------------------------------------------------------------------
    var xhr2 = new XMLHttpRequest()

    xhr2.open("GET", `https://www.bungie.net/Platform/GroupV2/User/1/${member_id}/0/1/`, false)
    xhr2.setRequestHeader("X-API-Key", apiKey)  
    xhr2.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            var json = JSON.parse(this.responseText);
            clan_id = json.Response.results[0].group.groupId
            clan_name = json.Response.results[0].group.name
            clan_header.innerText = clan_name
            console.log(json)
        }   
    }

    xhr2.send();
//--------------------------------------------------------------------------------------------------------------------
    var xhr3 = new XMLHttpRequest()
    xhr3.open("GET", `https://www.bungie.net/Platform//GroupV2/${clan_id}/Members/`, false)
    xhr3.setRequestHeader("X-API-Key", apiKey)
//console.log(xhr)
    xhr3.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            var json = JSON.parse(this.responseText);
            for(let _ = 0; _ < json.Response.results.length;_+=1){
                let player = json.Response.results[_].destinyUserInfo.LastSeenDisplayName
                let status = ''
                    if(json.Response.results[_].isOnline === false){
                        status = 'offline'
                    }
                    else{
                        status = 'online'
                    }
    
                let new_player = document.createElement('li')
                new_player.className = 'clan_member'
                new_player.innerText = `Clan Member ${player} is currently ${status}!`
                players.appendChild(new_player)
            }
        }
    }
    xhr3.send()
}