import { Component, OnInit } from '@angular/core';
import { PopoverDirective } from 'ngx-bootstrap/popover';
// import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  constructor(private pop: PopoverDirective) {
    
  }

  ngOnInit(): void {
    this.pop.show();
  }
  bell(){ }
}
