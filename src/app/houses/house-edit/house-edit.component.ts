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
  houseId: string
  subs: Subscription
  houseEditForm: FormGroup
  hirersList: Hirer[]
  editMode: boolean = false
  isLoading = false
  constructor(
    private route: ActivatedRoute,
    private housesService: HousesService,
    private router: Router,
    private hirersService: HirersService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((parammap) => {
      this.houseId = parammap.get('houseId')
      this.editMode = parammap.get('houseId') != null
    })
    if (this.editMode) {
      this.housesService.getHouseById(this.houseId).subscribe((house) => {
        const newHouse = new House(
          house['objectId'],
          house['name'],
          house['address'],
          house['rentAmount'],
          house['hirerId']
        )

        this.house = newHouse

        this.initForm()
        this.isLoading = false
      })
    }

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
      this.housesService
        .updateHouse(this.house, this.houseEditForm.value)
        .subscribe(() => {
          this.hirersService.setHouseOfHirer(
            this.houseEditForm.value['hirer'],
            this.house.id
          )
          this.onCloseCard()
        })
    } else {
      this.housesService.addHouse(this.houseEditForm.value).subscribe(() => {
        this.houseEditForm.reset()
        this.hirersService.setHouseOfHirer(
          this.houseEditForm.value['hirer'],
          ''
        )
        this.onCloseCard()
      })
    }
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
