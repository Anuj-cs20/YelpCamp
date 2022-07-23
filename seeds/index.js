const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "62d15576d2534186500e9cb7", //user id
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. At alias commodi blanditiis, dolore nesciunt ullam quia, explicabo id reiciendis officia nostrum iure natus rem ipsam ex. Suscipit quia blanditiis explicabo! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis eaque ea, voluptate architecto reprehenderit nisi quos, sed modi, obcaecati necessitatibus unde eius eum. Laborum ullam consectetur illo porro beatae distinctio?",
      price: price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dtthzfwlc/image/upload/v1658393540/YelCamp/uwgxu4bjpeuwkuejknwe.jpg",
          filename: "YelCamp/uwgxu4bjpeuwkuejknwe",
        },
        {
          url: "https://res.cloudinary.com/dtthzfwlc/image/upload/v1658393555/YelCamp/zpegglqjwzswj1kw6gnc.jpg",
          filename: "YelCamp/zpegglqjwzswj1kw6gnc",
        },
        {
          url: "https://res.cloudinary.com/dtthzfwlc/image/upload/v1658393560/YelCamp/utldu0m265jhsrgjt8xg.jpg",
          filename: "YelCamp/utldu0m265jhsrgjt8xg",
        },
        {
          url: "https://res.cloudinary.com/dtthzfwlc/image/upload/v1658393630/YelCamp/gps7zwt3jeqdqf6pudv0.jpg",
          filename: "YelCamp/gps7zwt3jeqdqf6pudv0",
        },
        {
          url: "https://res.cloudinary.com/dtthzfwlc/image/upload/v1658393637/YelCamp/pr5pkzoe7g7ggg3fg6yb.jpg",
          filename: "YelCamp/pr5pkzoe7g7ggg3fg6yb",
        },
        {
          url: "https://res.cloudinary.com/dtthzfwlc/image/upload/v1658393652/YelCamp/yderszdvlsppivt8nhma.jpg",
          filename: "YelCamp/yderszdvlsppivt8nhma",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  db.close();
});
