from flask import Flask
from pymongo import MongoClient
import random
import json

client = MongoClient('localhost', 27017)
db = client.hipstervsmachine

app = Flask(__name__)

random.seed()


@app.route('/')
def index():
    return 'TODO: home page'


@app.route('/get_shapeways')
def get_shapeways():
    item = get_random(db.shapeways)
    return json.dumps(item)


@app.route('/get_etsy')
def get_etsy():
    item = get_random(db.etsy)
    return json.dumps(item)


def get_random(collection):
    count = collection.count()
    offset = random.randint(0, count-1)
    item = collection.find().limit(-1).skip(offset).limit(1)[0]
    del item['_id']
    return item


if __name__ == '__main__':
    app.run()
