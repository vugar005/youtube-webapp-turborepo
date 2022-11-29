import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyTermsComponent } from './policy-terms.component';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { RouterModule, Routes } from '@angular/router';
import { PolicyTermsDialogComponent } from './policy-terms-dialog/policy-terms-dialog.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

const routes: Routes = [{ path: '', pathMatch: 'full', component: PolicyTermsComponent }];

@NgModule({
  declarations: [PolicyTermsComponent, PolicyTermsDialogComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule, RouterModule.forChild(routes)],
})
export class PolicyTermsModule {}
