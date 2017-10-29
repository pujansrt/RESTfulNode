import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {StudentComponent} from './student/student.component';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {StudentService} from './student/student.service';
import {ButtonModule, CalendarModule, CheckboxModule, ConfirmationService, ConfirmDialogModule, DataGridModule, DialogModule, GrowlModule, InputMaskModule, InputTextModule, PanelModule, RadioButtonModule} from 'primeng/primeng';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


const appRoutes: Routes = [
  {path: 'student', component: StudentComponent},
  {path: '**', component: StudentComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true, useHash: true}
    ),
    DataGridModule,
    PanelModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    RadioButtonModule,
    CheckboxModule,
    InputMaskModule,
    ConfirmDialogModule,
    GrowlModule
  ],
  providers: [StudentService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
