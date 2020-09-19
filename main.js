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
    var player_find = new XMLHttpRequest()
    player_find.open("GET", `https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/${platform}/${player_name}/`, false)
    player_find.setRequestHeader("X-API-Key", apiKey)
    //console.log(player_find)
    player_find.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            var json = JSON.parse(this.responseText);
            member_id = json.Response[0].membershipId
            //console.log(json)
        }
    }
    player_find.send()
    //---------------------------------------------------------------------------------------------------------------------------------------------------------------
    var clan_find = new XMLHttpRequest()

    clan_find.open("GET", `https://www.bungie.net/Platform/GroupV2/User/1/${member_id}/0/1/`, false)
    clan_find.setRequestHeader("X-API-Key", apiKey)  
    clan_find.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            var json = JSON.parse(this.responseText);
            clan_id = json.Response.results[0].group.groupId
            clan_name = json.Response.results[0].group.name
            clan_header.innerText = clan_name
            //console.log(json)
        }   
    }

    clan_find.send();
//--------------------------------------------------------------------------------------------------------------------
    var clanmems = new XMLHttpRequest()
    clanmems.open("GET", `https://www.bungie.net/Platform//GroupV2/${clan_id}/Members/`, false)
    clanmems.setRequestHeader("X-API-Key", apiKey)
//console.log(player_find)
    clanmems.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            var json = JSON.parse(this.responseText);
            for(let _ = 0; _ < json.Response.results.length;_+=1){
                let player = json.Response.results[_].destinyUserInfo.LastSeenDisplayName
                let status = ''
                let last_on = new Date(json.Response.results[_].lastOnlineStatusChange * 1000)
                let member_type_store = json.Response.results[_].memberType
                let member_type = ''
                if(member_type_store === 5 || member_type_store === 4){
                    member_type = 'Founder'
                }else if (member_type_store == 3){
                    member_type= "Admin"
                }else if (member_type_store == 2){
                    member_type = 'Member'
                }else{
                    member_type = 'Begginner'
                }

                console.log(member_type)
                    if(json.Response.results[_].isOnline === false){
                        status = `was last online ${last_on}`
                    }
                    else{
                        status = 'is online now'
                    }
    
                let new_player = document.createElement('li')
                new_player.className = 'clan_member'
                new_player.innerText = `Clan ${member_type} ${player} ${status}!`
                players.appendChild(new_player)
            }
        }
    }
    clanmems.send()
}