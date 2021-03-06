const mongoose = require('mongoose');
const vacation = require('./vacation');
// const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
// 'mongodb://localhost:27017/yelp-camp'
mongoose.connect('', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 5; i++) {
    const price = Math.floor(Math.random() * (100 - 50) + 50) * 1000;
    const camp = new Campground({
      author: '',
      location: `${vacation[i].city}, ${vacation[i].state}`,
      title: `${vacation[i].name}`,
      description: `${vacation[i].desription}`,
      price,
      geometry: {
        type: 'Point',
        coordinates: [vacation[i].longitude, vacation[i].latitude],
      },
      images: vacation[i].images,
    });
    await camp.save();
  }
};

// const seedDB = async () => {
//   await Campground.deleteMany({});
//   for (let i = 0; i < 300; i++) {
//     const random1000 = Math.floor(Math.random() * 1000);
//     const price = Math.floor(Math.random() * 50) + 10;
//     const camp = new Campground({
//       author: '5fb675c5b261341788f2106f',
//       location: `${cities[random1000].city}, ${cities[random1000].state}`,
//       title: `${sample(descriptors)} ${sample(places)}`,
//       description:
//         'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
//       price,
//       geometry: {
//         type: 'Point',
//         coordinates: [
//           cities[random1000].longitude,
//           cities[random1000].latitude,
//         ],
//       },
//       images: [
//         {
//           url:
//             'https://res.cloudinary.com/dwonu6xev/image/upload/v1606310717/campgrounds/sv52y8c4tgssnjustmxn.jpg',
//           filename: 'YelpCamp/sample-campground-1_cq2ltz',
//         },
//         {
//           url:
//             'https://res.cloudinary.com/dwonu6xev/image/upload/v1606318411/campgrounds/ngcb4lfi5imvssplodid.jpg',
//           filename: 'YelpCamp/sample-campground-2_xh7ddm',
//         },
//       ],
//     });
//     await camp.save();
//   }
// };

seedDB().then(() => {
  mongoose.connection.close();
});
