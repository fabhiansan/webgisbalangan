from django.contrib import admin
from .models import AllBor, RciHauling, Reklamasi
from leaflet.admin import LeafletGeoAdmin
# Register your models here.

class AllBorAdmin(LeafletGeoAdmin):
    pass

class RciHaulingAdmin(LeafletGeoAdmin):
    pass

class ReklamasiAdmin(LeafletGeoAdmin):
    pass

#admin.site.register(GomapTestpoint, GomapTestpointAdmin)

admin.site.register(AllBor, AllBorAdmin)
admin.site.register(RciHauling, RciHaulingAdmin)
admin.site.register(Reklamasi, ReklamasiAdmin)