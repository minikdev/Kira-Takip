import { Hirer } from '../hirers/hirer.model'
export class House {
  constructor(
    public id: number,
    public name: string,
    public address: string,
    public rentAmount: number,
    public hirer: Hirer
  ) {}
}
