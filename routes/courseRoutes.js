
// routes/courseRoutes.js
const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
// const {
//     getCourse,
//   getCourses,
//   createCourse,
//   updateCourse,
//   deleteCourse
// }


router.get("/:id",courseController.getCourse);
router.get("/", courseController.getCourses);
router.post("/", courseController.createCourse);
router.put("/:id", courseController.updateCourse);
router.delete("/:id", courseController.deleteCourse);

module.exports = router;
