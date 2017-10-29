process.env.NODE_ENV = 'test';
const mongoose = require("mongoose");
const Student = require('../models/Student');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../start');
let should = chai.should();

chai.use(chaiHttp);


describe('App', function () {

    // beforeEach((done) => { //Before each test we empty the database
    //     Student.remove({}, (err) => {
    //         done();
    //     });
    // });


    describe('/GET student', () => {
        it('it should GET all the students', (done) => {
            chai.request(server)
                .get('/students')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/GET/:id student', () => {
        it('it should GET a student by the given id', (done) => {
            let student = new Student({
                "name": "Shawn Murray",
                "gender": "female",
                "email": "shawnmurray@insource.com",
                "phone": "+1 (859) 405-3275",
                "dob": "1964-02-29",
                "address": "197 Glendale Court, Alamo, North Dakota, 3614",
                "courses": [
                    "commodo"
                ]
            });
            student.save((err, student) => {
                chai.request(server)
                    .get('/students/' + student._id)
                    .send(student)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('name');
                        res.body.should.have.property('email');
                        done();
                    });
            });

        });
    });


    describe('/PUT/:id student', () => {
        it('it should UPDATE a student given the id', (done) => {
            let student = new Student({name: "Chronicles", id:"59f1bdb91e41c079adb85722"})
            student.save((err, student) => {
                chai.request(server)
                    .put('/students')
                    .send({email: "sss@dd.com"})
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
            });
        });
    });
});