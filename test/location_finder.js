const supertest = require('supertest');
const server = supertest.agent("http://localhost:3000");



/* 
All values of lat and long came from https://www.latlong.net/
*/

describe('Testing location finder',function(){
    before(function(done){
        done();
    })

    it('ping the server',function(done){
        server.get('/api/ping')
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          done();
        });

    })

    it('get location when (Maurer Hauptplatz 7, 1230 Wien, Austria) entered',function(done){
        server.get('/api/get_nearest_outlet?long=16.267509&lat=48.150631')
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          if(res.body && res.body.outlet.name === 'au_vienna_maurerhauptplatz')
            done();
          else
            throw new Error('location should be au_vienna_maurerhauptplatz') ;
        });
    })

    it('get location when (Stumpergasse 51, 1060 Vienna) entered',function(done){
        server.get('/api/get_nearest_outlet?long=16.343130&lat=48.194908')
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          if(res.body && res.body.outlet.name === 'au_vienna_schoenbrunnerstr')
            done();
          else
            throw new Error('location should be au_vienna_schoenbrunnerstr') ;
        });
    })
    
    it('get location when (Ungargasse 17, Vienna, Austria) entered',function(done){
        server.get('/api/get_nearest_outlet?long=16.387430&lat=48.202789')
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          if(res.body && res.body.outlet.name === 'au_vienna_landstrasserhauptstr')
            done();
          else
            throw new Error('location should be au_vienna_landstrasserhauptstr') ;
        });
    })

    it('get location when (Linzer Straße 7, Vienna, Austria) entered',function(done){
        server.get('/api/get_nearest_outlet?long=16.295191&lat=48.195019')
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          if(res.body && res.body.outlet.name === 'au_vienna_dreyhausenstr')
            done();
          else
            throw new Error('location should be  au_vienna_dreyhausenstr') ;
        });
    })

    it('get location when (Bahnhofplatz 1, Linz, Austria) entered',function(done){
        server.get('/api/get_nearest_outlet?long=14.291330&lat=48.291901')
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          if(res.body && res.body.outlet.name === 'not found')
            done();
          else
            throw new Error('location should not be found') ;
        });
    })

    it('get location when (Quadenstraße 5, 1200 Vienna) entered',function(done){
        server.get('/api/get_nearest_outlet?long=16.487350&lat=48.239262')
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          if(res.body && res.body.outlet.name === 'not found')
            done();
          else
            throw new Error('location should not be found') ;
        });
    })
})