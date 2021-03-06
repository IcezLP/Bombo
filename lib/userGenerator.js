const usernameList = require("../json/random/usernameList.json");
const firstNameList = require("../json/random/firstNameList.json");
const middleNameList = require("../json/random/middleNameList.json");
const lastNameList = require("../json/random/lastNameList.json");
const disposableEmailList = require("../json/random/disposableEmailList.json");
const nationalities = require("../json/random/nationalities.json");
const jobs = require('../json/random/jobs.json');
const companies = require('../json/random/companies.json');
const cities = require('../json/random/cities.json');
const streets = require('../json/random/streets.json');
const hobbies = require('../json/random/hobbies.json');
const { kebabCase, startCase } = require("lodash");

module.exports = function userGenerator() {
  const genders = ['male', 'female']

  const randomString = () => {
    return (
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15)
    );
  };

  const place = () => {
    const keys = Object.keys(cities);
    const random = Math.floor(Math.random() * keys.length)
    const country = keys[random]
    const city = cities[country][Math.floor(Math.random() * cities[country].length)]
    return { country, city }
  }

  const { country, city } = place()

  // User object
  const user = {
    id: randomString(), // Generate a random string
    username: "",
    slug: "",
    avatar: "",
    password: randomString(), // Generate a random string
    first_name: startCase(firstNameList[Math.floor(Math.random() * firstNameList.length)]), // Get a random first name
    middle_name: startCase(middleNameList[Math.floor(Math.random() * middleNameList.length)]), // Get a random middle name
    last_name: startCase(lastNameList[Math.floor(Math.random() * lastNameList.length)]), // Get a random last name
    full_name: "",
    birth_date: "",
    gender: startCase(genders[Math.floor(Math.random() * genders.length)]),
    nationality: startCase(nationalities[Math.floor(Math.random() * nationalities.length)]), // Get a random nationality
    job: startCase(jobs[Math.floor(Math.random() * jobs.length)]), // Get a random job
    company: startCase(companies[Math.floor(Math.random() * companies.length)]), // Get a random company
    drive_license: Math.random() >= 0.5, // 50/50 true/false
    contact: {
      phone: Math.floor(100000000 + Math.random() * 900000000), // Generate a 9 digit phone number
      email: ""
    },
    adress: {
      country: startCase(country),
      city: startCase(city),
      zip_code: Math.floor(10000 + Math.random() * 90000), // Generate a 9 digit zip code
      street: startCase(streets[Math.floor(Math.random() * streets.length)]),
      street_number: Math.floor(1 + Math.random() * 500) // Generate a number between 1 and 500
    },
    hobbies: []
  };

  // Generate a random username
  user.username = usernameList[Math.floor(Math.random() * usernameList.length)];
  user.username += usernameList[Math.floor(Math.random() * usernameList.length)];
  if (Math.random() > 0.5) {
    user.username += usernameList[Math.floor(Math.random() * usernameList.length)];
  }

  // Generate a slug based on the previously generated username
  user.slug = kebabCase(user.username);

  // Get a random avatar generated by http://avatars.adorable.io/
  user.avatar = `https://api.adorable.io/avatars/200/${user.slug}.png`;

  // Build the full name
  user.full_name = startCase(`${user.first_name} ${user.middle_name} ${user.last_name}`);

  // Generate a date between 1960-01-01 and 2001-01-01
  const start_date = new Date(1970, 1, 1);
  const end_date = new Date(2000, 1, 1);
  user.birth_date = new Date(start_date.getTime() + Math.random() * (end_date.getTime() - start_date.getTime()));

  // Generate an email
  user.contact.email = `${kebabCase(user.full_name)}@${disposableEmailList[Math.floor(Math.random() * disposableEmailList.length)]}`;

  // Get a value between 1 and 5
  const hobbiesToGet = Math.floor(1 + Math.random() * 5)

  // Get number of hobbies that match the previous value
  for (j = 0; j < hobbiesToGet; j++){
    user.hobbies.push(startCase(hobbies[Math.floor(Math.random() * hobbies.length)]))
  }

  return user;
};
