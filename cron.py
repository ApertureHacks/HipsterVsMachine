from pymongo import MongoClient
import shapeways
import etsy

client = MongoClient('localhost', 27017)
db = client.hipstervsmachine

SHAPEWAYS_CATEGORIES = ['jewelry']

shapeways_results = []

for category in SHAPEWAYS_CATEGORIES:
    shapeways_results = shapeways_results + shapeways.scrape_category(category)

if shapeways_results:
    db.shapeways.drop()
    db.shapeways.insert(shapeways_results)

etsy_results = etsy.getListings()

if etsy_results:
    db.etsy.drop()
    db.etsy.insert(etsy_results)
