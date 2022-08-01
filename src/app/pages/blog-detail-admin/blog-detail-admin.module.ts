import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlocksModule } from 'src/app/blocks/blocks.module';
import { BlogDetailAdminComponent } from './blog-detail-admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';

@NgModule({
  declarations: [BlogDetailAdminComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: BlogDetailAdminComponent,
      },
    ]),
    BlocksModule,
    CalendarModule
  ]
})
export class BlogDetailAdminModule { }
