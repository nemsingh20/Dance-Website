const express =require('express');
const path =require('path');
const mongoose =require('mongoose');

const app=express();

mongoose.connect('mongodb://localhost/nem2', {useNewUrlParser: true, useUnifiedTopology: true});

app.use('/static',express.static('static'));
app.use(express.urlencoded());

const contacts = new mongoose.Schema({
    name: String,
    age: String,
    email: String,
    address: String,
    more: String
  });
const contact = mongoose.model('contact', contacts);
//console.log(contact.id);

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res)=>{
    res.render('index.pug');
})
app.get('/home',(req,res)=>{
    res.render('home.pug');

})

app.get('/contact',(req,res)=>{
    res.render('contact.pug');
})
let result;
let temp;

app.post('/contact',(req,res)=>{
    
    const cntct = new contact(req.body);

    contact.find({ email: `${req.body.email}` }, function (err, k) {
        if (err) return console.error(err);
        temp=(k.length); 
        //console.log(temp);
    if(temp==0)
    {
        result={result:"Contact Us success"};
        cntct.save();
        res.render('contact.pug',result);
    }
    else
    { 
    result={result:"Email already exit so contact us again"};
    res.render('contact.pug',result);}
    });
    //console.log(contacts.email);
    
})
/*contact.find({ email: "nemsinghtomar@gamil.com"},function (err, t) {
    if (err) return console.error(err);
    console.log(t.length);
  })*/

app.listen(80,(req,res)=>{
    console.log('server is successfully run o port 80');
})