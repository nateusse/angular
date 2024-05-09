import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore , getFirestore} from '@angular/fire/firestore';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';


const firebaseConfig = {


};

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),
  importProvidersFrom([
    provideFirebaseApp(()=>initializeApp(firebaseConfig)),
    provideFirestore(()=> getFirestore())

  ])
  ]
};
