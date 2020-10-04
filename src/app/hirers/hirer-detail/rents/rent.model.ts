export class Rent {
  constructor(
    public id: string,
    public hirerId: string,
    public houseId: string,
    public paidAmount: number,
    public payDate: Date
  ) {}
}
