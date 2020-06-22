import { Component, OnDestroy, OnInit } from '@angular/core';

import { BlockUiService } from '../../base/block-ui/block-ui.service';
import { BlockUiStatus } from '../../base/block-ui/block-ui.status';
import { Subscription } from 'rxjs';

@Component({
  selector: 'safi-block-ui',
  templateUrl: './block-ui.component.html',
  styleUrls: ['./block-ui.component.css']
})
export class BlockUiComponent implements OnInit, OnDestroy {
  status = false;

  private subscription: Subscription;

  constructor(private service: BlockUiService) {}

  ngOnInit() {
    this.subscription = this.service.loaderStatus.subscribe(
      (blockui: BlockUiStatus) => {
        this.status = blockui.status;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  isBlocked() {
    return this.status;
  }

  show() {
    this.status = true;
  }

  hide() {
    this.status = false;
  }
}
