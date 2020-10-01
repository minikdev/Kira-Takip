import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router, Params } from '@angular/router'
import { Subscription } from 'rxjs'
import { House } from '../house.model'
import { HousesService } from '../houses.service'

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.scss'],
})
export class HouseDetailComponent implements OnInit {
  house: House
  houseId: number
  subs: Subscription
  constructor(
    private route: ActivatedRoute,
    private housesService: HousesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subs = this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('houseId')) {
        return
      }
      this.houseId = +paramMap.get('houseId')
      this.house = this.housesService.getHouseById(this.houseId)
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
