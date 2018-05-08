import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { clickOutsideDirective } from '../directives/person.directive';


@NgModule({
    declarations: [
        clickOutsideDirective,
    ],
    exports: [
        CommonModule,
        clickOutsideDirective,
    ]
})
export class SharedModule { }