import requests
import json
import pprint
import config

url = "https://openapi.etsy.com/v2/"

listings = []

def getListings():
    req_url = url + "listings/active?api_key=" + config.key + \
            "&includes=MainImage(url_fullxfull)&limit=50"
    res = requests.get(req_url).json()

    for listing in res["results"]:
        image = listing["MainImage"]["url_fullxfull"]
        listings.append({'id': listing['listing_id'],
                         'title': listing['title'],
                         'url': listing['url'],
                         'image': image})
