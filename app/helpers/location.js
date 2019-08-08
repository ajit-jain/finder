
const fs = require('fs'),
path = require('path'),
xmlReader = require('read-xml');

const point_in_polygon = require('point-in-polygon');
const xml_js_converter = require('xml-js');
module.exports = {
    get_location_name
}


/* 
Parses the kml file and returns placemarks 
*/
function get_locations(){
    return new Promise((resolve,reject)=>{
        const location_kml = path.join(__dirname, './../assets/locations.kml');
        xmlReader.readXML(fs.readFileSync(location_kml), function(err, data) {
            if (err) {
               reject(err); return;
            }
            let xml = data.content;
            let json = JSON.parse(xml_js_converter.xml2json(xml, {compact: true, spaces: 4}));
            let place_marks = [];
            if(json && json['kml'] && json['kml']['Document'] && json['kml']['Document']['Placemark']){
                place_marks = json['kml']['Document']['Placemark'].map(function(place_mark){
                    let name = place_mark['name']['_text'];
                    let coordinates = [];
                    let type='';
                    if(place_mark.hasOwnProperty('Point') && (type ='Point')){
                        coordinates = get_coordinates_from_text(place_mark['Point']['coordinates']['_text']);
                    }
                    if(place_mark.hasOwnProperty('Polygon') && (type = 'Polygon')){
                        coordinates = get_coordinates_from_text(place_mark['Polygon']['outerBoundaryIs']['LinearRing']['coordinates']['_text']);
                    }
                    return {name,coordinates,type}
                })
            }
            resolve(place_marks);
        });
    })
}

/* 
convert string coordinates into Array<Array>
*/
function get_coordinates_from_text(text){
    return text.split('\n')
        .filter(c=>c.trim())
        .map(c=>{
            let [lon,lat] = c.split(',').slice(0,2).map(o=>Number(o.trim()));
            return [lat,lon];
        })
                   
}


/*
    get name of the nearest outlet with lat and lon
*/
async function get_location_name(lon,lat){
    try{
        let locations = await get_locations();
        let name = '';
        for(let num in locations){
            let place = locations[num];
            if (point_in_polygon([lat, lon],place['coordinates'])){
                name = place['name'];
                break;
            }
        }
        return (name || 'not found');
    }catch(e){
        throw new Error(e);
    }
    
}
