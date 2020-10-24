//HITUNG DISTANCE
function initMap() {
	var map=[];
	var centerMap = [];
	var infowindow = new google.maps.InfoWindow;
	var latlngboundsMap = new google.maps.LatLngBounds();

    map = new google.maps.Map(document.getElementById("map"));
	map.setOptions({
		mapTypeControlOptions: {
			style:google.maps.MapTypeControlStyle.DROPDOWN_MENU,
			mapTypeIds: [google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.ROADMAP],
			position: google.maps.ControlPosition.TOP_LEFT
		},
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		scaleControl: true,
		streetViewControl: true,
		zoomControl: true,
	});
	
	// var origin = [];
	// var destination = [];
	var bounds = new google.maps.LatLngBounds;
	var geocoder = new google.maps.Geocoder;
	var service = new google.maps.DistanceMatrixService;
	var id_point1 = document.getElementById("id_point1").value;
	var id_point2 = document.getElementById("id_point2").value;
	var outputDiv = document.getElementById('table_result');
	outputDiv.innerHTML = '';
	
	// var origin = { lat: parseFloat(id_point1.substring(0,9)), lng: parseFloat(id_point1.substring(10,20)) }; 
	// var destination = { lat: parseFloat(id_point2.substring(0,9)), lng: parseFloat(id_point2.substring(10,20)) }; 
	
	// var origin = {lat: -6.2611435, lng: 106.8349802};
	// var destination = {lat: -6.2845348, lng: 106.903337};
	var origin = {lat: -6.5980046, lng: 106.7974666};
	var destination = {lat: -6.1810076, lng: 106.8228039};
	
	
	service.getDistanceMatrix({
		origins: [origin],
		destinations: [destination],
		travelMode: google.maps.TravelMode.DRIVING,
		unitSystem: google.maps.UnitSystem.METRIC,
		avoidHighways: false,
		avoidTolls: false
	}, callback);
	
	function callback (response, status) {
		// console.log(response);
			
		var results = response.rows[0].elements;
		for (var j = 0; j < results.length; j++) {
			outputDiv.innerHTML += '<tr><td>' + response.originAddresses[j] + '</td><td>' + response.destinationAddresses[j] + '</td><td>' + results[j].distance.text + ' - '+results[j].duration.text+'</td></tr>';
		}
	};   
	
	markerLokation(origin,'Start');
	markerLokation(destination,'Finish');
	
	function markerLokation(coordinate,detail){
		var latLng = new google.maps.LatLng(coordinate);
		centerMap.push(latLng);

		var marker = new google.maps.Marker({
			position: latLng,
			map: map,
			icon: 'images/'+detail+'.png',
			title: 'tes'
		});
		// console.log(json[i].latLng);

		var details = detail;
			  
		bindInfoWindow(marker, map, infowindow, details);
		
		for(var i=0; i<centerMap.length; i++){
			latlngboundsMap.extend(centerMap[i]);
		}
		map.fitBounds(latlngboundsMap);
	}
	
}

function bindInfoWindow(marker, map, infowindow, details) {
    google.maps.event.addListener(marker, 'mouseover', function () {
        infowindow.setContent(details);
        infowindow.open(map, marker);
    });
}