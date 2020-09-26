from player_characters import Player_Characters
from clan_info import Clan_Info
import json
class Player(Player_Characters,Clan_Info):
    def __init__(self,gamertag):
        Player_Characters.__init__(self,gamertag)
        Clan_Info.__init__(self,gamertag)
        

    def operation(self):
        cont = True
        while cont = True:
