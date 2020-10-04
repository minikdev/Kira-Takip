import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { HirersService } from '../hirers.service'

@Component({
  selector: 'app-new-hirer',
  templateUrl: './new-hirer.component.html',
  styleUrls: ['./new-hirer.component.scss'],
})
export class NewHirerComponent implements OnInit {
  newHirerForm: FormGroup
  constructor(private hirersService: HirersService, private router: Router) {}

  ngOnInit() {
    this.initForm()
  }
  initForm() {
    this.newHirerForm = new FormGroup({
      tcNo: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      surname: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      debt: new FormControl(0, [
        Validators.required,
        Validators.pattern(/^[0-9]+[0-9]*$/),
      ]),
    })
  }

  onSubmit() {
    this.hirersService.addHirer(this.newHirerForm.value).subscribe(() => {
      this.onCloseCard()
    })
  }
  onCloseCard() {
    this.router.navigate(['tabs', 'hirers'])
  }
}
