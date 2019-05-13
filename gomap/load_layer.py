# Auto-generated `LayerMapping` dictionary for area2 model
import os
from django.contrib.gis.utils import LayerMapping
from .models import area3


area3_mapping = {
    'layer': 'LAYER',
    'gm_type': 'GM_TYPE',
    'geom': 'MULTIPOLYGON',
}


shp_data = os.path.abspath(os.path.join(os.path.dirname(__file__), 'data/area2.shp'))

def run(verbose=True):
    lm = LayerMapping(area3, shp_data, area3_mapping, transform=True, encoding='utf-8')
    lm.save(strict=True, verbose=verbose)