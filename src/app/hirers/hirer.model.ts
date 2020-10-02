export class Hirer {
  constructor(
    public id: number,
    public tcNo: string,
    public name: string,
    public surname: string,
    public phone: string,
    public debt?: number,
    public houseId?: number
  ) {}
}
