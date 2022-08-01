import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlocksModule } from 'src/app/blocks/blocks.module';
import { HomePageAdminComponent } from './home-page-admin.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [HomePageAdminComponent],
  imports: [
    CommonModule,
    BlocksModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePageAdminComponent,
      },
    ]),
  ]
})
export class HomePageAdminModule { }
