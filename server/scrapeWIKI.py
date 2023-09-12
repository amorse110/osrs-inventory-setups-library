from bs4 import BeautifulSoup
import requests

######### AMMO
# try:
#     ammoSource = requests.get('https://oldschool.runescape.wiki/w/Ammunition_slot_table')
#     ammoSource.raise_for_status()

#     ammoSoup = BeautifulSoup(ammoSource.text, 'html.parser')
    
#     allAmmo = ammoSoup.find('div', class_="mw-parser-output").find_all('table')[1].find_all('tr')[1:]
    
#     for ammo in allAmmo:
#         image = ammo.find_all('td')[0].img
#         name = ammo.find_all('td')[1].a.text

#         if image:
#             src = "https://oldschool.runescape.wiki"+ image['src']
#         else:
#             src = "No image src"

#         print(name, src)

# except Exception as e:
#     print(e)

######### HEAD
# try:
#     headSource = requests.get('https://oldschool.runescape.wiki/w/Head_slot_table')
#     headSource.raise_for_status()

#     headSoup = BeautifulSoup(headSource.text, 'html.parser')
#     allHead = headSoup.find('div', class_="mw-parser-output").find_all('table')[1].find_all('tr')[1:]

#     for head in allHead:
#         image = head.find_all('td')[0].img
#         name = head.find_all('td')[1].a.text

#         if image:
#             src = "https://oldschool.runescape.wiki" + image['src']
#         else:
#             src = "No image src"

#         print(name, src)

# except Exception as e:
#     print(e)


######### WEAPON
# try:
#     weaponSource = requests.get('https://oldschool.runescape.wiki/w/Weapon_slot_table')
#     weaponSource.raise_for_status()

#     weaponSoup = BeautifulSoup(weaponSource.text, 'html.parser')
    
#     allWeapon = weaponSoup.find('div', class_="mw-parser-output").find_all('table')[1].find_all('tr')[1:]

#     for weapon in allWeapon:
#         image = weapon.find_all('td')[0].img
#         name = weapon.find_all('td')[1].a.text

#         if image:
#             src = "https://oldschool.runescape.wiki" + image['src']
#         else:
#             src = "No image src"

#         print(name, src)

# except Exception as e:
#     print(e)