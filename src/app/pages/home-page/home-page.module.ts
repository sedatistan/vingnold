import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlocksModule } from 'src/app/blocks/blocks.module';
import { HomePageComponent } from './home-page.component';



@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    BlocksModule,
  ]
})
export class HomePageModule { }
