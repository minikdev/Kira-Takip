import { Component, OnInit } from '@angular/core'
import { RentsService } from './hirer-detail/rents/rents.service'
import { HirersService } from './hirers.service'

@Component({
  selector: 'app-hirers',
  templateUrl: './hirers.page.html',
  styleUrls: ['./hirers.page.scss'],
})
export class HirersPage implements OnInit {
  title: string = 'Kiracılar'
  rentFlag = false
  hirerFlag = true
  constructor(
    private rentsService: RentsService,
    private hirersService: HirersService
  ) {}

  ngOnInit() {
    this.hirersService.onSelectHirer.subscribe((trueOrFalse) => {
      this.rentFlag = trueOrFalse
      this.hirerFlag = !trueOrFalse
    })
  }

  onNewRent() {
    this.rentsService.onNewRent.next(true)
  }

  onNewHirer() {
    this.hirersService.onNewHirer.next(true)
  }
}
