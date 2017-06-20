import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdChipsModule,
  MdCommonModule,
  MdCoreModule,
  MdDatepickerModule,
  MdDialogModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  MdRippleModule,
  MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdToolbarModule,
  MdTabsModule,
} from '@angular/material';
import { MdTooltipModule } from '@angular/material';
import { MdNativeDateModule } from '@angular/material';
import { StyleModule } from '@angular/material';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MomentModule } from 'angular2-moment';
import { MultiSelectModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MdCommonModule,
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdDatepickerModule,
    MdDialogModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdCoreModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSlideToggleModule,
    MdSliderModule,
    MdSnackBarModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
    MdNativeDateModule,
    StyleModule,
    AngularFontAwesomeModule,
    DataTableModule,
    FlexLayoutModule,
    MomentModule,
    MultiSelectModule
  ],
  declarations: []
})
export class UiComponentsModule {
}
