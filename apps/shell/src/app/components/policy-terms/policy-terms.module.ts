import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyTermsComponent } from './policy-terms.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { PolicyTermsDialogComponent } from './policy-terms-dialog/policy-terms-dialog.component';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [{ path: '', pathMatch: 'full', component: PolicyTermsComponent }];

@NgModule({
  declarations: [PolicyTermsComponent, PolicyTermsDialogComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule, RouterModule.forChild(routes)],
})
export class PolicyTermsModule {}
