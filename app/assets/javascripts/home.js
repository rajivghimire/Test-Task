function submitFrom() {
    var api_key = $('#api_key').val();
    var school_name = document.getElementById('school.name').value;
    $.ajax({
        type: 'GET',
        url: 'https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=' + api_key,
        dataType: 'json',
        data: "school.name=" + school_name + "&fields=id,school.name,location,school.city,school.state",
        success: function(data) {
            loadFullMap(data.results);
        },
        error: function(response) {}
    })
}

function loadFullMap(locations) {

    var map = new google.maps.Map(document.getElementById('full-map'), {
        zoom: 4,
        center: new google.maps.LatLng(locations[0]['location.lat'], locations[0]['location.lon'])
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i]['location.lat'], locations[i]['location.lon']),
            map: map
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent(locations[i]['school.name']);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
}