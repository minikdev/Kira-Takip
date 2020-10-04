import { Hirer } from '../hirers/hirer.model'
export class House {
  constructor(
    public id: string,
    public name: string,
    public address: string,
    public rentAmount: number,
    public hirerId?: string
  ) {}
}
