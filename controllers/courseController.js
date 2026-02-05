
const Course =require('../models/Course')

exports.getCourse =async(req, res)=>{
    try{
        const course =await Course.findById(id)
        if(!course){
            return res.status(404).json({message:'course not found'});

    }
}

 catch(err){
    res.status(500).json ({message:'failed to load course'})


    }
};
// getting all courses
exports.getCourses =async(req,res)=>{
    try{
    const courses =await Course.find()
    res.json(courses);
    }
    catch(err){
        res.status(500).json ({message:'course not found'})
    }

    
}
exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.json(course);
  } catch {
    res.status(500).json({ message: "Failed to save course" });
  }
};
//udpate course details
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(course);
  } catch {
    res.status(500).json({ message: "Failed to update course" });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted" });
  } catch {
    res.status(500).json({ message: "Failed to delete course" });
  }
};

    