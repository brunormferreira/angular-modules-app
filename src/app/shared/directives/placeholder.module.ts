import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceholderDirective } from './placeholder.directive';

@NgModule({
  declarations: [PlaceholderDirective],
  exports: [PlaceholderDirective],
  imports: [CommonModule],
})
export class PlaceholderModule {}
