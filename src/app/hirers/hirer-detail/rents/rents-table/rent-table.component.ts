import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { Hirer } from 'src/app/hirers/hirer.model'
import { HirersService } from 'src/app/hirers/hirers.service'
import { HousesService } from 'src/app/houses/houses.service'
import { Rent } from '../rent.model'
import { RentsService } from '../rents.service'

@Component({
  selector: 'app-rent-table',
  templateUrl: './rent-table.component.html',
  styleUrls: ['./rent-table.component.scss'],
})
export class RentTableComponent implements OnInit {
  hirerId: number
  hirer: Hirer
  routeSubscription: Subscription
  newRentSubscription: Subscription
  rentServiceSubscription: Subscription
  houseName: string = ''
  rents: Rent[] = []
  constructor(
    private route: ActivatedRoute,
    private hirersService: HirersService,
    private housesService: HousesService,
    private rentsService: RentsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe((paramMap) => {
      this.hirerId = +paramMap.get('hirerId')
      this.hirer = this.hirersService.getHirerById(this.hirerId)
      if (this.housesService.getHouseByHirerId(this.hirerId)) {
        this.houseName = this.housesService.getHouseByHirerId(this.hirerId).name
      }
    })
    this.rents = this.rentsService.prepareRentsArray(this.hirerId)
    this.rentServiceSubscription = this.rentsService.rentsChanged.subscribe(
      (rents: Rent[]) => {
        this.rents = rents
      }
    )
    this.newRentSubscription = this.rentsService.onNewRent.subscribe(
      (trueOrFalse) => {
        if (trueOrFalse) {
          this.onNewRent()
        }
      }
    )
  }

  onDeleteRent(rent: Rent) {
    this.rentsService.deleteRent(rent, this.hirerId)
  }

  onNewRent() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }
  ngOnDestroy() {
    this.rentServiceSubscription.unsubscribe()
    this.routeSubscription.unsubscribe()
    this.newRentSubscription.unsubscribe()
  }
}
