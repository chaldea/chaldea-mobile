import { NgModule, ModuleWithProviders } from '@angular/core';
import { AnimeComponent } from './anime/anime';
import { BrowserModule } from '@angular/platform-browser';
import { ComicComponent } from './comic/comic';
import { NovelComponent } from './novel/novel';
import { CommentComponent } from './comment/comment';

@NgModule({
  declarations: [
    AnimeComponent,
    ComicComponent,
    NovelComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    AnimeComponent,
    ComicComponent,
    NovelComponent,
    CommentComponent
  ]
})
export class ComponentsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ComponentsModule
    };
  }
}
