import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrowlModule } from 'primeng/components/growl/growl';
import { MdButtonModule, MdCardModule, MdInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    GrowlModule,
    MdCardModule,
    MdInputModule,
    MdButtonModule
  ],
  declarations: []
})
export class UiComponentsModule { }
