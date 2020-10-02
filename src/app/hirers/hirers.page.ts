import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { RentsService } from './hirer-detail/rents/rents.service'
import { HirersService } from './hirers.service'

@Component({
  selector: 'app-hirers',
  templateUrl: './hirers.page.html',
  styleUrls: ['./hirers.page.scss'],
})
export class HirersPage implements OnInit {
  title: string = 'Kiracılar'
  constructor(
    private rentsService: RentsService,
    private hirersService: HirersService
  ) {}

  ngOnInit() {}

  onNewRent() {
    this.rentsService.onNewRent.next(true)
  }

  onNewHirer() {
    this.hirersService.onNewHirer.next(true)
  }
}
