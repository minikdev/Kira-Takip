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
  newHouseSubscription: Subscription
  isLoading = false

  constructor(private housesService: HousesService, private router: Router) {}

  ngOnInit() {
    this.newHouseSubscription = this.housesService.onNewHouse.subscribe(
      (trueorFalse) => {
        if (trueorFalse) {
          this.onNewHouse()
        }
      }
    )
    this.isLoading = true
    this.housesService.fetchHouses().subscribe(() => {
      this.isLoading = false
    })
    this.housesService.Houses.subscribe((houses) => {
      this.houses = houses
    })
  }

  onSelectHouse(id: number) {
    this.router.navigate(['tabs', 'houses', id])
  }
  onNewHouse() {
    this.router.navigate(['tabs', 'houses', 'new'])
  }
  onDeleteHouse(houseId: string) {
    this.isLoading = true
    this.housesService.deleteHouse(houseId).subscribe(() => {
      this.isLoading = false
    })
  }
  ngOnDestroy() {
    this.newHouseSubscription.unsubscribe()
  }
}
