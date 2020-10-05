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
  hirerId: string
  hirer: Hirer
  routeSubscription: Subscription
  newRentSubscription: Subscription
  rentServiceSubscription: Subscription
  houseName: string = ''
  rents: Rent[] = []
  isLoading = false
  constructor(
    private route: ActivatedRoute,
    private hirersService: HirersService,
    private housesService: HousesService,
    private rentsService: RentsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe((paramMap) => {
      this.hirerId = paramMap.get('hirerId')
      this.hirersService
        .getHirerById(this.hirerId)
        .subscribe((hirer: Hirer) => {
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
            .subscribe((data) => {
              this.houseName = data['name']
            })
        })
    })

    this.isLoading = true
    this.rentsService.fetchRents().subscribe(() => {
      this.isLoading = false
    })
    this.rentsService.Rents.subscribe((rents) => {
      this.rents = []
      rents.forEach((e) => {
        if (e.hirerId === this.hirerId) {
          this.rents.push(e)
        }
      })
    })

    this.newRentSubscription = this.rentsService.onNewRent.subscribe(
      (trueOrFalse) => {
        if (trueOrFalse) {
          this.onNewRent()
        }
      }
    )
  }

  onDeleteRent(rentId: string) {
    this.isLoading = true
    this.rentsService.deleteRent(rentId).subscribe(() => {
      this.isLoading = false
    })
  }

  onNewRent() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }
  ngOnDestroy() {
    this.routeSubscription.unsubscribe()
    this.newRentSubscription.unsubscribe()
  }
}
