import json
import requests

class Find_Online:
    def __init__(self,clan_id):
        self.clan_id = clan_id

    

    def get_status(self):
        HEADERS = {"X-API-Key":"e147633507dc489e99b3bfaf9b235023"}
        r = requests.get(f"https://www.bungie.net/Platform//GroupV2/{self.clan_id}/Members/", headers=HEADERS)
        clan = r.json()
        player_number = 0
        print(clan)
        for _ in clan['Response']['results']:
            player = clan['Response']['results'][player_number]['destinyUserInfo']['LastSeenDisplayName']
            status = clan['Response']['results'][player_number]['isOnline']
            if status == False:
                print(f"{player} is Offline")
            else:
                print(f"{player} is Online")
            player_number+=1

        

    