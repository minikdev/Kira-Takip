import { Injectable } from '@angular/core'
import { House } from './house.model'
import { HirersService } from '../hirers/hirers.service'
import { Hirer } from '../hirers/hirer.model'
import { BehaviorSubject, of, Subject } from 'rxjs'
import { map, switchMap, tap, take } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class HousesService {
  hirers: Hirer[]
  private houses: House[] = []
  private _Houses = new BehaviorSubject<House[]>([])
  onNewHouse = new Subject<boolean>()

  get Houses() {
    return this._Houses.asObservable()
  }
  constructor(private hirersService: HirersService, private http: HttpClient) {
    this.hirers = this.hirersService.getHirers()
  }

  fetchHouses() {
    // çalıştı
    return this.http.get('https://parseapi.back4app.com/classes/houses').pipe(
      take(1),
      map((data) => {
        const houses = []
        data['results'].forEach((e) => {
          let newHouse = new House(
            e.objectId,
            e.name,
            e.address,
            e.rentAmount,
            e.hirerId
          )
          houses.push(newHouse)
        })

        this._Houses.next(houses)
      })
    )
  }

  getHouse(index: number) {
    return this.houses[index]
  }

  getHouseById(houseId: string) {
    return this.http
      .get(`https://parseapi.back4app.com/classes/houses/${houseId}`)
      .pipe(take(1))
  }

  getHouseByHirerId() {
    return this.http.get(`https://parseapi.back4app.com/classes/houses`)
  }

  deleteHouse(houseId: string) {
    // çalıştı
    return this.http
      .delete(`https://parseapi.back4app.com/classes/houses/${houseId}`)
      .pipe(
        switchMap(() => {
          return this.Houses
        }),
        take(1),
        tap((houses) => {
          this._Houses.next(houses.filter((h) => h.id !== houseId))
        })
      )
  }

  updateHouse(
    house: House,
    formValue: {
      name: string
      address: string
      rentAmount: number
      hirer: string
    }
  ) {
    let updatedHouses: House[] = []
    return this.http
      .put(`https://parseapi.back4app.com/classes/houses/${house.id}`, {
        name: formValue.name,
        address: formValue.address,
        rentAmount: formValue.rentAmount,
        hirerId: formValue.hirer,
      })
      .pipe(
        take(1),
        switchMap(() => {
          return this.Houses
        }),
        take(1),
        tap((houses) => {
          const updatedHouseIndex = houses.findIndex((h) => h.id === house.id)
          updatedHouses = [...houses]
          updatedHouses[updatedHouseIndex] = new House(
            house.id,
            formValue.name,
            formValue.address,
            formValue.rentAmount,
            formValue.hirer
          )
          this._Houses.next(updatedHouses)
        })
      )
  }

  addHouse(formValue: {
    name: string
    address: string
    rentAmount: number
    hirer: string
  }) {
    var id: string = ''
    return this.http
      .post('https://parseapi.back4app.com/classes/houses', {
        name: formValue.name,
        address: formValue.address,
        rentAmount: formValue.rentAmount,
        hirerId: formValue.hirer,
      })
      .pipe(
        take(1),
        switchMap((respData) => {
          id = respData['objectId']
          return this.Houses
        }),
        take(1),
        tap((houses) => {
          let newHouse = new House(
            id,
            formValue.name,
            formValue.address,
            formValue.rentAmount,
            formValue.hirer
          )
          this._Houses.next(houses.concat(newHouse))
        })
      )
  }
}
