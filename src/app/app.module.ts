import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA   } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BottomBarComponent } from './components/boottom-meu/boottom-meu.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './features/auth/interceptors/auth.interceptor';

@NgModule({
  declarations: [AppComponent, SidebarComponent, BottomBarComponent, ],
  imports: [BrowserModule, FormsModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, BrowserAnimationsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy, },
               {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
             ],
  bootstrap: [AppComponent],
})
export class AppModule {}
