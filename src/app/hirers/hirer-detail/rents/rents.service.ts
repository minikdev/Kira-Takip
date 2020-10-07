import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'
import { Rent } from './rent.model'

import { map, switchMap, tap, take } from 'rxjs/operators'
@Injectable({
  providedIn: 'root',
})
export class RentsService {
  private _Rents = new BehaviorSubject<Rent[]>([])
  onNewRent = new Subject<boolean>()
  rentsChanged = new Subject<Rent[]>()

  constructor(private http: HttpClient) {}

  get Rents() {
    return this._Rents
  }

  fetchRents() {
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
        tap((rents) => {
          let newRent = new Rent(id, hirerId, paidAmount, new Date(payDate))
          this._Rents.next(rents.concat(newRent))
        })
      )
  }
}
