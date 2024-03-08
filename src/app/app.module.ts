import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { AuthenticateModule } from './authenticate/authenticate.module';
import { ComponentModule } from './component/component.module';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    AppRoutingModule,
    BrowserAnimationsModule,
    SidebarModule,
    ButtonModule,
    AvatarModule,
    AvatarGroupModule,
    SharedModule,
    CommonModule,
    AuthenticateModule,
    ComponentModule,
    provideFirebaseApp(() => initializeApp({"projectId":"kwaiisoft","appId":"1:140244723331:web:6a96fe35256f6cfbbc5db6","storageBucket":"kwaiisoft.appspot.com","apiKey":"AIzaSyC0M_lO4b01n4ynNaRyHE1nXEnzs9BcG68","authDomain":"kwaiisoft.firebaseapp.com","messagingSenderId":"140244723331"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage())

  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: { "projectId": "kwaiisoft", "appId": "1:140244723331:web:6a96fe35256f6cfbbc5db6", "storageBucket": "kwaiisoft.appspot.com", "apiKey": "AIzaSyC0M_lO4b01n4ynNaRyHE1nXEnzs9BcG68", "authDomain": "kwaiisoft.firebaseapp.com", "messagingSenderId": "140244723331" } },

    provideClientHydration(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
