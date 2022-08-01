import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthSigninComponent } from './auth-signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuthSigninComponent,
      },
    ]),

  ],
  declarations: [AuthSigninComponent]
})
export class AuthSigninModule { }
