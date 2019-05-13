//the main.js file
window.onload = function () {
var source_gs = new ol.source.TileWMS({
  url : 'http://192.168.34.10:8080/geoserver/db_balangan/wms?',
  params : {
    'LAYERS' : 'db_balangan:reklamasi',
    'VERSION' : '1.1.0',
    'FORMAT' : 'image/png',
    'TILED' : true
  },
  serverType : 'geoserver'
});

var layer_geoserver = new ol.layer.Tile({
  source : source_gs
})

var source_bor = new ol.source.TileWMS({
  url : 'http://192.168.34.10:8080/geoserver/db_balangan/wms?',
  params : {
    'LAYERS' : 'db_balangan:all_bor',
    'VERSION' : '1.1.0',
    'FORMAT' : 'image/png',
    'TILED' : true
  },
  serverType : 'geoserver'
});

var layer_bor = new ol.layer.Tile({
  source : source_bor
})

/*

var source_tif = new ol.source.TileWMS({
  url : 'http://192.168.34.10:8080/geoserver/cite/wms?',
  params : {
    'LAYERS' : 'db_balangan:wwm_reklamasi',
    'VERSION' : '1.1.0',
    'FORMAT' : 'image/png',
    'TILED' : true
  },
  serverType : 'geoserver'
});

var layer_tif = new ol.layer.Tile({
  source : source_tif
})
  
*/
var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }), layer_geoserver, layer_bor
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([115.603, -2.345]),
      zoom: 12
    })
  });




/*

var layers = [
    new TileLayer({
        source: new OSM()
    }),
    new TileLayer({
        extent: [-13884991, 2870341, -7455066, 6338219],
        source: new TileWMS({
        url: 'https://ahocevar.com/geoserver/wms',
        params: {'LAYERS': 'topp:states', 'TILED': true},
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0
        })
})
];
var map = new Map({
    layers: layers,
    target: 'map',
    view: new View({
      center: [-10997148, 4569099],
      zoom: 4
    })
  });    

http://192.168.34.10:8080/geoserver/db_balangan/wms?

*/


  }