import { DatatableSplitbuttonComponent } from './datatable-splitbutton.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SplitButtonModule } from 'primeng';
@NgModule({
  imports: [
    SplitButtonModule
  ],
  declarations: [
    DatatableSplitbuttonComponent
  ],
  providers: [],
  exports: [
    DatatableSplitbuttonComponent,
    SplitButtonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DatatableSplitbuttonModule {
}
