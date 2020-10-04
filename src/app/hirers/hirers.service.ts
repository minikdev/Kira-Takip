import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
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

  constructor() {}
  getHirers() {
    return this.hirers.slice()
  }
  getAvailableHirers(houseId: string) {
    let availableHirers: Hirer[] = []
    for (const hirer of this.hirers) {
      if (hirer.houseId === undefined || hirer.houseId === houseId) {
        availableHirers.push(hirer)
      }
    }
    return availableHirers
  }

  getHirer(index: number) {
    return this.hirers[index]
  }

  getHirerById(hirerId: string) {
    for (const hirer of this.hirers) {
      if (hirerId === hirer.id) {
        return hirer
      }
    }
    return null
  }

  setHouseOfHirer(hirerId: string, houseId: string) {
    for (const hirer of this.hirers) {
      if (hirer.id === hirerId) {
        hirer.houseId = houseId
      }
    }
    this.sendNewHirers()
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
        Math.random().toString(),
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
