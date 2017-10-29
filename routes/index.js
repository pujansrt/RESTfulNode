const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const {catchErrors} = require('../handlers/errorHandlers');

/**
 * All route definitions are defined here.
 *
 * @author Pujan Srivastava
 */


router.get('/', catchErrors(studentController.getStudents));

router.get('/students', catchErrors(studentController.getStudents));
router.get('/students/:id', catchErrors(studentController.getStudent));
router.post('/students', catchErrors(studentController.createStudent));
router.put('/students', catchErrors(studentController.updateStudent));
router.delete('/students', catchErrors(studentController.deleteStudent));

router.get('/api/students/search', catchErrors(studentController.searchStudent));

module.exports = router;
