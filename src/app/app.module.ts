import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms'
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { TodoItemComponent } from './todo-item/todo-item.component'
import { OAuthModule } from 'angular-oauth2-oidc';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    TodoItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    OAuthModule.forRoot({ //Se usa en el módulo principal.
      resourceServer: {
        allowedUrls: [environment.apiUrl],
        sendAccessToken: true
      }
    }) 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
