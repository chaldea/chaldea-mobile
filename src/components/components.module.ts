import { NgModule, ModuleWithProviders } from '@angular/core';
import { AnimeComponent } from './anime/anime';
import { BrowserModule } from '@angular/platform-browser';
import { ComicComponent } from './comic/comic';
import { NovelComponent } from './novel/novel';
import { CommentComponent } from './comment/comment';
import { PlayerComponent } from './player/player';

@NgModule({
  declarations: [
    AnimeComponent,
    ComicComponent,
    NovelComponent,
    CommentComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    AnimeComponent,
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
