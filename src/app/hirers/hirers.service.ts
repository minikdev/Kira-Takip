import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'
import { tap, take, map, switchMap } from 'rxjs/operators'
import { Hirer } from './hirer.model'

@Injectable({
  providedIn: 'root',
})
export class HirersService {
  hirersChanged = new Subject<Hirer[]>()
  onNewHirer = new Subject<boolean>()
  private hirers: Hirer[] = [
    new Hirer('0', '123123', 'Minik', 'Engin', '5448881899', undefined, '0'),
    new Hirer(
      '1',
      '12312312123',
      'Minik2',
      'Engin',
      '5448881899',
      undefined,
      '1'
    ),
    new Hirer(
      '2',
      '1231241243',
      'Minik3',
      'Engin',
      '5448881899',
      undefined,
      '2'
    ),
    new Hirer(
      '3',
      '12312312123',
      'Minik4',
      'Engin',
      '5448881899',
      undefined,
      '3'
    ),
    new Hirer('4', '12323', 'Minik5', 'Engin', '5448881899'),
  ]
  private _Hirers = new BehaviorSubject<Hirer[]>([])

  constructor(private http: HttpClient) {}

  get Hirers() {
    return this._Hirers
  }
  fetchHirers() {
    // çalıştı
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
  getHirers() {
    return this.hirers.slice()
  }
  // ON NEW HOUSE
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
                element['houseId'] === houseId)
            ) {
              availableHirers.push(
                new Hirer(
                  element['objectId'],
                  element['tcNo'],
                  element['name'],
                  element['surname'],
                  element['phone'],
                  element['debt']
                )
              )
            }
          })
          return availableHirers
        })
      )
    // for (const hirer of this.hirers) {
    //   if (hirer.houseId === undefined || hirer.houseId === houseId) {
    //     availableHirers.push(hirer)
    //   }
    // }
    // return availableHirers
  }
  getHirer(index: number) {
    return this.hirers[index]
  }

  getHirerById(hirerId: string) {
    //çalıştı
    return this.http
      .get(`https://parseapi.back4app.com/classes/hirers/${hirerId}`)
      .pipe(take(1))
  }
  setHouseOfHirer(hirerId: string, houseId: string) {
    this.http
      .put(`https://parseapi.back4app.com/classes/hirers/${hirerId}`, {
        houseId: houseId,
      })
      .subscribe()
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
    // var newHirer = new Hirer(
    //   hirer.id,
    //   formsValue.tcNo,
    //   formsValue.name,
    //   formsValue.surname,
    //   formsValue.phone,
    //   formsValue.debt
    // )
    // this.hirers[this.hirers.indexOf(hirer, 0)] = newHirer
    // this.sendNewHirers()

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

    // this.hirers.push(
    //   new Hirer(
    //     Math.random().toString(),
    //     formsValue.tcNo,
    //     formsValue.name,
    //     formsValue.surname,
    //     formsValue.phone,
    //     formsValue.debt
    //   )
    // )
    // this.sendNewHirers()
  }

  sendNewHirers() {
    this.hirersChanged.next([...this.hirers])
  }
  // getMaxId() {
  //   let max: number = -1
  //   for (const hirer of this.hirers) {
  //     if (max < hirer.id) {
  //       max = hirer.id
  //     }
  //   }
  //   return max
  // }

  addDebtToHirer(hirerId: string, debt: number) {
    for (const hirer of this.hirers) {
      if (hirerId === hirer.id) {
        if (hirer.debt === undefined) {
          hirer.debt = 0
        }

        hirer.debt += debt
      }
    }
    this.sendNewHirers()
  }
}
