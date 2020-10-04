import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router, Params } from '@angular/router'
import { Subscription } from 'rxjs'
import { Hirer } from 'src/app/hirers/hirer.model'
import { HirersService } from 'src/app/hirers/hirers.service'
import { House } from '../house.model'
import { HousesService } from '../houses.service'

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.scss'],
})
export class HouseDetailComponent implements OnInit {
  house: House
  houseId: string
  subs: Subscription
  hirerName: string
  isLoading = false
  constructor(
    private route: ActivatedRoute,
    private housesService: HousesService,
    private router: Router,
    private hirersService: HirersService
  ) {}

  ngOnInit(): void {
    this.subs = this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('houseId')) {
        return
      }

      this.houseId = paramMap.get('houseId')
      this.isLoading = true
      this.housesService.getHouseById(this.houseId).subscribe((house) => {
        const newHouse = new House(
          house['objectId'],
          house['name'],
          house['address'],
          house['rentAmount'],
          house['hirerId']
        )

        this.house = newHouse
        this.hirersService
          .getHirerById(this.house.hirerId)
          .subscribe((hirer: Hirer) => {
            this.hirerName = hirer.name + ' ' + hirer.surname
          })
        this.isLoading = false
      })
    })
  }

  onCloseCard() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }
  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route })
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
}
