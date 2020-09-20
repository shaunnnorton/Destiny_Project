import json
import requests
import time
class Clan_Info:
    '''Class to find information regarding a clan provided a gamertag'''
    def __init__(self):
        '''Initializes class'''
        #self.clan_id = clan_id
        self.gamertag = input("What is your Gamertag: ")

    

    

    def get_info(self):
        """Gets information realated to the gamertag that was initialized"""
        HEADERS = {"X-API-Key":"e147633507dc489e99b3bfaf9b235023"}
        response = requests.get(f'https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/-1/{self.gamertag}', headers=HEADERS)
        player_info = response.json()
        return player_info['Response']

    def get_memid(self):
        '''Returns the membership ID of the player'''
        player_info = self.get_info()
        #print(player_info[0]["membershipId"])
        return player_info[0]["membershipId"]

    def find_clan(self):
        '''Finds the clan of the provided player. Returns json response.'''
        member = self.get_memid()
        HEADERS = {"X-API-Key":"e147633507dc489e99b3bfaf9b235023"}
        response = requests.get(f'https://www.bungie.net/Platform/GroupV2/User/1/{member}/0/1/', headers=HEADERS)
        clan_info = response.json()
        #print(clan_info)
        return clan_info

    def get_player_status(self):
        '''Prints all players of the clan with online status'''
        clan = self.find_clan()
        clan_id = clan["Response"]["results"][0]["group"]["groupId"]
        HEADERS = {"X-API-Key":"e147633507dc489e99b3bfaf9b235023"}
        
        r = requests.get(f'https://www.bungie.net/Platform//GroupV2/{clan_id}/Members/', headers=HEADERS)
        clan = r.json()
        player_number = 0
        #print(clan)
        for _ in clan['Response']['results']:
            player = clan['Response']['results'][player_number]['destinyUserInfo']['LastSeenDisplayName']
            status = clan['Response']['results'][player_number]['isOnline']
            last_online = time.strftime("%a, %b %d %Y %I:%M:%S %p",time.localtime(int(clan["Response"]["results"][player_number]["lastOnlineStatusChange"])))
            member_type_store = clan['Response']['results'][player_number]['memberType']
            member_type = ''
            if(member_type_store == 5 or member_type_store == 4):
                member_type = 'Founder'
            elif (member_type_store == 3):
                member_type= "Admin"
            elif (member_type_store == 2):
                member_type = 'Member'
            else:
                member_type = 'Begginner'
                
            #print(last_online)
            #print(member_type)
            if status == False:
                print(f"Clan {member_type} {player} was last online at {last_online}")
            else:
                print(f"Clan {member_type} {player} is Online")
            player_number+=1

        

    