import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'
import { tap, take, map, switchMap } from 'rxjs/operators'
import { Hirer } from './hirer.model'

@Injectable({
  providedIn: 'root',
})
export class HirersService {
  onNewHirer = new Subject<boolean>()
  onSelectHirer = new Subject<boolean>()
  private _Hirers = new BehaviorSubject<Hirer[]>([])
  private oldHirer: Hirer
  constructor(private http: HttpClient) {}

  get Hirers() {
    return this._Hirers
  }
  fetchHirers() {
    return this.http.get('https://parseapi.back4app.com/classes/hirers').pipe(
      take(1),
      map((data) => {
        const hirers = []

        data['results'].forEach((e) => {
          let newHirer = new Hirer(
            e.objectId,
            e.tcNo,
            e.name,
            e.surname,
            e.phone,
            e.debt,
            e.houseId
          )
          hirers.push(newHirer)
        })

        this._Hirers.next(hirers)
      })
    )
  }

  getAvailableHirers(houseId: string) {
    let availableHirers: Hirer[] = []
    return this.http
      .get<Hirer[]>(`https://parseapi.back4app.com/classes/hirers`)
      .pipe(
        map((resp) => {
          let responseArray = resp['results']

          responseArray.forEach((element) => {
            if (
              !element.hasOwnProperty('houseId') ||
              (element.hasOwnProperty('houseId') &&
                element['houseId'] === houseId) ||
              (element.hasOwnProperty('houseId') && element['houseId'] === null)
            ) {
              let newHirer = new Hirer(
                element['objectId'],
                element['tcNo'],
                element['name'],
                element['surname'],
                element['phone'],
                element['debt']
              )
              if (element['houseId'] === houseId) {
                this.oldHirer = newHirer
              }
              availableHirers.push(newHirer)
            }
          })
          return availableHirers
        })
      )
  }

  getHirerById(hirerId: string) {
    return this.http
      .get(`https://parseapi.back4app.com/classes/hirers/${hirerId}`)
      .pipe(take(1))
  }

  setHouseOfHirer(hirerId: string, houseId: string) {
    this.cleanHouseOfOldHirer()

    this.http
      .put(`https://parseapi.back4app.com/classes/hirers/${hirerId}`, {
        houseId: houseId,
      })
      .subscribe()
  }

  cleanHouseOfOldHirer() {
    if (this.oldHirer) {
      this.http
        .put(
          `https://parseapi.back4app.com/classes/hirers/${this.oldHirer.id}`,
          {
            houseId: null,
          }
        )
        .subscribe()
    }
  }

  deleteHirer(hirerId: string) {
    // çalıştı
    return this.http
      .delete(`https://parseapi.back4app.com/classes/hirers/${hirerId}`)
      .pipe(
        switchMap(() => {
          return this.Hirers
        }),
        take(1),
        tap((hirers) => {
          this._Hirers.next(hirers.filter((h) => h.id !== hirerId))
        })
      )
  }

  updateHirer(
    hirerId: string,
    formsValue: {
      tcNo: string
      name: string
      surname: string
      phone: string
      debt: number
    }
  ) {
    let updatedHirers: Hirer[] = []
    return this.http
      .put(`https://parseapi.back4app.com/classes/hirers/${hirerId}`, {
        tcNo: formsValue.tcNo,
        name: formsValue.name,
        surname: formsValue.surname,
        phone: formsValue.phone,
        debt: formsValue.debt,
      })
      .pipe(
        take(1),
        switchMap(() => {
          return this.Hirers
        }),
        take(1),
        tap((hirers) => {
          const updatedHirerIndex = hirers.findIndex((h) => h.id === hirerId)
          updatedHirers = [...hirers]
          updatedHirers[updatedHirerIndex] = new Hirer(
            hirerId,
            formsValue.tcNo,
            formsValue.name,
            formsValue.surname,
            formsValue.phone,
            formsValue.debt
          )
          this._Hirers.next(updatedHirers)
        })
      )
  }

  addHirer(formsValue: {
    tcNo: string
    name: string
    surname: string
    phone: string
    debt: number
  }) {
    // çalıştı
    var id: string = ''
    return this.http
      .post('https://parseapi.back4app.com/classes/hirers', {
        tcNo: formsValue.tcNo,
        name: formsValue.name,
        surname: formsValue.surname,
        phone: formsValue.phone,
        debt: formsValue.debt,
      })
      .pipe(
        take(1),
        switchMap((respData) => {
          id = respData['objectId']
          return this.Hirers
        }),
        take(1),
        tap((hirers) => {
          let newHirer = new Hirer(
            id,
            formsValue.tcNo,
            formsValue.name,
            formsValue.surname,
            formsValue.phone,
            formsValue.debt
          )
          this._Hirers.next(hirers.concat(newHirer))
        })
      )
  }

  addDebtToHirer(hirerId: string, debt: number) {
    let updatedHirers: Hirer[] = []
    return this.http
      .put(`https://parseapi.back4app.com/classes/hirers/${hirerId}`, {
        debt: debt,
      })
      .pipe(
        take(1),
        switchMap(() => {
          return this.Hirers
        }),
        take(1),
        tap((hirers) => {
          const updatedHirerIndex = hirers.findIndex((h) => h.id === hirerId)
          updatedHirers = [...hirers]

          updatedHirers[updatedHirerIndex] = new Hirer(
            hirerId,
            hirers[updatedHirerIndex].tcNo,
            hirers[updatedHirerIndex].name,
            hirers[updatedHirerIndex].surname,
            hirers[updatedHirerIndex].phone,
            debt
          )

          this._Hirers.next(updatedHirers)
        })
      )
  }
}
