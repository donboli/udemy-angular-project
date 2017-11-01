import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AppRouting } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from '../recipes/recipe.service';
import { AuthGuard } from '../auth/auth-guard.service';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRouting
  ],
  exports: [
    HomeComponent,
    HeaderComponent,
    AppRouting
  ],
  providers: [
    RecipeService,
    DataStorageService,
    AuthGuard
  ],
})
export class CoreModule { }
