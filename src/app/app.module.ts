import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {
  IonicModule,
  IonicRouteStrategy,
} from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VersionService } from './version.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { ModalModule } from './shared/modal/modal.module';
import { ReleaseNotesModule } from './release-notes/release-notes.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    ModalModule,
    ReleaseNotesModule,
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    VersionService,
    AppVersion,
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {
}
