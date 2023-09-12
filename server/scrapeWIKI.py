from bs4 import BeautifulSoup
import requests


try:
    ammoSource = requests.get('https://oldschool.runescape.wiki/w/Ammunition_slot_table')
    ammoSource.raise_for_status()

    ammoSoup = BeautifulSoup(ammoSource.text, 'html.parser')
    
    allAmmo = ammoSoup.find('div', class_="mw-parser-output").find_all('table')[1].find_all('tr')[1:]
    
    for ammo in allAmmo:
        image = ammo.find_all('td')[0].img
        name = ammo.find_all('td')[1].a.text

        if image:
            src = "https://oldschool.runescape.wiki"+ image['src']
        else:
            src = "No image src"

        print(name, src)

except Exception as e:
    print(e)