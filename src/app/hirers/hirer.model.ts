export class Hirer {
  constructor(
    public id: string,
    public tcNo: string,
    public name: string,
    public surname: string,
    public phone: string,
    public debt?: number,
    public houseId?: string
  ) {}
}
