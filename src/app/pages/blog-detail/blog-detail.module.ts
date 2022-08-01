import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogDetailComponent } from './blog-detail.component';
import { RouterModule } from '@angular/router';
import { BlocksModule } from 'src/app/blocks/blocks.module';



@NgModule({
  declarations: [BlogDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: BlogDetailComponent,
      },
    ]),
    BlocksModule
  ]
})
export class BlogDetailModule { }
