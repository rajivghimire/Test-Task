function submitFrom() {
    var api_key = $('#api_key').val();
    var school_name = document.getElementById('school.name').value;
    $.ajax({
        type: 'GET',
        url: 'https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=' + api_key,
        dataType: 'json',
        data: "school.name=" + school_name + "&fields=id,school.name,location",
        success: function(data) {

            for (var i = 0; i < data.results.length; i++) {
                const location_coordinates = { lat: data.results[i]['location.lat'], lng: data.results[i]['location.lon'] };
                const school_id = 'map-' + data.results[i]['id']
                console.log(location_coordinates)
                var row = $('<tr><td>' + data.results[i]['id'] + '</td><td>' + data.results[i]['school.name'] + '</td><td class="map" id="' + school_id + '">' + '</td></tr>');
                $('#school-list').append(row);
                loadMap(location_coordinates, school_id);
            }
        },
        error: function(response) {}
    })
}

function loadMap(location_coordinates, school_id) {
    const map = new google.maps.Map(document.getElementById(school_id), {
        zoom: 14,
        center: location_coordinates
    });
    const marker = new google.maps.Marker({
        position: location_coordinates,
        map: map,
    });
}