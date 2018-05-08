import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PersonlistComponent } from '../components/person/personlist.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [SharedModule, FormsModule],
  declarations: [PersonlistComponent],
  exports: [
    PersonlistComponent
  ]
})
export class PersonModule { }
