import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { HirersService } from 'src/app/hirers/hirers.service'
import { House } from 'src/app/houses/house.model'
import { HousesService } from 'src/app/houses/houses.service'
import { RentsService } from '../rents.service'

@Component({
  selector: 'app-new-rent',
  templateUrl: './new-rent.component.html',
  styleUrls: ['./new-rent.component.scss'],
})
export class NewRentComponent implements OnInit, OnDestroy {
  newRentForm: FormGroup
  subscription: Subscription
  hirerId: number
  house: House
  rentAmount: number
  constructor(
    private rentsService: RentsService,
    private router: Router,
    private route: ActivatedRoute,
    private housesService: HousesService,
    private hirersService: HirersService
  ) {}

  ngOnInit() {
    this.initForm()
    this.subscription = this.route.parent.paramMap.subscribe((paramMap) => {
      this.hirerId = +paramMap.get('hirerId')
      this.house = this.housesService.getHouseByHirerId(this.hirerId)
      this.rentAmount = this.house.rentAmount
    })
  }

  initForm() {
    this.newRentForm = new FormGroup({
      paidAmount: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
      payDate: new FormControl(new Date(), Validators.required),
    })
  }

  onSubmit() {
    this.rentsService.addRent(
      this.hirerId,
      this.house.id,
      this.newRentForm.value['paidAmount'],
      this.newRentForm.value['payDate']
    )
    this.hirersService.addDebtToHirer(
      this.hirerId,
      this.newRentForm.value['paidAmount'] - this.rentAmount
    )
    this.router.navigate(['hirers', this.hirerId])
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
