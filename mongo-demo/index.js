const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255,
        // match: /patter/
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        uppercase: true,
        trim: true
    },
    author: String,
    tags:{
        type: Array,
        validate: {
            isAsync: true,
            validator: function(v, callback) {
                setTimeout(() => {
                    const result = v && v.length > 0;
                    callback(result);
                }, 10); 
            },
            message: 'A course should have atleast one tag'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        min: 10,
        max: 200,
        required: function() { return this.isPublished; },
        get: v => Math.round(v),
        set: v => Math.round(v),
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        category: 'web',
        author: 'Lawrence Mamithi',
        tags: ['frontend'],
        isPublished: true,
        price: 15.89
    });
    
    try{
        const result = await course.save();
        console.log(result); 
    } catch(ex){
        for(field in ex.errors){
            console.log(ex.errors[field].message);
        }
    }
    
}

async function getCourses(){
    const pageNumber = 2;
    const pageSize = 10;


    const courses = await Course
    .find({_id: "5ba16ab588482069f54aa11b"})
    // .find({price: {$gte: 10, $lte: 20}})
    // .find({price: {$in: [10, 15, 20]}})
    // .find()
    // .or([{author: 'Lawrence Mamithi'}, {isPublished: true}])
    // .and([{author: 'Lawrence Mamithi'}, {isPublished: true}])
    // .find({author: /^Law/})
    // .find({author: /Mamithi$/i})
    // .find({ author: /.*Lawrence.*/i })
    // .skip((pageNumber -1) * pageSize)
    // .limit(pageSize)
    .sort({name: 1})
    .select({name: 1, tags: 1, price: 1});
    // .count();

    console.log(courses[0].price);
}

async function updateCourse(id){
    const course = await Course.findByIdAndUpdate(id , {
      $set: {
          author: 'Jason',
          isPublished: false
      }  
    }, {new: true});
    console.log(course);
}

async function removeCourse(id){
    const result = await Course.deleteOne({_id: id});
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
}

// createCourse();
getCourses();
