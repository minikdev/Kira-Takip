export class Rent {
  constructor(
    public id: number,
    public hirerId: number,
    public houseId: number,
    public paidAmount: number,
    public payDate: Date
  ) {}
}
