import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { Hirer } from '../../hirer.model'
import { Rent } from './rent.model'
@Injectable({
  providedIn: 'root',
})
export class RentsService {
  private rents: Rent[] = [
    new Rent(0, 0, 0, 1000, new Date('2019-01-16')),
    new Rent(1, 1, 1, 1000, new Date('2019-01-16')),
    new Rent(2, 1, 1, 4000, new Date('2019-01-16')),
    new Rent(3, 2, 2, 2000, new Date('2019-01-16')),
    new Rent(4, 3, 3, 3000, new Date('2019-01-16')),
  ]
  onNewRent = new Subject<boolean>()
  rentsChanged = new Subject<Rent[]>()
  getRents() {
    return [...this.rents]
  }

  prepareRentsArray(hirerId: number) {
    var individualRents: Rent[] = []
    for (let rent of this.rents) {
      if (rent.hirerId === hirerId) {
        individualRents.push(rent)
      }
    }
    return individualRents
  }

  getIndexOfARent(rent: Rent, hirerId: number): number {
    var individualRents = this.prepareRentsArray(hirerId)
    return individualRents.indexOf(rent, 0)
  }
  constructor() {}

  deleteRent(rent: Rent, hirerId: number) {
    var index = this.rents.indexOf(rent)
    this.rents.splice(index, 1)

    this.sendNewRents(hirerId)
  }

  addRent(
    hirerId: number,
    houseId: number,
    paidAmount: number,
    payDate: string
  ) {
    this.rents.push(
      new Rent(5, hirerId, houseId, paidAmount, new Date(payDate))
    )

    this.sendNewRents(hirerId)
  }

  sendNewRents(hirerId) {
    this.rentsChanged.next(this.prepareRentsArray(hirerId))
  }
}
