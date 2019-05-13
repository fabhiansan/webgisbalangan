function init() {
    document.removeEventListener('DOMContentLoaded', init);
    
    //
    // ------- Layers and Map ----------------
    //
    var baselayers = new ol.layer.Group({  
        title: 'Baselayers',
        layers: [
            new ol.layer.Tile({
                title: 'OSM',
                type: 'base',
                visible: true,
                source: new ol.source.OSM()
            })
        ]
    });
    
    var toplayers = new ol.layer.Group({
        title: 'Toplayer',
        layers: []
    });
    
    
    var view = new ol.View({
        center: ol.proj.fromLonLat([6.2, 49.6]),
        zoom: 12
    });
    
    var popup_div = document.getElementById('popup');
    var popup = new ol.Overlay({
        element: popup_div,
        positioning: 'bottom-center',
        stopEvent: false
    });
    
    var map = new ol.Map({
        target: 'map',
        view: view,
        controls: ol.control.defaults().extend([
            new ol.control.Zoom(),
            new ol.control.FullScreen(),
            new ol.control.ZoomSlider(),
            new ol.control.LayerSwitcher({  //layergroups are used with the layerswitcher from https://github.com/walkermatt/ol3-layerswitcher
                tipLabel: 'Layer Switcher'
            }),
            new ol.control.OverviewMap(),
            new ol.control.ScaleLine()
        ]),
        overlays: [popup],
        layers: [baselayers, toplayers],
        interactions: ol.interaction.defaults().extend([
            new ol.interaction.Select({
                layers: [baselayers, toplayers]
            })
        ])
    });
    
    //
    // ------------ define toplayers -------------------
    //
    var n2k_dh_l = new ol3Vector({
        title: "Natura 2000 Habitats Directive",   // name of the layer to show up in the layerswitcher
        attribution: "<br />Réseau Natura 2000 Habitats Directive",
        geotable: "n2k_dh",
        fields: "gid as id, sitecode, sitename, surfha",
        where: "sitename ilike '%moselle%'",    // You can use all the PostgreSQL or PostGis features here
        symbology: {
            type: "single",
            styleOptions: {
                fill: "rgba(100,250,0,0.1)",   // define colors as rgba()
                color: "green",                // or simple color-names
                width: 2
            }
        },
        minResolution: 0.01,
        maxResolution: 50,
        content: "<p><strong> BH {sitecode}</strong><hr>{sitename}<br />{surfha} ha </p>",
        showLabels: true,    // show labels on map
        label: "sitename"    // field used for labeling
    });
    
    var n2k_do_l = new ol3Vector({
        title: "Natura 2000 Birds Directive",
        attribution: "<br />Réseau Natura 2000 Birds Directive",
        geotable: "n2k_do",
        fields: "gid as id, sitecode, sitename, surfha",
        where: "",
        symbology: {
            type: "single",
            styleOptions: {
                fill: "rgba(100,250,0,0.1)",
                color: "magenta",
                width: 2
            }
        },
        minResolution: 0.01,
        maxResolution: 50,
        content: "<p><strong> BD {sitecode}</strong><hr>{sitename}<br />{surfha} ha </p>",
        showLabels: true,
        label: "sitecode"
    });
    
    var communes = new ol3Vector({
        map: map,
        title: "Communes",
        attribution: "<br />Communes",
        geotable: "communes",
        fields: "gid as id, surfha, commune, stats",
        where: "",
        symbology: {
            type: "unique",
            property: "stats",  // field used to style depending on their value
            values: [{
                    value: "AB", 
                    styleOptions: {
                        fill: "rgba(0,0,0,0.0)",
                        color: "grey",
                        width: 1.25
                    }
                },
                {
                    value: "CD",
                    styleOptions: {
                        fill: "rgba(100,250,0,0.1)",
                        color: "green",
                        width: 2
                    }
                },
                {
                    value: "",
                    styleOptions: {
                        fill: "rgba(250,0,0,0.1)",
                        color: "red",
                        width: 2
                    }
                }
            ]
        },
        minResolution: 0.01,
        maxResolution: 50,
        content: "<p><strong>{commune}</strong><hr>{stat}<br />{surfha} ha </p>",
        showLabels: true,   
        label: "commune"    
    });
    
    var n2k_dh_r = new ol3Vector({
        map: map,
        title: "Natura 2000 Habitats Directive - site size",
        attribution: "<br />Réseau Natura 2000 Habitats Directive",
        geotable: "n2k_dh",
        fields: "gid as id, sitecode, sitename, surfha",
        where: "",
        symbology: {
            type: "range",
            property: "surfha", // field that holds values that should be displayed as ranges
            ranges: [{
                range: [1, 100], // defining range min and max values of property field
                styleOptions: {
                    fill: "rgba(220,20,60,0.3)",
                    color: "crimson",
                    width: 1
                }
            }, {
                range: [101, 1000],
                styleOptions: {
                    fill: "rgba(255,165,0,0.3)",
                    color: "orange",
                    width: 1
                }
            }, {
                range: [1001, 10000],
                styleOptions: {
                    fill: "rgba(255,255,0,0.3)",
                    color: "Yellow",
                    width: 1
                }
            }]
        },
        minResolution: 0.01,
        maxResolution: 50,
        content: "<p><strong> BH {sitecode}</strong><hr>{sitename}<br />{surfha} ha </p>",
        showLabels: true,
        label: "sitecode"
    });
    
    var btk_p = new ol3Vector({
        map: map,
        title: "Habitats points",  // point layers
        attribution: "<br />Cartho",
        geotable: "btk_p",
        fields: "gid as id, btyp1_code, btyp1_name, cs",
        where: "",
        symbology: {
            type: "unique",
            property: "cs",
            values: [{
                    value: "A", 
                    styleOptions: {
                        fill: "rgba(0,128,0,0.3)",
                        color: "rgba(0,128,0,0.3)",
                        width: 1,
                        radius: 20 // must be set in order to render point features    
                    }
                },
                {
                    value: "B",
                    styleOptions: {
                        fill: "rgba(255,165,0,0.3)",
                        color: "rgba(255,165,0,0.3)",
                        width: 1,
                        radius: 15
                    }
                },
                {
                    value: "C",
                    styleOptions: {
                        fill: "rgba(255,0,0,0.3)",
                        color: "rgba(255,0,0,0.3)",
                        width: 1,
                        radius: 10
                    }
                }
            ]
        },
        minResolution: 0.01,
        maxResolution: 50,
        content: "<p><strong>{btyp1_code}</strong><hr>{btyp1_name}<br />{cs}</p>",
        showLabels: false,
        label: "bewertung1"
    });
    
    // ------------------ add ol3Vectors to toplayers ----------
    // 
    toplayers.setLayers(new ol.Collection([n2k_do_l, n2k_dh_l, communes, n2k_dh_r, btk_p]));
    //
    // ------------------ show popups based on content-template for different layers --------------------
    //  
    map.on('click', function(evt) {
        var feature = map.forEachFeatureAtPixel(evt.pixel,
            function(feature, layer) {
                return feature;
            });
        var popupContent = map.forEachLayerAtPixel(evt.pixel,
            function(layer) {
                return layer.get('content');
            });
        if (feature) {
            popup.setPosition(evt.coordinate);
            var atts = feature.getProperties();
            for (var prop in atts) {
                var re = new RegExp("{" + prop + "}", "g");
                popupContent = popupContent.replace(re, atts[prop]);
            }
            $(popup_div).attr('data-placement', 'auto');
            $(popup_div).attr('data-content', popupContent);
            $(popup_div).attr('data-html', true);
            $(popup_div).popover();
            $(popup_div).popover('show');
            $('.popover-title').click(function() {
                $(popup_div).popover('destroy');
            });
        } else {
            $(popup_div).popover('destroy');
        }
    });
    } // End function init()
    document.addEventListener('DOMContentLoaded', init);



