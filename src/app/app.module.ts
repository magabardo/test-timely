import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatTooltipModule } from '@angular/material/tooltip';
import { FiltersComponent } from './filters/filters.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FilterOptionComponent } from './filter-option/filter-option.component';
import { MatChipsModule } from '@angular/material/chips';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    ToolbarComponent,
    FiltersComponent,
    FilterOptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatDividerModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatMomentDateModule,
    MatTooltipModule,
    MatSelectModule,
    MatInputModule,
    MatChipsModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
