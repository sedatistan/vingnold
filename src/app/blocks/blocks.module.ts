import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TopMenuComponent
  ],
  exports: [
    TopMenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class BlocksModule { }
