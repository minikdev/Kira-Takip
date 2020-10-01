import { Injectable, OnInit } from '@angular/core'
import { House } from './house.model'
import { HirersService } from '../hirers/hirers.service'
import { Hirer } from '../hirers/hirer.model'
import { Subject } from 'rxjs'
@Injectable({
  providedIn: 'root',
})
export class HousesService {
  hirers: Hirer[]
  private houses: House[]
  housesChanged = new Subject<House[]>()
  getHouses() {
    return [...this.houses]
  }
  constructor(private hirersService: HirersService) {
    this.hirers = this.hirersService.getHirers()
    this.houses = [
      new House(
        0,
        'ev1',
        'Balıkesir/Bandırma Günaydın Mah. Fevzi Çakmak Cad. Eroğlu Apt. No:32 Daire:8 ',
        1000,
        this.hirers[0]
      ),
      new House(
        1,
        'ev2',
        'İzmir/Bornova Kazımdirik Mah. 220.Sk Tunçay Apt. No:1/B Daire:7',
        2000,
        this.hirers[1]
      ),
      new House(2, 'ev3', 'bandırma', 3000, this.hirers[2]),
      new House(3, 'ev4', 'bandırma', 4000, this.hirers[3]),
    ]
  }

  getHouse(index: number) {
    return this.houses[index]
  }

  getHouseById(houseId: number) {
    for (const house of this.houses) {
      if (houseId === house.id) {
        return house
      }
    }
    return null
  }

  getHouseByHirerId(hirerId: number) {
    for (let index = this.houses.length - 1; index >= 0; index--) {
      if (hirerId === this.houses[index].hirer.id) {
        return this.houses[index]
      }
    }
    return null
  }

  deleteHouse(house: House) {
    var index = this.houses.indexOf(house, 0)
    this.houses.splice(index, 1)
    this.sendNewHouses()
  }

  updateHouse(
    house: House,
    formValue: {
      name: string
      address: string
      rentAmount: number
      hirer: number
    }
  ) {
    var newHouse = new House(
      house.id,
      formValue.name,
      formValue.address,
      formValue.rentAmount,
      this.hirersService.getHirerById(formValue.hirer)
    )
    this.houses[this.houses.indexOf(house, 0)] = newHouse
    this.sendNewHouses()
  }

  newHouse(formValue) {
    this.houses.push(
      new House(
        this.getMaxIdOfHouses() + 1,
        formValue.name,
        formValue.address,
        formValue.rentAmount,
        this.hirersService.getHirerById(formValue.hirer)
      )
    )

    this.sendNewHouses()
  }
  sendNewHouses() {
    this.housesChanged.next(this.houses.slice())
  }
  getMaxIdOfHouses() {
    let max: number = -1
    for (const house of this.houses) {
      if (max < house.id) {
        max = house.id
      }
    }
    return max
  }
}
