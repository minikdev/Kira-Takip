import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { Hirer } from '../hirer.model'
import { HirersService } from '../hirers.service'
@Component({
  selector: 'app-hirers-table',
  templateUrl: './hirers-table.component.html',
  styleUrls: ['./hirers-table.component.scss'],
})
export class HirersTableComponent implements OnInit {
  subscription: Subscription
  hirers: Hirer[] = []
  constructor(
    private hirersService: HirersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.hirers = this.hirersService.getHirers()

    this.subscription = this.hirersService.hirersChanged.subscribe((hirers) => {
      this.hirers = hirers
    })
  }
  onNewHirer() {
    this.router.navigate(['tabs', 'hirers', 'new'])
  }
  onDeleteHirer(hirer: Hirer) {
    this.hirersService.deleteHirer(hirer)
  }

  onSelectHirer(hirer: Hirer) {
    this.router.navigate(['tabs', 'hirers', hirer.id], {
      state: { hirerId: hirer.id },
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
