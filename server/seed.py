#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
from bs4 import BeautifulSoup
import requests

# Local imports
from app import app
from models import db, Item

def scrape_ammo():
    try:
        ammoSource = requests.get('https://oldschool.runescape.wiki/w/Ammunition_slot_table')
        ammoSource.raise_for_status()

        ammoSoup = BeautifulSoup(ammoSource.text, 'html.parser')
        allAmmo = ammoSoup.find('div', class_="mw-parser-output").find_all('table')[1].find_all('tr')[1:]

        for ammo in allAmmo:
            image = ammo.find_all('td')[0].img
            name = ammo.find_all('td')[1].a.text

            if image:
                src = "https://oldschool.runescape.wiki" + image['src']
            else:
                src = "No image src"

            # Create and add the Item to the database
            new_item = Item(name=name, slot="ammo", image=src)
            db.session.add(new_item)

        db.session.commit()

    except Exception as e:
        print(e)

def scrape_body():
    try:
        bodySource = requests.get('https://oldschool.runescape.wiki/w/Body_slot_table')
        bodySource.raise_for_status()

        bodySoup = BeautifulSoup(bodySource.text, 'html.parser')
        allBody = bodySoup.find('div', class_="mw-parser-output").find_all('table')[1].find_all('tr')[1:]

        for body in allBody:
            image = body.find_all('td')[0].img
            name = body.find_all('td')[1].a.text

            if image:
                src = "https://oldschool.runescape.wiki" + image['src']
            else:
                src = "No image src"

            # Create and add the Item to the database
            new_item = Item(name=name, slot="body", image=src)
            db.session.add(new_item)

        db.session.commit()

    except Exception as e:
        print(e)

def scrape_cape():
    try:
        capeSource = requests.get('https://oldschool.runescape.wiki/w/Cape_slot_table')
        capeSource.raise_for_status()

        capeSoup = BeautifulSoup(capeSource.text, 'html.parser')
        allCape = capeSoup.find('div', class_="mw-parser-output").find_all('table')[1].find_all('tr')[1:]

        for cape in allCape:
            image = cape.find_all('td')[0].img
            name = cape.find_all('td')[1].a.text

            if image:
                src = "https://oldschool.runescape.wiki" + image['src']
            else:
                src = "No image src"

            # Create and add the Item to the database
            new_item = Item(name=name, slot="cape", image=src)
            db.session.add(new_item)

        db.session.commit()

    except Exception as e:
        print(e)

def scrape_feet():
    try:
        feetSource = requests.get('https://oldschool.runescape.wiki/w/Feet_slot_table')
        feetSource.raise_for_status()

        feetSoup = BeautifulSoup(feetSource.text, 'html.parser')
        allFeet = feetSoup.find('div', class_="mw-parser-output").find_all('table')[1].find_all('tr')[1:]

        for feet in allFeet:
            image = feet.find_all('td')[0].img
            name = feet.find_all('td')[1].a.text

            if image:
                src = "https://oldschool.runescape.wiki" + image['src']
            else:
                src = "No image src"

            # Create and add the Item to the database
            new_item = Item(name=name, slot="feet", image=src)
            db.session.add(new_item)

        db.session.commit()

    except Exception as e:
        print(e)

def scrape_hands():
    try:
        handsSource = requests.get('https://oldschool.runescape.wiki/w/Hands_slot_table')
        handsSource.raise_for_status()

        handsSoup = BeautifulSoup(handsSource.text, 'html.parser')
        allHands = handsSoup.find('div', class_="mw-parser-output").find_all('table')[1].find_all('tr')[1:]

        for hands in allHands:
            image = hands.find_all('td')[0].img
            name = hands.find_all('td')[1].a.text

            if image:
                src = "https://oldschool.runescape.wiki" + image['src']
            else:
                src = "No image src"

            # Create and add the Item to the database
            new_item = Item(name=name, slot="hands", image=src)
            db.session.add(new_item)

        db.session.commit()

    except Exception as e:
        print(e)

def scrape_head():
    try:
        headSource = requests.get('https://oldschool.runescape.wiki/w/Head_slot_table')
        headSource.raise_for_status()

        headSoup = BeautifulSoup(headSource.text, 'html.parser')
        allHead = headSoup.find('div', class_="mw-parser-output").find_all('table')[1].find_all('tr')[1:]

        for head in allHead:
            image = head.find_all('td')[0].img
            name = head.find_all('td')[1].a.text

            if image:
                src = "https://oldschool.runescape.wiki" + image['src']
            else:
                src = "No image src"

            # Create and add the Item to the database
            new_item = Item(name=name, slot="head", image=src)
            db.session.add(new_item)

        db.session.commit()

    except Exception as e:
        print(e)

def scrape_legs():
    try:
        legsSource = requests.get('https://oldschool.runescape.wiki/w/Legs_slot_table')
        legsSource.raise_for_status()

        legsSoup = BeautifulSoup(legsSource.text, 'html.parser')
        allLegs = legsSoup.find('div', class_="mw-parser-output").find_all('table')[1].find_all('tr')[1:]

        for legs in allLegs:
            image = legs.find_all('td')[0].img
            name = legs.find_all('td')[1].a.text

            if image:
                src = "https://oldschool.runescape.wiki" + image['src']
            else:
                src = "No image src"

            # Create and add the Item to the database
            new_item = Item(name=name, slot="legs", image=src)
            db.session.add(new_item)

        db.session.commit()

    except Exception as e:
        print(e)

def scrape_neck():
    try:
        neckSource = requests.get('https://oldschool.runescape.wiki/w/Neck_slot_table')
        neckSource.raise_for_status()

        neckSoup = BeautifulSoup(neckSource.text, 'html.parser')
        allNeck = neckSoup.find('div', class_="mw-parser-output").find_all('table')[1].find_all('tr')[1:]

        for neck in allNeck:
            image = neck.find_all('td')[0].img
            name = neck.find_all('td')[1].a.text

            if image:
                src = "https://oldschool.runescape.wiki" + image['src']
            else:
                src = "No image src"

            # Create and add the Item to the database
            new_item = Item(name=name, slot="neck", image=src)
            db.session.add(new_item)

        db.session.commit()

    except Exception as e:
        print(e)

def scrape_ring():
    try:
        ringSource = requests.get('https://oldschool.runescape.wiki/w/Ring_slot_table')
        ringSource.raise_for_status()

        ringSoup = BeautifulSoup(ringSource.text, 'html.parser')
        allRing = ringSoup.find('div', class_="mw-parser-output").find_all('table')[1].find_all('tr')[1:]

        for ring in allRing:
            image = ring.find_all('td')[0].img
            name = ring.find_all('td')[1].a.text

            if image:
                src = "https://oldschool.runescape.wiki" + image['src']
            else:
                src = "No image src"

            # Create and add the Item to the database
            new_item = Item(name=name, slot="ring", image=src)
            db.session.add(new_item)

        db.session.commit()

    except Exception as e:
        print(e)

def scrape_shield():
    try:
        shieldSource = requests.get('https://oldschool.runescape.wiki/w/Shield_slot_table')
        shieldSource.raise_for_status()

        shieldSoup = BeautifulSoup(shieldSource.text, 'html.parser')
        allShield = shieldSoup.find('div', class_="mw-parser-output").find_all('table')[1].find_all('tr')[1:]

        for shield in allShield:
            image = shield.find_all('td')[0].img
            name = shield.find_all('td')[1].a.text

            if image:
                src = "https://oldschool.runescape.wiki" + image['src']
            else:
                src = "No image src"

            # Create and add the Item to the database
            new_item = Item(name=name, slot="shield", image=src)
            db.session.add(new_item)

        db.session.commit()

    except Exception as e:
        print(e)

def scrape_weapon():
    try:
        weaponSource = requests.get('https://oldschool.runescape.wiki/w/Weapon_slot_table')
        weaponSource.raise_for_status()

        weaponSoup = BeautifulSoup(weaponSource.text, 'html.parser')
        allWeapon = weaponSoup.find('div', class_="mw-parser-output").find_all('table')[1].find_all('tr')[1:]

        for weapon in allWeapon:
            image = weapon.find_all('td')[0].img
            name = weapon.find_all('td')[1].a.text

            if image:
                src = "https://oldschool.runescape.wiki" + image['src']
            else:
                src = "No image src"

            # Create and add the Item to the database
            new_item = Item(name=name, slot="weapon", image=src)
            db.session.add(new_item)

        db.session.commit()

    except Exception as e:
        print(e)


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        db.drop_all()
        db.create_all()

        scrape_ammo()
        scrape_body()
        scrape_cape()
        scrape_feet()
        scrape_hands()
        scrape_legs()
        scrape_neck()
        scrape_ring()
        scrape_shield()
        scrape_weapon()