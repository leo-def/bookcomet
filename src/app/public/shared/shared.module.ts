import { NgModule } from '@angular/core';
import { SharedModule as AppSharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [ AppSharedModule ],
  exports: [ AppSharedModule ]
})
export class SharedModule { }
