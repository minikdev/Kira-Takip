import { Component, OnInit } from '@angular/core'
import { HousesService } from './houses.service'

@Component({
  selector: 'app-houses',
  templateUrl: './houses.page.html',
  styleUrls: ['./houses.page.scss'],
})
export class HousesPage implements OnInit {
  constructor(private housesService: HousesService) {}

  ngOnInit() {}

  onNewHouse() {
    this.housesService.onNewHouse.next(true)
  }
}
