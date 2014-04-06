import requests
import config

url = "https://openapi.etsy.com/v2/"


def getListings():
    listings = []
    req_url = url + "listings/active?api_key=" + config.key + \
        "&includes=MainImage(url_fullxfull)&limit=50"
    res = requests.get(req_url).json()

    for listing in res["results"]:
        image = listing["MainImage"]["url_fullxfull"]
        listings.append({'name': listing['title'],
                         'url': listing['url'],
                         'img': image})
    return listings
