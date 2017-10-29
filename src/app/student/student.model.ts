export class Student {
  constructor(public id?: number,
              public name?: string,
              public email?: string,
              public phone?: string,
              public address?: string,
              public gender?: string,
              public courses?: string[],
              public dob?: string
              ) {
  }
}
