import requests
import config

url = "https://openapi.etsy.com/v2/"
categories = {"jewlery": 68887482}

def getListings(category):
    listings = []
    if category in categories:
        req_url = url + "listings/active?api_key=" + config.key + \
            "&includes=MainImage(url_fullxfull)&limit=50&category_id=" + \
            categories[category]
    else:
        req_url = url + "listings/active?api_key=" + config.key + \
            "&includes=MainImage(url_fullxfull)&limit=50"
    res = requests.get(req_url).json()

    for listing in res["results"]:
        image = listing["MainImage"]["url_fullxfull"]
        listings.append({'name': listing['title'],
                         'url': listing['url'],
                         'img': image})
    return listings
