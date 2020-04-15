import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayersModule } from './layers/layers.module';
import { SidebarService } from './services/sidebar.service';
import { LanguageService } from './services/language.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    BrowserAnimationsModule,
    LayersModule
  ],
  providers: [
    SidebarService,
    LanguageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
