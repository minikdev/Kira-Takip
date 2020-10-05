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
  newHirerSubscription: Subscription
  hirers: Hirer[] = []
  isLoading = false
  constructor(private hirersService: HirersService, private router: Router) {}

  ngOnInit() {
    this.isLoading = true
    this.hirersService.fetchHirers().subscribe(() => {
      this.isLoading = false
    })
    this.hirersService.Hirers.subscribe((hirers) => {
      this.hirers = hirers
    })
    this.newHirerSubscription = this.hirersService.onNewHirer.subscribe(
      (trueOrFalse) => {
        if (trueOrFalse) {
          this.onNewHirer()
        }
      }
    )
  }
  onNewHirer() {
    this.router.navigate(['tabs', 'hirers', 'new'])
  }
  onDeleteHirer(hirer: Hirer) {
    this.isLoading = true
    this.hirersService.deleteHirer(hirer.id).subscribe(() => {
      this.isLoading = false
    })
  }

  onSelectHirer(hirerId: string) {
    this.router.navigate(['tabs', 'hirers', hirerId], {
      state: { hirerId: hirerId },
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
