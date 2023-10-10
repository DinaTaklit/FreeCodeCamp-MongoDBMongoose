const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Person Schema
let personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String],
});

// Person Model
let Person = mongoose.model("Person", personSchema);

// Create and Save a Record of a Model

const createAndSavePerson = (done) => {
  const person = new Person({
    name: "Dina",
    age: 27,
    favoriteFoods: ["Framssa", "Thaknifth", "iflfal"],
  });
  person.save(function (err, data) {
    if (err) {
      return console.error(err);
    }
    done(null, data);
  });
};

// Create Many Records with model.create()

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Use model.find() to Search Your Database
const findPeopleByName = (personName, done) => {
  Person.find(
    {
      name: personName,
    },
    function (err, data) {
      if (err) return console.error(err);
      done(null, data);
    }
  );
};

// Use model.findOne() to Return a Single Matching Document from Your Database

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Use model.findById() to Search Your Database By _id
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

// Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if (err) return console.error(err);
      done(null, updatedPerson);
    });
  });
};

// Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    {
      name: personName, // search query
    },
    {
      age: ageToSet, // update query
    },
    {
      new: true, // return updated doc
    },
    (err, newPerson) => {
      if (err) return console.error(err);
      done(null, newPerson);
    }
  );
};

// Delete One Document Using model.findByIdAndRemove
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
