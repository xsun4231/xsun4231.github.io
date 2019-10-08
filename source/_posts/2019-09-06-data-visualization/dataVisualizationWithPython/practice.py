#%%
import numpy as np
import pandas as pd
import folium

world_map = folium.Map(location=[23, -102], zoom_start=4, tiles='Stamen Toner')

world_map

#%%
import folium

world_map = folium.Map(location=[23, -102], zoom_start=4, tiles='Stamen Terrain')

world_map

#%%
import folium

world_map = folium.Map(tiles='Mapbox Bright')

world_map

#%%
