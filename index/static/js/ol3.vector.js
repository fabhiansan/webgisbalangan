// class to load vector layers from Postgis using a modified php-script from
 // Bryan McBride
 // https://github.com/bmcbride/PHP-Database-GeoJSON 
 //
 ol3Vector = function(options) {

    //
    // -------- Defining default style settings ----------
    //
    var fill = new ol.style.Fill({
       color: 'rgba(255,255,255,0.4)'
    });
    var stroke = new ol.style.Stroke({
       color: '#3399CC',
       width: 1.25
    });
    var text = new ol.style.Text({
       text: "",
       font: "16px Calibri,sans-serif",
       fill: new ol.style.Fill({
           color: [255, 255, 255, 1]
       }),
       stroke: new ol.style.Stroke({
           color: [0, 0, 0, 1],
           width: 2.5
       })
   });
   
   var image = new ol.style.Circle({  // actually point styling only works with image, and not with icons
       fill: fill,
       stroke: stroke,
       radius: 5
   });
   
   var style = new ol.style.Style({
       image: image,
       fill: fill,
       stroke: stroke,
       text: text
   });
   
   var styles = [style];
   
   //
   // ------------- defining options to build the new ol3Vector-layer -----------
   //
   var options = {
       title: options.title,
       visible: false,
       geotable: options.geotable,  // table name in PostGis-database
       fields: options.fields,      // field-names
       where: options.where,        // where-string passed to PostGis
       source: new ol.source.Vector({
           projection: "EPSG:4326",
           attributions: [new ol.Attribution({
               html: options.attribution
           })],
           strategy: ol.loadingstrategy.bbox,   //load only data off the visible map
           loader: function(extent, resolution, projection) {
               var extent = ol.proj.transformExtent(extent, projection.getCode(), ol.proj.get('EPSG:4326').getCode());
               $.ajax({
                   type: "GET",
                   dataType: "json",
                   url: "./mapdata/get_geojson.php?" +     // define path to the get_geojson.php script
                       "geotable=" + options.geotable +
                       "&fields=" + options.fields +
                       "&where=" + options.where +
                       "&bbox=" + extent.join(","),
                   context: this
               }).done(function(data) {
                   var format = new ol.format.GeoJSON();
                   this.addFeatures(format.readFeatures(data, {
                       dataProjection: "EPSG:4326",
                       featureProjection: "EPSG:3857"
                   }));
   
               });
   
           }
       }),
       minResolution: options.minResolution,
       maxResolution: options.maxResolution,
       content: options.content,
       symbology: options.symbology,
       showLabels: options.showLabels,
       label: options.label,
       style: (function label_style() { // style function needed to be wrapped in a function to get it work
           // ------ labeling -----------
           var layerLabel = "";
           if (!options.showLabels) {
               layerLabel = "";
           } else if (options.showLabels) {
               layerLabel = options.label;
           }
           return function(feature, resolution) {
               style.getText().setText(feature.get(layerLabel));
   
               // ------ styling -------------
               if (!options.symbology) {
                   return style;
                   //            return false;        
               } else if (options.symbology) {
   
                   var atts = feature.getProperties();
   
                   switch (options.symbology.type) {
                       case "single":
                           // Its a single symbology for all features so just set the values for fill and stroke
                           //
                           switch (feature.getGeometry().getType()) {
                               case "Point":
                               case "MultiPoint":
   
                                   style.image = style.getImage().getFill().setColor(options.symbology.styleOptions.fill);
                                   style.image = style.getImage().getStroke().setColor(options.symbology.styleOptions.color);
                                   style.image = style.getImage().getStroke().setWidth(options.symbology.styleOptions.width);
                                   style.image = style.getImage().setRadius(options.symbology.styleOptions.radius);
                                   break;
   
                               case "LineString":
                               case "MultiLineString":
                               case "Polygon":
                               case "MultiPolygon":
   
                                   style.fill = style.setFill(new ol.style.Fill({
                                       color: options.symbology.styleOptions.fill
                                   }));
                                   style.stroke = style.setStroke(new ol.style.Stroke({
                                       color: options.symbology.styleOptions.color,
                                       width: options.symbology.styleOptions.width
                                   }));
                                   break;
                           }
                           break;
   
                       case "unique":
                           // Its a unique symbology. Check if the features property value matches that in the symbology and style accordingly
                           // 
                           var att = options.symbology.property;
                           for (var i = 0, len = options.symbology.values.length; i < len; i++) { // field with values to define styles
                               if (atts[att] == options.symbology.values[i].value) { // unique value to identify style
                                   for (var key in options.symbology.values[i].styleOptions) {
   
                                       switch (feature.getGeometry().getType()) {
                                           case "Point":
                                           case "MultiPoint":
   
                                               style.image = style.getImage().getFill().setColor(options.symbology.values[i].styleOptions.fill);
                                               style.image = style.getImage().getStroke().setColor(options.symbology.values[i].styleOptions.color);
                                               style.image = style.getImage().getStroke().setWidth(options.symbology.values[i].styleOptions.width);
                                               style.image = style.getImage().setRadius(options.symbology.values[i].styleOptions.radius);
                                               break;
   
                                           case "LineString":
                                           case "MultiLineString":
                                           case "Polygon":
                                           case "MultiPolygon":
   
                                               style.fill = style.setFill(new ol.style.Fill({
                                                   color: options.symbology.values[i].styleOptions.fill
                                               }));
                                               style.stroke = style.setStroke(new ol.style.Stroke({
                                                   color: options.symbology.values[i].styleOptions.color,
                                                   width: options.symbology.values[i].styleOptions.width
                                               }));
                                               break;
                                       }
                                   }
                               }
                           }
                           break;
   
                       case "range":
                           // Its a range symbology. Check if the features property value is in the range set in the symbology and style accordingly
                           //
                           var att = options.symbology.property;
                           for (var i = 0, len = options.symbology.ranges.length; i < len; i++) {
                               if (atts[att] >= options.symbology.ranges[i].range[0] && atts[att] <= options.symbology.ranges[i].range[1]) {
                                   for (var key in options.symbology.ranges[i].styleOptions) {
   
                                       switch (feature.getGeometry().getType()) {
                                           case "Point":
                                           case "MultiPoint":
   
                                               style.image = style.getImage().getFill().setColor(options.symbology.ranges[i].styleOptions.fill);
                                               style.image = style.getImage().getStroke().setColor(options.symbology.ranges[i].styleOptions.color);
                                               style.image = style.getImage().getStroke().setWidth(options.symbology.ranges[i].styleOptions.width);
                                               style.image = style.getImage().setRadius(options.symbology.ranges[i].styleOptions.radius);
                                               break;
   
                                           case "LineString":
                                           case "MultiLineString":
                                           case "Polygon":
                                           case "MultiPolygon":
   
                                               style.fill = style.setFill(new ol.style.Fill({
                                                   color: options.symbology.ranges[i].styleOptions.fill
                                               }));
                                               style.stroke = style.setStroke(new ol.style.Stroke({
                                                   color: options.symbology.ranges[i].styleOptions.color,
                                                   width: options.symbology.ranges[i].styleOptions.width
                                               }));
                                               break;
                                       }
                                   }
                               }
                           }
   
                           break;
                   }
               }
               return styles;
           }
       })()
   }
   
   ol.layer.Vector.call(this, options);
   
   };
   
   ol.inherits(ol3Vector, ol.layer.Vector);