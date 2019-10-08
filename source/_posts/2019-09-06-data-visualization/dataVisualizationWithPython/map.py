import matpotlib.pyplot as plt
import pandas as pd
import folium

df_incidents = pd.read_csv('https://cocl.us/sanfran_crime_dataset')
print('Dataset downloaded and read into a pandas dataframe!')
df_count = df_incidents['PdDistrict'].value_counts().to_frame()
df_count = pd.DataFrame.from_dict(list(df_count.to_dict()['PdDistrict'].items()))
df_count = df_count.rename(columns={0:'Neighborhood',1:'Count'})
print('Dataframe restuctured!')
latitude = 37.77
longitude = -122.42
sanfran_map = folium.Map(location=[latitude,longitude], zoom_start=12)
folium.Choropleth(
            geo_data='https://cocl.us/sanfran_geojson',
            data=df_count,
            columns=['Neighborhood','Count'],
            key_on='feature.properties.DISTRICT',
            fill_color='YlOrRd',
            fill_opacity=0.7,
            line_opacity=0.2,
            legend_name='Crime Rate in San Francisco').add_to(sanfran_map)
sanfran_map
