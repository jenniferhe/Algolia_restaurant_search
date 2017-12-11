# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""

import json
import csv
import pandas
from algoliasearch import algoliasearch
client = algoliasearch.Client("W6M077NCU8","36bc48bfbb050cd149f5897afcc7604d")
index = client.init_index('test_project1')

data = {}
with open('resources/dataset/restaurants_info.csv') as csvfile:
    readCSV = csv.reader(csvfile, delimiter=';')
    i = 0
    for row in readCSV:
        del row[5]
        data[int(row[0])]=row[:-1]

with open('resources/dataset/restaurants_list.json') as data_file:    
    readJson = json.load(data_file)        
#d = pandas.read_json('resources/dataset/restaurants_list.json')
for d in readJson:
    data[d['objectID']].append(d['name'])
    data[d['objectID']].append(d['image_url'])
    data[d['objectID']].append(d['reserve_url'])
    data[d['objectID']].append(d['payment_options'])
    print(data[d['objectID']])
    
fieldnames = ["objectID","food_type","stars_count","reviews_count",
              "neighborhood","price_range","name","Image_URL","URL","payment"];
 
def toJson(ll):
    s2 = {}
    s2[fieldnames[0]]=int(ll[0])
    s2[fieldnames[1]]=ll[1]
    s2[fieldnames[2]]=float(ll[2])
    s2[fieldnames[3]]=int(ll[3])
    s2[fieldnames[4]]=ll[4]
    s2[fieldnames[5]]=ll[5]
    s2[fieldnames[6]]=ll[6]
    s2[fieldnames[7]]=ll[7]
    s2[fieldnames[8]]=ll[8]
    return s2
    '''
    s = "{"
    s+="\"" + fieldnames[0] + "\":" + ll[0] + ","
    s+="\"" + fieldnames[1] + "\":" + "\"" + ll[1] + "\","
    s+="\"" + fieldnames[2] + "\":" + ll[2] + ","
    s+="\"" + fieldnames[3] + "\":" + ll[3] + ","
    s+="\"" + fieldnames[4] + "\":" + "\"" + ll[4] + "\","
    s+="\"" + fieldnames[5] + "\":" + "\"" + ll[5] + "\","
    s+="\"" + fieldnames[6] + "\":" + "\"" + ll[6] + "\","
    s+="\"" + fieldnames[7] + "\":" + "\"" + ll[7] + "\","
    s+="\"" + fieldnames[8] + "\":" + "\"" + ll[8] + "\","
    return s[:-1]+"}"             
    '''
file = open('test.txt','w')             
for i in data.keys():
    #print(toJson(data[i]))
    res = index.add_object(toJson(data[i]))
    
index.set_settings({
    'attributesForFaceting': [
        'food_type',
        'filterOnly(category)',
        'searchable(publisher)'
    ]
})

index.setSettings({
  'attributesForFaceting': ['food_type', 'stars_count']
})

index.getSettings()



index.search({
    filters: 'food_type:American'
})



