import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {StudentService} from './student.service';
import {Student} from './student.model';
import {ConfirmationService, Message} from 'primeng/primeng';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService]
})
export class StudentComponent implements OnInit {
  students: Student[] = null;
  displayDialog: boolean;
  selectedStudent: Student;
  courses: string[] = ['physics', 'chemistry', 'maths', 'political science', 'history', 'english'];
  msgs: Message[] = [];

  constructor(private ref: ChangeDetectorRef, private  studentService: StudentService, private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    const _self = this;
    this.studentService.findAll().subscribe(students => {
      _self.students = students;
      console.log(students);
      _self.ref.detectChanges();
    });
  }

  selectStudent(student: Student) {
    console.log(student);
    this.selectedStudent = student;
    this.ref.detectChanges();
    this.displayDialog = true;
  }

  toggleCourse(course: string) {
    const index = this.selectedStudent.courses.indexOf(course);
    if (index >= 0) {
      this.selectedStudent.courses.splice(index, 1);
    } else {
      this.selectedStudent.courses.push(course);
    }
  }

  onDialogHide() {
    this.selectedStudent = null;
  }

  add() {
    this.selectedStudent = new Student(null, '', '', '', '', '', []);
    this.ref.detectChanges();
  }

  save() {
    const _self = this;
    this.studentService.save(this.selectedStudent).subscribe(res => {
      _self.selectedStudent = null;
      _self.getAll();
      _self.ref.detectChanges();
    });
  }

  search(term: string) {
    console.log(term);
    const _self = this;
    this.studentService.search(term).subscribe(students => {
      _self.students = students;
      _self.ref.detectChanges();
    });
  }

  delete(student: Student) {
    student.id = student['_id'];
    const _self = this;

    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.studentService.delete(student).subscribe(res => {
          _self.getAll();
          _self.ref.detectChanges();
          this.msgs = [{severity: 'info', summary: 'Confirmed', detail: 'You have accepted'}];
        });
      },
      reject: () => {
        this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'You have rejected'}];
      }
    });
  }

}
