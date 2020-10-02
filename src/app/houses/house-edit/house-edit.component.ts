import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router, Params } from '@angular/router'
import { Subscription } from 'rxjs'
import { Hirer } from 'src/app/hirers/hirer.model'
import { HirersService } from 'src/app/hirers/hirers.service'
import { House } from '../house.model'
import { HousesService } from '../houses.service'

@Component({
  selector: 'app-house-edit',
  templateUrl: './house-edit.component.html',
  styleUrls: ['./house-edit.component.scss'],
})
export class HouseEditComponent implements OnInit, OnDestroy {
  house: House
  houseId: number
  subs: Subscription
  houseEditForm: FormGroup
  hirersList: Hirer[]
  editMode: boolean = false
  constructor(
    private route: ActivatedRoute,
    private housesService: HousesService,
    private router: Router,
    private hirersService: HirersService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((parammap) => {
      this.houseId = +parammap.get('houseId')
      this.editMode = parammap.get('houseId') != null
      this.house = this.housesService.getHouseById(this.houseId)
    })
    this.hirersList = this.hirersService.getAvailableHirers(this.houseId)
    this.subs = this.hirersService.hirersChanged.subscribe((hirers) => {
      this.hirersList = this.hirersService.getAvailableHirers(this.houseId)
    })
    this.initForm()
  }

  onCloseCard() {
    this.router.navigate(['tabs', 'houses'])
  }
  onSubmit() {
    if (this.editMode) {
      this.housesService.updateHouse(this.house, this.houseEditForm.value)
      this.hirersService.setHouseOfHirer(
        +this.houseEditForm.value['hirer'],
        this.house.id
      )
    } else {
      this.housesService.newHouse(this.houseEditForm.value)
      this.hirersService.setHouseOfHirer(
        +this.houseEditForm.value['hirer'],
        this.housesService.getMaxIdOfHouses() + 1
      )
    }
    this.onCloseCard()
  }

  initForm() {
    if (this.editMode) {
      this.houseEditForm = new FormGroup({
        name: new FormControl(this.house.name, [Validators.required]),
        address: new FormControl(this.house.address, Validators.required),
        rentAmount: new FormControl(this.house.rentAmount, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
        hirer: new FormControl(null, Validators.required),
      })
    } else {
      this.houseEditForm = new FormGroup({
        name: new FormControl(null, [Validators.required]),
        address: new FormControl(null, Validators.required),
        rentAmount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
        hirer: new FormControl(null, Validators.required),
      })
    }
  }
  getHirerController() {
    return this.houseEditForm.get('hirer')
  }
  ngOnDestroy() {
    this.subs.unsubscribe()
  }
}
