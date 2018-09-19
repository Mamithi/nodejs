const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
.then(() => console.log('Connected to mongo db'))
.catch(err => console.error('Failed to connect to mongo db', err));

const courseChema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    price: Number,
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseChema);

async function getCourses() {
    return await Course
    .find({tags: 'backend', isPublished: true})
    .sort({name: 1})
    .select({name: 1, author: 1})

}

async function getAllCourses(){
    return await Course
    .find({isPublished: true, tags: {$in: ['backend', 'frontend']}})
    .sort({price: -1})
    .select({name: 1, author: 1})
}

async function filterCourses(){
    return await Course
    .find({isPublished: true})
    .or([{price: {$gte: 15}}, {name: /.*by.*/i}]);


}

async function run(){
    const courses = await filterCourses()
    console.log(courses);
}

run();


