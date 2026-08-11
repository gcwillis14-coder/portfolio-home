// function for swapping layers
function swapLayer() {
    map.removeLayer(rightLayer);

    var newLayer = L.esri.tiledMapLayer({
        url: document.getElementById("image-year").value,
        attribution: 'Tiles provided by: <a href="https://www.rigis.org/">RIGIS</a>'
    })

    rightLayer = newLayer
    map.addLayer(rightLayer);
    sideBySide.setRightLayers(rightLayer);
}

// function for moving map to suggested locations
function quickLocation() {
    var loc = document.getElementById("quick-location").value.split(',');   
    map.setView([loc[0], loc[1]], loc[2]);
}

// function to get user location
function userLocation() {
    map.locate({setView: true, maxZoom: 15});
}

// setup map bounds, options and base
var southWest = L.latLng(41.099222, -72.001916),
    northEast = L.latLng(42.093533, -70.973496),
    bounds = L.latLngBounds(southWest, northEast);

var mapOptions = {
    zoomControl: false,
    attributionControl: false
}

var map = L.map('map', mapOptions)
    .setView([41.725024, -71.429290], 15)
    .setMaxBounds(bounds);

L.control.attribution({position: 'bottomleft'}).addTo(map);

// default layers and set up side by side map
var rightLayer = L.esri.tiledMapLayer({
    url: 'https://tiles.arcgis.com/tiles/S8zZg9pg23JUEexQ/arcgis/rest/services/atlas_img_1962/MapServer',
    attribution: 'Tiles provided by: <a href="https://www.rigis.org/">RIGIS</a>'
}).addTo(map);

var leftLayer = L.tileLayer.wms('https://maps.edc.uri.edu/rigis/services/IMG/RI_202004_RGB_3in_web/ImageServer/WMSServer', {
    layers: '0'
}).addTo(map);

sideBySide = L.control.sideBySide(leftLayer, rightLayer).addTo(map);

// add top right controls
var select = L.control({position: "topright"});
select.onAdd = function (map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Select Year</h4>";
    div.innerHTML += '<select id="image-year" name="image-year" onchange="swapLayer()"></select>';
    div.innerHTML += "<h4>Quick Location</h4>";
    div.innerHTML += '<select id="quick-location" name="quick-location" onchange="quickLocation()"></select>';
    div.innerHTML += "<h4>Your Location</h4>";
    div.innerHTML += '<button type="button" onclick="userLocation()">Your Location</button>';
    return div;
};
select.addTo(map);

var layerDropdown = document.getElementById('image-year');
for (i = 0; i < layerSelection.length; i++) {
    var element = layerSelection[i];

    var htmlToAppend = document.createElement('option');
    htmlToAppend.innerHTML = element.year;
    htmlToAppend.value = element.url;
    layerDropdown.appendChild(htmlToAppend);
}

var locationDropdown = document.getElementById('quick-location');
for (i = 0; i < locationList.length; i++) {
    var element = locationList[i];
    console.log(element)

    var htmlToAppend = document.createElement('option');
    htmlToAppend.innerHTML = element.name;
    htmlToAppend.value = element.location;
    locationDropdown.appendChild(htmlToAppend);
}