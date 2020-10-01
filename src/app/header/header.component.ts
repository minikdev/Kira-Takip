import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NavController } from '@ionic/angular'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private navCtrl: NavController) {}

  ngOnInit() {}

  onHirers() {
    this.router.navigate(['hirers'])
  }
  onHouses() {
    this.navCtrl.navigateBack('houses')
  }
}
