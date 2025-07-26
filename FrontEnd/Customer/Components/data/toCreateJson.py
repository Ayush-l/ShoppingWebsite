import pickle
import json

# Load pickle binary file
f=open('kurtiF.json','w')
with open('kurtiF.dat', 'rb') as df:
    try:
        while(True):
            data = pickle.load(df)
            json.dump(data, f, indent=2)
    except:
        df.close();
        f.close();