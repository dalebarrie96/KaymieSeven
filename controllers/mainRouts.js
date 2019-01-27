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
      mailEngine.sendBookingEmail(req.body);
    }catch(error){
      console.log(error);
      //add error message to view
      //possibly log error to db
    }


    res.render('deposit', {name: 'test'});
  });

  app.get('/Shop.html', function(req, res){

    res.render("shopHome", {warning: "Stop being nosey"});
  });

}
