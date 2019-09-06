#%%
import matplotlib.pyplot as plt
import pandas as pd

df_survery = pd.read_csv('https://cocl.us/datascience_survey_data', 
index_col=0)
total = 2233
label_size = 14
title_size = 16
df_survery.sort_values(by='Very interested', ascending=False, inplace=True)
df_survery = df_survery.div(total).round(2)
df_survery.head(6)
color = ['#5cb85c','#5bc0de','#d9534f']
df_survery.plot(kind='bar', figsize=(20,8), width=0.8, color=color)
plt.title("Percentage of Respondents' Interest in Data Science Areas",fon)
plt.box(False)
plt.rc('font', size=label_size) 
plt.rc('legend', fontsize=title_size)    
plt.rc('figure', titlesize=title_size) 
plt.show()


#%%
import matplotlib.pyplot as plt
import pandas as pd

result = pd.read_csv('https://cocl.us/datascience_survey_data', 
index_col=0)
colors = ['#5cb85c','#5bc0de','#d9534f']
total = 2233
result.sort_values(by='Very interested', ascending=False, inplace=True)
result = result.div(total).round(4).mul(100)
# Change this line to plot percentages instead of absolute values
ax = result.plot(kind='bar',figsize=(20,8),width = 0.8,color = colors, edgecolor=None)
plt.legend(labels=result.columns,fontsize= 14)
plt.title("Percentage of Respondents' Interest in Data Science Areas",fontsize= 16)

plt.xticks(fontsize=14)
for spine in plt.gca().spines.values():
    spine.set_visible(False)
plt.yticks([])

# Add this loop to add the annotations
for p in ax.patches:
    width, height = p.get_width(), p.get_height()
    x, y = p.get_xy() 
    ax.annotate('{:.2f}%'.format(height), (p.get_x()+.5*width, p.get_y() + height + 1), ha = 'center')

plt.show()

#%%
import matplotlib.pyplot as plt
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



#%%
