import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { Hirer } from './hirer.model'

@Injectable({
  providedIn: 'root',
})
export class HirersService {
  hirersChanged = new Subject<Hirer[]>()
  private hirers: Hirer[] = [
    new Hirer(0, '123123', 'Minik', 'Engin', '5448881899'),
    new Hirer(1, '12312312123', 'Minik2', 'Engin', '5448881899'),
    new Hirer(2, '1231241243', 'Minik3', 'Engin', '5448881899'),
    new Hirer(3, '12312312123', 'Minik4', 'Engin', '5448881899'),
  ]
  constructor() {}
  getHirers() {
    return this.hirers.slice()
  }

  getHirer(index: number) {
    return this.hirers[index]
  }
  getHirerById(hirerId: number) {
    for (const hirer of this.hirers) {
      if (hirerId === hirer.id) {
        return hirer
      }
    }
    return null
  }

  deleteHirer(hirer: Hirer) {
    var index = this.hirers.indexOf(hirer, 0)
    this.hirers.splice(index, 1)
    this.sendNewHirers()
  }
  updateHirer(
    hirer: Hirer,
    formsValue: {
      tcNo: string
      name: string
      surname: string
      phone: string
      debt: number
    }
  ) {
    var newHirer = new Hirer(
      hirer.id,
      formsValue.tcNo,
      formsValue.name,
      formsValue.surname,
      formsValue.phone,
      formsValue.debt
    )
    this.hirers[this.hirers.indexOf(hirer, 0)] = newHirer
    this.sendNewHirers()
  }

  newHirer(formValue: {
    tcNo: string
    name: string
    surname: string
    phone: string
    debt: number
  }) {
    this.hirers.push(
      new Hirer(
        this.getMaxId() + 1,
        formValue.tcNo,
        formValue.name,
        formValue.surname,
        formValue.phone,
        formValue.debt
      )
    )
    this.sendNewHirers()
  }

  sendNewHirers() {
    this.hirersChanged.next([...this.hirers])
  }
  getMaxId() {
    let max: number = -1
    for (const hirer of this.hirers) {
      if (max < hirer.id) {
        max = hirer.id
      }
    }
    return max
  }

  addDebtToHirer(hirerId: number, debt: number) {
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
