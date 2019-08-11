var autocomplete;
var outlet_name  = '';
var server_base_url = 'http://localhost:3000';
function init() {
    let  inputTextField= document.getElementById('locationTextField');
    autocomplete = new google.maps.places.Autocomplete(inputTextField);
    autocomplete.addListener('place_changed', get_outlet);
}
function get_outlet(e){
    let selectedPlace = autocomplete.getPlace();
    let lat = selectedPlace.geometry.location.lat();
    let lng = selectedPlace.geometry.location.lng();
    get_outlet_api_call(lat,lng)
    .then(result => {
        if(result && result.outlet && result.outlet.name){
            set_outlet_name(result.outlet.name);
        }
    }).catch(e => {
        console.log(e);
    });

}
function set_outlet_name(name){
    let outletTag = document.getElementById('outlet');
    if(outletTag){
        outletTag.innerHTML = `Outlet: ${name}`;
    }
}
function get_outlet_api_call(lat,lng){
    return fetch(`${server_base_url}/api/get_nearest_outlet?long=${lng}&lat=${lat}`)
        .then((response)=>{
            return response.json();
        })
}


google.maps.event.addDomListener(window, 'load', init);