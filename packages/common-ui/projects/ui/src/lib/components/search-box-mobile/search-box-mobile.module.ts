import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxMobileComponent } from './search-box-mobile.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [SearchBoxMobileComponent],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  exports: [SearchBoxMobileComponent],
})
export class SearchBoxMobileModule {}
