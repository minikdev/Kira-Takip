import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Hirer } from 'src/app/hirers/hirer.model'
import { HirersService } from 'src/app/hirers/hirers.service'
import { House } from '../house.model'
import { HousesService } from '../houses.service'

@Component({
  selector: 'app-house-edit',
  templateUrl: './house-edit.component.html',
  styleUrls: ['./house-edit.component.scss'],
})
export class HouseEditComponent implements OnInit {
  house: House
  houseId: string
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
      this.isLoading = true
      this.houseId = parammap.get('houseId')
      this.editMode = parammap.get('houseId') != null
      this.hirersService
        .getAvailableHirers(this.houseId)
        .subscribe((availableHirers) => {
          this.hirersList = availableHirers
        })
      this.initForm()
      this.isLoading = false
    })
  }

  onSubmit() {
    if (this.editMode) {
      this.housesService
        .updateHouse(this.house, this.houseEditForm.value)
        .subscribe(() => {
          this.hirersService.setHouseOfHirer(
            this.houseEditForm.value['hirer'],
            this.houseId
          )
          this.onCloseCard()
        })
    } else {
      this.housesService
        .addHouse(this.houseEditForm.value)
        .subscribe((data) => {
          this.housesService.Houses.subscribe((houses) => {
            let houseId = houses.find(
              (e) => e.name === this.houseEditForm.value.name
            ).id
            this.hirersService.setHouseOfHirer(
              this.houseEditForm.value['hirer'],
              houseId
            )
            this.onCloseCard()
          })
        })
    }
  }

  initForm() {
    let houseName = ''
    let houseAddress = ''
    let houseRentAmount = 0

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
        houseName = newHouse.name
        houseAddress = newHouse.address
        houseRentAmount = newHouse.rentAmount

        this.houseEditForm = new FormGroup({
          name: new FormControl(houseName, [Validators.required]),
          address: new FormControl(houseAddress, Validators.required),
          rentAmount: new FormControl(houseRentAmount, [
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/),
          ]),
          hirer: new FormControl(null, Validators.required),
        })
      })
    }

    this.houseEditForm = new FormGroup({
      name: new FormControl(houseName, [Validators.required]),
      address: new FormControl(houseAddress, Validators.required),
      rentAmount: new FormControl(houseRentAmount, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
      hirer: new FormControl(null, Validators.required),
    })
  }

  onCloseCard() {
    this.router.navigate(['tabs', 'houses'])
  }
}
