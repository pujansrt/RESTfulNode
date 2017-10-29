const mongoose = require('mongoose');
const Student = mongoose.model('Student');

/**
 * Student Controller
 *
 * @author Pujan Srivastava
 */


/**
 * Create New Sutdent
 *
 * @param req
 * @param res
 * @returns {Promise.<void>}
 */
exports.createStudent = async (req, res) => {
  const student = await (new Student(req.body)).save();
  //console.log('student=>>', student);
  res.json(student);
}


/**
 * Update existing student
 *
 * @param req
 * @param res
 * @returns {Promise.<void>}
 */
exports.updateStudent = async (req, res) => {
  const student = await Student.findOneAndUpdate({_id: req.body._id}, req.body, {
    new: true,
    runValidators: true
  }).exec();
  //console.log('student=>>',student);
  res.json(student);
}

/**
 * Delete student by given id
 *
 * @param req
 * @param res
 * @returns {Promise.<void>}
 */
exports.deleteStudent = async (req, res) => {
  const student = await Student.findOneAndRemove({_id: req.body.id}).exec();
  res.json(student);
}

/**
 * Get List of students
 *
 * @param req
 * @param res
 * @returns {Promise.<void>}
 */
exports.getStudents = async (req, res) => {
  let students = await Student.find();

  students = students.map((student ,i ) => {
    var _student = student.toObject();//mongoose document to json
    _student['dob'] = formatDate(_student['dob']);
    return _student;
  });
  res.json(students);
}

/**
 * Get student details by id
 *
 * @param req
 * @param res
 * @returns {Promise.<void>}
 */
exports.getStudent = async (req, res) => {
  const student = await Student.findOne({_id: req.params.id});
  res.json(student);
}

/**
 * Search Student by name
 *
 * @param req
 * @param res
 * @returns {Promise.<void>}
 */
exports.searchStudent = async (req, res) => {
  const regex = new RegExp(`.*${req.query.q}.*`, "i");
  const students = await Student.find({"name": {$regex: regex}})
    .sort({name: -1})
  ;
  //.limit(5)
  res.json(students)
}

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}
