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
  hirerId: string
  hirer: Hirer
  rentAmount: number = 0
  isLoading = false
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
      this.hirerId = paramMap.get('hirerId')
      this.isLoading = true
      this.hirersService.getHirerById(this.hirerId).subscribe((hirer) => {
        this.hirer = new Hirer(
          hirer['objectId'],
          hirer['tcNo'],
          hirer['name'],
          hirer['surname'],
          hirer['phone'],
          hirer['debt'],
          hirer['houseId']
        )

        this.housesService
          .getHouseById(this.hirer.houseId)
          .subscribe((house) => {
            this.rentAmount = house['rentAmount']
          })
        this.isLoading = false
      })
    })
  }

  onCloseCard() {
    this.router.navigate(['tabs', 'hirers'])
    this.hirersService.onSelectHirer.next(false)
  }
  onEdit() {
    this.router.navigate(['tabs', 'hirers', this.hirerId, 'edit'])
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
