import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { Hirer } from '../hirer.model'
import { HirersService } from '../hirers.service'

@Component({
  selector: 'app-hirer-edit',
  templateUrl: './hirer-edit.page.html',
  styleUrls: ['./hirer-edit.page.scss'],
})
export class HirerEditPage implements OnInit {
  hirer: Hirer
  hirerId: string
  subs: Subscription
  hirerEditForm: FormGroup
  isLoading = false
  constructor(
    private route: ActivatedRoute,

    private router: Router,
    private hirersService: HirersService
  ) {}

  ngOnInit(): void {
    this.subs = this.route.paramMap.subscribe((parammap) => {
      this.hirerId = parammap.get('hirerId')
      this.isLoading = true
      this.hirersService.getHirerById(this.hirerId).subscribe((hirer) => {
        this.hirer = new Hirer(
          hirer['objectId'],
          hirer['tcNo'],
          hirer['name'],
          hirer['surname'],
          hirer['phone'],
          hirer['debt'],
          hirer['houseId']
        )
        this.initForm()
        this.isLoading = false
      })
    })
  }

  onCloseCard() {
    this.router.navigate(['tabs', 'hirers', this.hirerId])
  }
  onSubmit() {
    this.hirersService
      .updateHirer(this.hirer.id, this.hirerEditForm.value)
      .subscribe(() => {
        this.onCloseCard()
      })
  }
  initForm() {
    this.hirerEditForm = new FormGroup({
      tcNo: new FormControl(this.hirer.tcNo, Validators.required),
      name: new FormControl(this.hirer.name, Validators.required),
      surname: new FormControl(this.hirer.surname, Validators.required),
      phone: new FormControl(this.hirer.phone, Validators.required),
      debt: new FormControl(this.hirer.debt ? this.hirer.debt : 0, [
        Validators.required,
        Validators.pattern(/^[0-9]+[0-9]*$/),
      ]),
    })
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }
}
