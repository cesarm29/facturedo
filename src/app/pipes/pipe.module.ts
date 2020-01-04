import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import pipes
import { PriorityPipe } from './priority.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    PriorityPipe
  ],
  declarations: [
    PriorityPipe
  ]
})
export class PipeModule { }