import requests
response = requests.get("https://www.bungie.net/Platform")
print(response.status_code)