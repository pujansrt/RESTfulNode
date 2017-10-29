import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
import {Student} from './student.model';


@Injectable()
export class StudentService {

  _url: string;

  constructor(private http: Http) {
    this._url = 'http://localhost:7777/'; // config.service.hostname;
  }

  findAll(): Observable<Student[]> {
    return this.http.get(`${this._url}students`).map((res: Response) => {
      return res.json();
    });
  }

  save(student: Student): Observable<Student> {
    const copy = this.convert(student);

    if (student['_id'] == null) {
      return this.http.post(`${this._url}students`, copy).map((res: Response) => {
        return res.json();
      });
    }

    return this.http.put(`${this._url}students`, copy).map((res: Response) => {
      return res.json();
    });
  }

  search(term): Observable<Student[]> {
    return this.http.get(`${this._url}api/students/search?q=${term}`).map((res: Response) => {
      return res.json();
    });
  }

  delete(student: Student): Observable<Student> {
    const headers = new Headers({'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9'});
    const options = new RequestOptions({
      headers: headers,
      body: student
    });

    return this.http.delete(`${this._url}students`, options).map((res: Response) => {
      return res.json();
    });
  }


  private convert(student: Student): Student {
    const copy: Student = Object.assign({}, student);
    return copy;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
