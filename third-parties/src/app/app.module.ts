import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxGraphModule } from '@swimlane/ngx-graph';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DiagramComponent } from './components/diagram/diagram.component';
import { CardNodeComponent } from './components/card-node/card-node.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CardNodeComponent,
    DiagramComponent
  ],
  imports: [
    BrowserModule,
    NgxGraphModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }