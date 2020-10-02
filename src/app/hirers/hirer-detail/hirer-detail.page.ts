import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { Hirer } from '../hirer.model'
import { HirersService } from '../hirers.service'
import { HousesService } from '../../houses/houses.service'

@Component({
  selector: 'app-hirer-detail',
  templateUrl: './hirer-detail.page.html',
  styleUrls: ['./hirer-detail.page.scss'],
})
export class HirerDetailPage implements OnInit {
  subscription: Subscription
  hirerId: number
  hirer: Hirer
  rentAmount: number = 0
  constructor(
    private route: ActivatedRoute,
    private hirersService: HirersService,
    private router: Router,
    private housesService: HousesService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('hirerId')) {
        return
      }
      this.hirerId = +paramMap.get('hirerId')
      this.hirer = this.hirersService.getHirerById(this.hirerId)
      if (this.housesService.getHouseByHirerId(this.hirerId)) {
        this.rentAmount = this.housesService.getHouseByHirerId(
          this.hirerId
        ).rentAmount
      }
    })
  }

  onCloseCard() {
    this.router.navigate(['hirers'])
  }
  onEdit() {
    this.router.navigate(['hirers', this.hirerId, 'edit'])
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
