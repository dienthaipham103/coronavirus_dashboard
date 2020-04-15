from flask import Flask, render_template, request, abort
import data
from cachetools import cached, TTLCache
import math
import pandas as pd
import numpy as np
from flask.json import jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return 'home'

@app.route("/hello")
def hello():
    name = request.args.get('name')
    return 'Hello {}'.format(name)
    
@app.route("/about")
def about():
    return 'about'



cache_api1 = TTLCache(maxsize=1, ttl=100)
@app.route("/api1")
# @cached(cache_api1)
def api1():
    confirmed = data.getConfirmed()
    latest_confirmed = confirmed.iloc[:,-1]
    total_confirmed = int(latest_confirmed.sum())

    recovered = data.getRecovered()
    latest_recovered = recovered.iloc[:,-1]
    total_recovered = int(latest_recovered.sum())

    death = data.getDeath()
    latest_death = death.iloc[:,-1]
    total_death = int(latest_death.sum())

    death_rate = round(total_death / total_confirmed, 4)
    recover_rate = round(total_recovered / total_confirmed, 4)

    return {
        'cases': total_confirmed,
        'deaths': total_death,
        'recovered': total_recovered,
        'death_rate': death_rate,
        'recovered_rate': recover_rate
    }



cache_api1_detail = TTLCache(maxsize=1, ttl=100)
@app.route("/api1/detail")
# @cached(cache_api1_detail)
def api1_detail():

    country = request.args.get('country')

    confirmed = data.getConfirmed()
    confirmed = confirmed[confirmed['Country/Region'] == country]
    if len(confirmed.index) == 0:
        abort(404)
    latest_confirmed = confirmed.iloc[:,-1]
    total_confirmed = int(latest_confirmed.sum())

    recovered = data.getRecovered()
    recovered = recovered[recovered['Country/Region'] == country]
    latest_recovered = recovered.iloc[:,-1]
    total_recovered = int(latest_recovered.sum())

    death = data.getDeath()
    death = death[death['Country/Region'] == country]
    latest_death = death.iloc[:,-1]
    total_death = int(latest_death.sum())

    death_rate = round(total_death / total_confirmed, 4)
    recover_rate = round(total_recovered / total_confirmed, 4)

    return {
        'cases': total_confirmed,
        'deaths': total_death,
        'recovered': total_recovered,
        'death_rate': death_rate,
        'recovered_rate': recover_rate
    }



cache_api2 = TTLCache(maxsize=1, ttl=100)
@app.route("/api2")
# @cached(cache_api2)
def api2():
    confirmed = data.getConfirmed()
    confirmed = pd.concat([confirmed.iloc[:,:4], confirmed.iloc[:,-1].rename('cases')], axis=1)
    confirmed['country'] = confirmed.apply(lambda a: a['Country/Region'] if isinstance(a['Province/State'], float)
            else a['Province/State'] +', ' + a['Country/Region'], axis=1)
    
    recovered = data.getRecovered().iloc[:,-1].rename('recovered')
    
    death = data.getDeath().iloc[:,-1].rename('deaths')
    
    result = pd.concat([confirmed, recovered, death], axis=1)
    result[['recovered', 'deaths']] = result[['recovered', 'deaths']].fillna(0)

    result = result.rename(columns={"Lat": "lat", "Long": "lon"})
    
    result = result.drop(['Province/State', 'Country/Region'], axis=1)

    result = result.to_dict('record')

    return jsonify(result)



cache_api3 = TTLCache(maxsize=1, ttl=100)
@app.route("/api3")
# @cached(cache_api3)
def api3():

    confirmed = data.getConfirmed()
    confirmed = pd.concat(
        [
            confirmed.iloc[:,1].rename('country'),
            confirmed.iloc[:,-1].rename('cases'),
        ],
        axis=1,
    )
    confirmed = confirmed.groupby('country').sum()


    recovered = data.getRecovered()
    recovered = pd.concat(
        [
            recovered.iloc[:,1].rename('country'),
            recovered.iloc[:,-1].rename('recovered'),
        ],
        axis=1,
    )
    recovered = recovered.groupby('country').sum()


    death = data.getDeath()
    death = pd.concat(
        [
            death.iloc[:,1].rename('country'),
            death.iloc[:,-1].rename('deaths'),
        ],
        axis=1,
    )
    death = death.groupby('country').sum()


    days = data.getConfirmed()
    days['days'] = (days.iloc[:,4:] != 0).astype('int').sum(axis=1)
    days = days.iloc[:,[1,-1]]
    days = days.rename(columns={'Country/Region': 'country'}).sort_values('days', ascending=False)
    days = days.drop_duplicates(subset ="country")
    days = days.set_index('country').sort_index()
    # print(days)

    result = pd.concat([confirmed, recovered, death, days], axis=1, sort=False)
    result = result.reset_index()
    result['flag'] = 'assets/flags/' + result['country'] + '.png'
    result['active'] = result['cases'] - result['deaths'] - result['recovered']
    result['death_rate'] = round(result['deaths'] / result['cases']*100, 2)
    result['recovered_rate'] = round(result['recovered'] / result['cases']*100, 2)
    result = result.sort_values('cases', axis=0, ascending=False)
    result = result.reset_index(drop=True)
    result.index = result.index.set_names(['rank'])
    result = result.reset_index()
    result = result.to_dict('record')

    return jsonify(result)



cache_api4 = TTLCache(maxsize=1, ttl=100)
@app.route("/api4")
# @cached(cache_api4)
def api4():

    confirmed = data.getConfirmed()
    confirmed = confirmed.iloc[:,4:]

    date = confirmed.columns
    confirmed = confirmed.sum(axis=0).values

    recovered = data.getRecovered()
    recovered = recovered.iloc[:,4:]
    recovered = recovered.sum(axis=0).values

    death = data.getDeath()
    death = death.iloc[:,4:]
    death = death.sum(axis=0).values

    return {
        'date': np.nan_to_num(date).tolist(),
        'cases': np.nan_to_num(confirmed).tolist(),
        'deaths': np.nan_to_num(death).tolist(),
        'recovered': np.nan_to_num(recovered).tolist()
    }



cache_api4_detail = TTLCache(maxsize=1, ttl=100)
@app.route("/api4/detail")
# @cached(cache_api4_detail)
def api4_detail():

    country = request.args.get('country')

    confirmed = data.getConfirmed()
    confirmed = confirmed[confirmed['Country/Region'] == country]
    if len(confirmed.index) == 0:
        abort(404)
    confirmed = confirmed.iloc[:,4:]

    date = confirmed.columns
    confirmed = confirmed.sum(axis=0).values

    recovered = data.getRecovered()
    recovered = recovered[recovered['Country/Region'] == country]
    recovered = recovered.iloc[:,4:]
    recovered = recovered.sum(axis=0).values

    death = data.getDeath()
    death = death[death['Country/Region'] == country]
    death = death.iloc[:,4:]
    death = death.sum(axis=0).values

    return {
        'date': np.nan_to_num(date).tolist(),
        'cases': np.nan_to_num(confirmed).tolist(),
        'deaths': np.nan_to_num(death).tolist(),
        'recovered': np.nan_to_num(recovered).tolist()
    }



cache_api5 = TTLCache(maxsize=1, ttl=100)
@app.route("/api5")
# @cached(cache_api5)
def api5():

    confirmed = data.getConfirmed()
    confirmed = pd.concat(
            [
                confirmed.iloc[:,1].rename('country'),
                confirmed.iloc[:,-1].rename('cases'),
            ],
            axis=1,
        )
    confirmed = confirmed.groupby('country').sum().sort_values('cases', ascending=False).reset_index()
    x = confirmed.head(30)
    q = confirmed.iloc[30:]
    x = x.append(pd.DataFrame({'cases': q[['cases']].sum(), 'country': 'Others'})).reset_index(drop=True)
    label = x['country'].tolist()
    cases = x['cases']
    cases = round(cases / cases.sum() * 100, 2)
    cases = np.nan_to_num(cases).tolist()

    return {
        'label': label,
        'cases': cases,
    }



cache_api6 = TTLCache(maxsize=1, ttl=100)
@app.route("/api6")
# @cached(cache_api6)
def api6():

    confirmed = data.getConfirmed()
    confirmed = pd.concat(
            [
                confirmed.iloc[:,1].rename('country'),
                confirmed.iloc[:,-1].rename('cases'),
            ],
            axis=1,
        )
    confirmed = confirmed.groupby('country').sum().sort_values('cases', ascending=False).reset_index()
    x = confirmed.head(30)
    label = x['country'].tolist()
    cases = np.nan_to_num(x['cases']).tolist()

    return {
        'label': label,
        'cases': cases,
    }



cache_api7 = TTLCache(maxsize=1, ttl=100)
@app.route("/api7")
# @cached(cache_api7)
def api7():
    confirmed = data.getConfirmed()
    confirmed = confirmed.iloc[:,4:]
    total = confirmed.sum(axis=0)
    labels = total.index[1:].values.tolist()
    new_cases = np.nan_to_num(total.values[1:] - total.values[:-1]).tolist()

    return {
        'labels': labels,
        'new_cases': new_cases,
    }



cache_api7_detail = TTLCache(maxsize=1, ttl=100)
@app.route("/api7/detail")
# @cached(cache_api7_detail)
def api7_detail():

    country = request.args.get('country')

    confirmed = data.getConfirmed()
    confirmed = confirmed[confirmed['Country/Region'] == country]
    if len(confirmed.index) == 0:
        abort(404)
    confirmed = confirmed.iloc[:,4:]
    total = confirmed.sum(axis=0)
    labels = total.index[1:].values.tolist()
    new_cases = np.nan_to_num(total.values[1:] - total.values[:-1]).tolist()

    return {
        'labels': labels,
        'new_cases': new_cases,
    }



cache_api8 = TTLCache(maxsize=1, ttl=100)
@app.route("/api8")
# @cached(cache_api8)
def api8():
    deaths = data.getDeath()
    deaths = deaths.iloc[:,4:]
    total = deaths.sum(axis=0)
    labels = total.index[1:].values.tolist()
    new_deaths = np.nan_to_num(total.values[1:] - total.values[:-1]).tolist()

    return {
        'labels': labels,
        'new_deaths': new_deaths,
    }



cache_api8_detail = TTLCache(maxsize=1, ttl=100)
@app.route("/api8/detail")
# @cached(cache_api8_detail)
def api8_detail():

    country = request.args.get('country')

    deaths = data.getDeath()
    deaths = deaths[deaths['Country/Region'] == country]
    if len(deaths.index) == 0:
        abort(404)
    deaths = deaths.iloc[:,4:]
    total = deaths.sum(axis=0)
    labels = total.index[1:].values.tolist()
    new_deaths = np.nan_to_num(total.values[1:] - total.values[:-1]).tolist()

    return {
        'labels': labels,
        'new_deaths': new_deaths,
    }



cache_api9 = TTLCache(maxsize=1, ttl=100)
@app.route("/api9")
# @cached(cache_api9)
def api9():
    recovered = data.getRecovered()
    recovered = recovered.iloc[:,4:]
    total = recovered.sum(axis=0)
    labels = total.index[1:].values.tolist()
    new_recovered = np.nan_to_num(total.values[1:] - total.values[:-1]).tolist()

    return {
        'labels': labels,
        'new_recovered': new_recovered,
    }



cache_api9_detail = TTLCache(maxsize=1, ttl=100)
@app.route("/api9/detail")
# @cached(cache_api9_detail)
def api9_detail():

    country = request.args.get('country')

    recovered = data.getRecovered()
    recovered = recovered[recovered['Country/Region'] == country]
    if len(recovered.index) == 0:
        abort(404)
    recovered = recovered.iloc[:,4:]
    total = recovered.sum(axis=0)
    labels = total.index[1:].values.tolist()
    new_recovered = np.nan_to_num(total.values[1:] - total.values[:-1]).tolist()

    return {
        'labels': labels,
        'new_recovered': new_recovered,
    }



cache_api10 = TTLCache(maxsize=1, ttl=100)
@app.route("/api10")
# @cached(cache_api10)
def api10():

    confirmed = data.getConfirmed()
    confirmed = confirmed.iloc[:,4:]
    total_confirmed = confirmed.sum(axis=0)

    recovered = data.getRecovered()
    recovered = recovered.iloc[:,4:]
    total_recovered = recovered.sum(axis=0)

    death = data.getDeath()
    death = death.iloc[:,4:]
    total_death = death.sum(axis=0)
    

    date = total_confirmed.index.values.tolist()
    
    recovered_rate = np.nan_to_num(total_recovered.values / total_confirmed.values * 100).round(2)
    death_rate = np.nan_to_num(total_death.values / total_confirmed.values * 100).round(2)

    return {
        'date': date,
        'recovered_rate': recovered_rate.tolist(),
        'death_rate': death_rate.tolist(),
    }



cache_api10_detail = TTLCache(maxsize=1, ttl=100)
@app.route("/api10/detail")
# @cached(cache_api10_detail)
def api10_detail():

    country = request.args.get('country')

    confirmed = data.getConfirmed()
    confirmed = confirmed[confirmed['Country/Region'] == country]
    if len(confirmed.index) == 0:
        abort(404)
    confirmed = confirmed.iloc[:,4:]
    total_confirmed = confirmed.sum(axis=0)

    recovered = data.getRecovered()
    recovered = recovered[recovered['Country/Region'] == country]
    recovered = recovered.iloc[:,4:]
    total_recovered = recovered.sum(axis=0)

    death = data.getDeath()
    death = death[death['Country/Region'] == country]
    death = death.iloc[:,4:]
    total_death = death.sum(axis=0)

    date = total_confirmed.index[1:].values.tolist()
    
    recovered_rate = np.nan_to_num(total_recovered.values / total_confirmed.values * 100).round(2)
    death_rate = np.nan_to_num(total_death.values / total_confirmed.values * 100).round(2)

    return {
        'date': date,
        'recovered_rate': recovered_rate.tolist(),
        'death_rate': death_rate.tolist(),
    }



cache_api11 = TTLCache(maxsize=1, ttl=100)
@app.route("/api11")
# @cached(cache_api11)
def api11():
    confirmed = data.getConfirmed()
    confirmed = confirmed.iloc[:,4:]
    total_confirmed = confirmed.sum(axis=0)

    deaths = data.getDeath()
    deaths = deaths.iloc[:,4:]
    total_deaths = deaths.sum(axis=0)

    recovered = data.getRecovered()
    recovered = recovered.iloc[:,4:]
    total_recovered = recovered.sum(axis=0)


    labels = total_confirmed.index[1:].values.tolist()
    new_cases = np.nan_to_num(total_confirmed.values[1:] - total_confirmed.values[:-1]).tolist()
    new_deaths = np.nan_to_num(total_deaths.values[1:] - total_deaths.values[:-1]).tolist()
    new_recovered = np.nan_to_num(total_recovered.values[1:] - total_recovered.values[:-1]).tolist()

    return {
        'labels': labels,
        'new_cases': new_cases,
        'new_deaths': new_deaths,
        'new_recovered': new_recovered,
    }



cache_api11_detail = TTLCache(maxsize=1, ttl=100)
@app.route("/api11/detail")
# @cached(cache_api11_detail)
def api11_detail():

    country = request.args.get('country')

    confirmed = data.getConfirmed()
    confirmed = confirmed[confirmed['Country/Region'] == country]
    if len(confirmed.index) == 0:
        abort(404)
    confirmed = confirmed.iloc[:,4:]
    total_confirmed = confirmed.sum(axis=0)

    deaths = data.getDeath()
    deaths = deaths[deaths['Country/Region'] == country]
    deaths = deaths.iloc[:,4:]
    total_deaths = deaths.sum(axis=0)

    recovered = data.getRecovered()
    recovered = recovered[recovered['Country/Region'] == country]
    recovered = recovered.iloc[:,4:]
    total_recovered = recovered.sum(axis=0)


    labels = total_confirmed.index[1:].values.tolist()
    new_cases = np.nan_to_num(total_confirmed.values[1:] - total_confirmed.values[:-1]).tolist()
    new_deaths = np.nan_to_num(total_deaths.values[1:] - total_deaths.values[:-1]).tolist()
    new_recovered = np.nan_to_num(total_recovered.values[1:] - total_recovered.values[:-1]).tolist()

    return {
        'labels': labels,
        'new_cases': new_cases,
        'new_deaths': new_deaths,
        'new_recovered': new_recovered,
    }






if __name__ == "__main__":
    app.run(debug=True)