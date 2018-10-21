import { NgModule, ModuleWithProviders } from '@angular/core';
import { VideoComponent } from './video/video';
import { BrowserModule } from '@angular/platform-browser';
import { ComicComponent } from './comic/comic';
import { NovelComponent } from './novel/novel';
import { CommentComponent } from './comment/comment';
import { PlayerComponent } from './player/player';
import { IonicModule } from 'ionic-angular';
import { MyApp } from '../app/app.component';

@NgModule({
  declarations: [
    VideoComponent,
    ComicComponent,
    NovelComponent,
    CommentComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  exports: [
    VideoComponent,
    ComicComponent,
    NovelComponent,
    CommentComponent,
    PlayerComponent
  ],
  entryComponents: [
    PlayerComponent
  ]
})
export class ComponentsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ComponentsModule
    };
  }
}
