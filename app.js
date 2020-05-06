const express = require('express');
const mongoose = require('mongoose')
const app = express();

const shortUrl = require('./models/shorturl')

/* mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true
}, () => {
    console.log("db connection established");
    app.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`);
    });
}); */

mongoose.connect('mongodb://localhost/urlShortener',{
    
    useNewUrlParser: true, useUnifiedTopology: true

})
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))

app.get('/', async(req, res)=>{

    

    
   // const shortUrls = await shortUrl.find() // new chnages
    //res.render('index', {shortUrls: shortUrls})
    res.render('index');
});

app.post('/shortUrl', async (req,res)=>{
    await shortUrl.create({ full:req.body.URL})

   // res.redirect('/') b// new chagew
   res.redirect('/res')
    
})

app.get('/res', async(req,res)=>{ //new changes

    const shortUrls = await shortUrl.find({'full': req.body.URL})
    res.render('res', {shortUrls: shortUrls});
})

app.get('/:ShortUrl', async (req, res)=>{

  const ShortUrl = await shortUrl.findOne({short: req.params.ShortUrl}) 
  if (ShortUrl== null){
      return res.sendStatus(404)
  }

  res.redirect(ShortUrl.full)
})
app.listen(process.env.PORT || 3000);


