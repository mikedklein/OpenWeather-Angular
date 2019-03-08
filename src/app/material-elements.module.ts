import { NgModule } from '@angular/core';

// NG Material
import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatToolbarModule],
  exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule]
})
export class MaterialElementsModule {}
