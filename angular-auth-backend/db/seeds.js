const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const Bird = require('../models/bird');

mongoose.connect(dbURI);

Bird.collection.drop();

const birdData = [{
  name: 'Barn Owl',
  latinName: 'Tyto alba',
  family: 'Tytonidae',
  image: 'https://www.rspb.org.uk/Images/barnowl_tcm9-18232.jpg?width=530&crop=(34,244,962,766)'
},{
  name: 'Blue Tit',
  latinName: 'Cyanistes caeruleus',
  family: 'Paridae',
  image: 'https://www.rspb.org.uk/Images/blue_tit_master_tcm9-17216.jpg?width=530&crop=(0,162,800,612)'
},{
  name: 'Chaffinch',
  latinName: 'Fringilla coelebs',
  family: 'Fringillidae',
  image: 'https://www.rspb.org.uk/Images/chaff_tcm9-17518.jpg?width=530&crop=(176,374,1128,910)'
},{
  name: 'Robin',
  latinName: 'Erithacus rubecula',
  family: 'Turdidae',
  image: 'https://www.rspb.org.uk/Images/robin_master_tcm9-17658.jpg?width=530&crop=(444,478,1248,930)'
},{
  name: 'Hen Harrier',
  latinName: 'Circus cyaneus',
  family: 'Accipitridae',
  image: 'https://www.rspb.org.uk/Images/henha_tcm9-17738.jpg?width=530&crop=(188,512,1900,1476)'
},{
  name: 'Swallow',
  latinName: 'Hirundo rustica',
  family: 'Hirundinidae',
  image: 'https://www.rspb.org.uk/Images/swallow_tcm9-18469.jpg?width=530&crop=(44,262,948,770)'
},{
  name: 'Swift',
  latinName: 'Apus apus',
  family: 'Apodidae',
  image: 'https://www.rspb.org.uk/Images/swift_tcm9-16743.jpg?width=530&crop=(76,312,1092,884)'
},{
  name: 'House Martin',
  latinName: 'Delichon urbica',
  family: 'Hirundinidae',
  image: 'https://www.rspb.org.uk/Images/houma_tcm9-16747.jpg?width=530&crop=(52,492,1892,1528)'
},{
  name: 'Jackdaw',
  latinName: 'Corvus monedula',
  family: 'Corvidae',
  image: 'https://www.rspb.org.uk/Images/jackdaw_tcm9-18298.jpg?width=530&crop=(78,240,982,748)'
},{
  name: 'Wood Warbler',
  latinName: 'Phylloscopus sibilatrix',
  family: 'Sylviidae',
  image: 'https://www.rspb.org.uk/Images/woodwarbler_tcm9-17218.jpg?width=530&crop=(424,602,1206,1042)'
},{
  name: 'Chiffchaff',
  latinName: 'Phylloscopus collybita',
  family: 'Sylviidae',
  image: 'https://www.rspb.org.uk/Images/chiffchaff_master_tcm9-16749.jpg?width=530&crop=(226,354,1060,824)'
},{
  name: 'Pheasant',
  latinName: 'Phasianus colchicus',
  family: 'Phasianidae',
  image: 'https://www.rspb.org.uk/Images/pheas_tcm9-18415.jpg?width=530&crop=(384,576,1578,1248)'
}];

Bird
  .create(birdData)
  .then(birds => console.log(`${birds.length} birds created!`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());