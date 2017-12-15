var mongo = require('mongodb'); // Mongodb modülü eklenir.
var MongoClient = require('mongodb').MongoClient; 
var url = "mongodb://localhost:27017/test";
var DB = null;
function db_baglan() { // Veritabanı bağlantısı gerçekleştirilir.
	MongoClient.connect(url,function(err,db) {
		if (err) throw err;
		console.log("Database created!");
		DB = db;
  });
}
db_baglan();


function koleksiyon_ekle(){
	if(DB) {
		DB.createCollection("kullanicilar", function(err, res) {
			if (err) throw err;
			console.log("Collection created!");
		});
	}
}

function kisi_ekle(){
	//var kisi = {isim:"Özgür",Soyadı:"YILDIZ",mail:"ozguryildiz.ada@gmail.com"};
	var myobj = [
    { name: 'John', address: 'Highway 71'},
    { name: 'Peter', address: 'Lowstreet 4'},
    { name: 'Amy', address: 'Apple st 652'},
    { name: 'Hannah', address: 'Mountain 21'},
    { name: 'Michael', address: 'Valley 345'},
    { name: 'Sandy', address: 'Ocean blvd 2'},
    { name: 'Betty', address: 'Green Grass 1'},
    { name: 'Richard', address: 'Sky st 331'},
    { name: 'Susan', address: 'One way 98'},
    { name: 'Vicky', address: 'Yellow Garden 2'},
    { name: 'Ben', address: 'Park Lane 38'},
    { name: 'William', address: 'Central st 954'},
    { name: 'Chuck', address: 'Main Road 989'},
    { name: 'Viola', address: 'Sideway 1633'}
  ];
	/*DB.collection("kullanicilar").insertOne(kisi,function(err,res){
		if(err) throw err;
		console.log("Kişi eklendi.");
	});*/
	
	DB.collection("kullanicilar").insertMany(myobj,function(err,res){
		if(err) throw err;
		console.log(res.insertedCount+" kişi eklendi.");
	});
}

function kisileri_getir(){
	/*DB.collection("kullanicilar").findOne({},function(err,res){
		if(err) throw err;
		console.log(res.name);
	});
	
	DB.collection("kullanicilar").find({}).toArray(function(err,res){
		if(err) throw err;
		console.log(res)
	});*/
	
	/*DB.collection("kullanicilar").find({},{_id:false,name:true}).toArray(function(err,res){
		if(err) throw err;
		console.log(res)
		console.log(res[5].name);
	});*/
	//var sorgu = {address: "Park Lane 38"};
	var sorgu = {address:/^S/};
	
	/*DB.collection("kullanicilar").find(sorgu).toArray(function(err,res){
		if(err) throw err;
		console.log(res);
	});*/
	var sirala = {name :1};
	DB.collection("kullanicilar").find().sort(sirala).limit(14).toArray(function(err,res){
		if(err) throw err;
		console.log(res);
	});
}

function kisi_sil(){
	//var query  = {address : 'Mountain 21'};
	/*DB.collection("kullanicilar").deleteOne(query,function(err,ress){
		if(err) throw err;
		console.log("Silme işlemi başarılı.");
	});*/
	/*var query = {address:/^O/};
	DB.collection("kullanicilar").deleteMany(query,function(err,res){
		if(err) throw err;
		console.log("Silme işlemi başarılı."+res.deletedCount+" "+res.result.n);
	});*/
	DB.collection("kullanicilar").deleteMany(function(err,res){
		if(err) throw err;
		console.log("Silme işlemi başarılı."+res.deletedCount+" "+res.result.n);
	});
}

function koleksiyon_sil(){
	DB.collection("kullanicilar").drop(function(err,delOK){
		if(err) throw err;
		if(delOK) console.log(delOK);
	});
	
	/*DB.collection("kullanicilar",function(err,delOK){
		if(err) throw err;
		if(delOK) console.log(delOK);
	});*/
}

function update(){
	//var guncelle = {address:"Sakarya"};
	//var yukle = {name:"Ozgur",address:"Sakarya"};
	/*var yukle = {$set:{name:"Ozgur",address:"Sakarya / Pamukova"}};
	DB.collection("kullanicilar").updateOne(guncelle,yukle,function(err,res){
		if(err) throw err;
		console.log("Guncelleme başarılı");
	});*/
	/*var guncelle = {address:/^Y/};
	var yukle = {$set:{name:"YILDIZ",address:"Sakarya / Pamukova"}};
	DB.collection("kullanicilar").updateOne(guncelle,yukle,function(err,res){
		if(err) throw err;
		console.log("Guncelleme başarılı");
	});*/
	var guncelle = {address:/^P/};
	var yukle = {$set:{name:"YILDIZ",address:"Sakarya / Pamukova"}};
	DB.collection("kullanicilar").updateMany(guncelle,yukle,function(err,res){
		if(err) throw err;
		console.log("Guncelleme başarılı"+res.result.nModified);
	});
}

setTimeout(function() {
	//koleksiyon_ekle();
}, 2000);

setTimeout(function() {
	//kisi_ekle();
	update();
}, 2000);

setTimeout(function() {
	//kisileri_getir();
}, 2000);

setTimeout(function(){
	//kisi_sil();
	//koleksiyon_sil();
}, 2000);