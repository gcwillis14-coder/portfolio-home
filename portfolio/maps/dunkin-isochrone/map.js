function RiStyle(feature) {
    return {
        fillColor: '#ffffff',
        weight: 2,
        opacity: 1,
        color: '#666666',
        dashArray: '3',
        fillOpacity: 0
    };
}

function getColor(d) {
    return d == 150 ? '#EA872C' :
           d == 300 ? '#EB9C50' :
           d == 600 ? '#ECB177' :
           d == 900 ? '#EEC69F' :
                      '#FFFFFF' ;
}

function PolyStyle(feature) {
    return {
        fillColor: getColor(feature.properties.seconds),
        fillOpacity: 0.8,
        weight: 2,
        color: getColor(feature.properties.seconds),
        opacity: 0.2
    };
}

async function addGeoJson(fileName, styleName) {
    const response = await fetch(fileName);
    const data = await response.json();
    L.geoJson(data, {style: styleName}).addTo(map);
}

var southWest = L.latLng(41.099222, -72.001916),
    northEast = L.latLng(42.093533, -70.973496),
    bounds = L.latLngBounds(southWest, northEast);

var map = L.map('map')
    .setView([41.78682, -71.2858], 10)
    .setMaxBounds(bounds);



mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; ' + mapLink + ' Contributors',
    maxZoom: 18,
    minZoom: 10,
}).addTo(map);

addGeoJson("./data/rhode_island.geojson", RiStyle);
addGeoJson("./data/dunkin_distance.geojson", PolyStyle);

/*Legend specific*/
var legend = L.control({ position: "topright" });

legend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Travel Time</h4>";
    div.innerHTML += '<i style="background: #EA872C"></i><span>&nbsp;&nbsp;2 mins 30s</span><br>';
    div.innerHTML += '<i style="background: #EB9C50"></i><span>&nbsp;&nbsp;5 mins</span><br>';
    div.innerHTML += '<i style="background: #ECB177"></i><span>10 mins</span><br>';
    div.innerHTML += '<i style="background: #EEC69F"></i><span>15 mins</span><br>';
    div.innerHTML += '<hr>';
    div.innerHTML += "<h4>Travel Time</h4>";
  return div;
};

legend.addTo(map);
