import pandas as pd

from cachetools import cached, TTLCache

cache1 = TTLCache(maxsize=1, ttl=100)
cache2 = TTLCache(maxsize=1, ttl=100)
cache3 = TTLCache(maxsize=1, ttl=100)

# @cached(cache1)
def getConfirmed():
    data = pd.read_csv('confirmed.csv')
    return data.replace(to_replace='Taiwan*', value='Taiwan')

# @cached(cache2)
def getRecovered():
    data = pd.read_csv('recovered.csv')
    return data.replace(to_replace='Taiwan*', value='Taiwan')

# @cached(cache3)
def getDeath():
    data = pd.read_csv('death.csv')
    return data.replace(to_replace='Taiwan*', value='Taiwan')
