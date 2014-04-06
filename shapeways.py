import lxml.html
from lxml.cssselect import CSSSelector

# get some html
import requests


def scrape_category(category):
    """
    Scrapes the shapeways website for items in the specified category and
    returns the results in a list.
    """

    products = []

    try:
        r = requests.get('https://www.shapeways.com/' + category)
    except:
        r = None

    if not r:
        return None

    # build the DOM Tree
    tree = lxml.html.fromstring(r.text)

    # construct a CSS Selector
    sel = CSSSelector('div.grid-view div.product-row div.clearfix')

    # Apply the selector to the DOM tree.
    results = sel(tree)
    for item in results:
        subitem = item.cssselect('div.product-img a.product-url')[0]
        img = subitem.cssselect('img')[0].attrib['src']
        url = subitem.attrib['href']
        name = \
            item.cssselect('div.product-details div.product-name \
                a.product-url')[0].text

        products.append({'img': img,
                         'url': url,
                         'name': name})

    return products
