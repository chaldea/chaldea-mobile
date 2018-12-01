import { Component, Input } from '@angular/core';
import { CommentDto } from '../../shared/service-proxies/service-proxies';
import { AppConsts } from '../../shared/services/settings.service';

@Component({
  selector: 'app-comment',
  templateUrl: 'comment.html'
})
export class CommentComponent {
  @Input() items: CommentDto[];
  appConsts = AppConsts;

  constructor() {
  }
}
