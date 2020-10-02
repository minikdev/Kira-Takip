import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { House } from '../house.model'
import { HousesService } from '../houses.service'

@Component({
  selector: 'app-houses-table',
  templateUrl: './houses-table.component.html',
  styleUrls: ['./houses-table.component.scss'],
})
export class HousesTableComponent implements OnInit, OnDestroy {
  houses: House[]
  subscription: Subscription
  constructor(private housesService: HousesService, private router: Router) {}

  ngOnInit() {
    this.houses = this.housesService.getHouses()
    this.subscription = this.housesService.housesChanged.subscribe((houses) => {
      this.houses = houses
    })
  }
  onSelectHouse(id: number) {
    this.router.navigate(['tabs', 'houses', id])
  }
  onNewHouse() {
    this.router.navigate(['tabs', 'houses', 'new'])
  }
  onDeleteHouse(house: House) {
    this.housesService.deleteHouse(house)
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
