import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'
import { Hirer } from '../../hirer.model'
import { Rent } from './rent.model'

import { map, switchMap, tap, take } from 'rxjs/operators'
@Injectable({
  providedIn: 'root',
})
export class RentsService {
  private rents: Rent[] = []
  private _Rents = new BehaviorSubject<Rent[]>([])
  onNewRent = new Subject<boolean>()
  rentsChanged = new Subject<Rent[]>()
  getRents() {
    return [...this.rents]
  }

  get Rents() {
    return this._Rents
  }
  constructor(private http: HttpClient) {}

  fetchRents() {
    // çalıştı
    return this.http.get('https://parseapi.back4app.com/classes/rents').pipe(
      take(1),
      map((data) => {
        const rents = []
        data['results'].forEach((element) => {
          let newRent = new Rent(
            element.objectId,
            element.hirerId,
            element.paidAmount,
            new Date(element.payDate)
          )
          rents.push(newRent)
        })
        this._Rents.next(rents)
      })
    )
  }
  prepareRentsArray(hirerId: string) {
    var individualRents: Rent[] = []
    for (let rent of this.rents) {
      if (rent.hirerId === hirerId) {
        individualRents.push(rent)
      }
    }
    return individualRents
  }

  getIndexOfARent(rent: Rent, hirerId: string): number {
    var individualRents = this.prepareRentsArray(hirerId)
    return individualRents.indexOf(rent, 0)
  }

  deleteRent(rentId: string) {
    return this.http
      .delete(`https://parseapi.back4app.com/classes/rents/${rentId}`)
      .pipe(
        switchMap(() => {
          return this.Rents
        }),
        take(1),
        tap((rents) => {
          this._Rents.next(rents.filter((r) => r.id !== rentId))
        })
      )
  }

  addRent(hirerId: string, paidAmount: number, payDate: string) {
    var id: string = ''
    return this.http
      .post('https://parseapi.back4app.com/classes/rents', {
        hirerId: hirerId,
        paidAmount: paidAmount,
        payDate: payDate,
      })
      .pipe(
        take(1),
        switchMap((respData) => {
          id = respData['objectId']
          return this.Rents
        }),
        take(1),
        tap((houses) => {
          let newRent = new Rent(id, hirerId, paidAmount, new Date(payDate))
          this._Rents.next(this.rents.concat(newRent))
        })
      )
  }
}
