module.exports = function(app,urlencodedParser,jsonParser){

  app.get('/test', (req, res) => res.send('Hello World!'));

  app.get('/', function(req, res){

    res.render("index");
  });

  app.get('/BookingForm.html', function(req, res){

    res.render("bookingForm");
  });

  app.post('/BookingForm.html', urlencodedParser, function(req, res){

    var mailEngine = require('./managers/mailEngine');

    try{

      if (Object.keys(req.files).length == 0) {
        console.log('No files were uploaded.');
      }else{
        // console.log(req.files.refPhoto.name);
        // console.log(req.files.refPhoto.path);
      }

      var url = mailEngine.sendBookingEmail(req);

      url.then(function(url){
        console.log(url);
        res.render('deposit', {url: url});
      });
    }catch(error){
      console.log(error);
      //add error message to view
      res.render('bookingForm', {error: error});
      //possibly log error to db
    }
  });

  app.get('/Shop.html', function(req, res){

    res.render("shopHome", {warning: "Stop being nosey"});
  });

}
