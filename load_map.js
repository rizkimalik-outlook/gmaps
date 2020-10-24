
function initialize_map() {
	var map=[];
	var centerMap = [];
	var infowindow = new google.maps.InfoWindow;
	var latlngboundsMap = new google.maps.LatLngBounds();
	var id_kota = document.getElementById("pilih_kota").value;

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
	
	//load data
	fetch("point.json")
	.then((response) => response.json())
	.then((responseJson) => {

		let str = JSON.stringify(responseJson);
		let json = JSON.parse(str);
		// console.log(json);
		
		
		for(var i=0; i<json.length; i++){
			if(json[i].id_kota == id_kota){
				var latLng = new google.maps.LatLng(parseFloat(json[i].lat), parseFloat(json[i].lng));
				centerMap.push(latLng);

				var marker = new google.maps.Marker({
					position: latLng,
					map: map,
					icon: 'images/marker.png',
					title: json[i].nama_point
				});
				// console.log(json[i].latLng);

				// var details = json[i].nama_point;
				var details = "<div style='width:350px;background-color:#fff;padding-bottom:0;font-size:10px;'>"+
					// "<img src='images/newsletter.jpg' width='100%' height='' />"+
					"<table border='0' width='100%'>"+
						"<tr><td width='25%' valign='top'>Nama Point</td><td width='5%' valign='top'>:</td><td width='70%'>"+json[i].nama_point+"</td></tr>"+
						"<tr><td width='25%' valign='top'>Latitude</td><td width='5%' valign='top'>:</td><td width='70%'>"+json[i].lat+"</td></tr>"+
						"<tr><td width='25%' valign='top'>Langitude</td><td width='5%' valign='top'>:</td><td width='70%'>"+json[i].lng+"</td></tr>"+
						"<tr><td width='25%' valign='top'>Alamat</td><td width='5%' valign='top'>:</td><td width='70%'>"+json[i].alamat+"</td></tr>"+
					"</table>"+
				"</div>"; 
					  
				bindInfoWindow(marker, map, infowindow, details);
			
			}
		}

        for(var i=0; i<centerMap.length; i++){
			latlngboundsMap.extend(centerMap[i]);
		}
		map.fitBounds(latlngboundsMap);
		
		//infowindow custom
		/* google.maps.event.addListener(infowindow, 'domready', function() {
			// Removes white background DIV
			// var iwOuter = $('.gm-style-iw');
			var iwOuter = document.getElementsByClassName("gm-style-iw");
			var iwBackground = iwOuter.prev();
			iwBackground.children(':nth-child(2)').css({'display' : 'none'});
			iwBackground.children(':nth-child(4)').css({'display' : 'none'});
			
			// Apply the desired effect to the close button
			var iwCloseBtn = iwOuter.next();
			iwCloseBtn.css({opacity: '1', right: '20px', top: '3px'});
		}); */
			
	})
	.catch((error) => {
		console.error(error);
	});
}


function bindInfoWindow(marker, map, infowindow, details) {
    google.maps.event.addListener(marker, 'mouseover', function () {
        infowindow.setContent(details);
        infowindow.open(map, marker);
    });
}


