import requests
import time

url_1 = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv'
url_2 = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv'
url_3 = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv'

def update():
    r = requests.get(url_1)
    with open('confirmed.csv', 'wb') as f:
        f.write(r.content)

    r = requests.get(url_2)
    with open('recovered.csv', 'wb') as f:
        f.write(r.content)

    r = requests.get(url_3)
    with open('death.csv', 'wb') as f:
        f.write(r.content)

update()