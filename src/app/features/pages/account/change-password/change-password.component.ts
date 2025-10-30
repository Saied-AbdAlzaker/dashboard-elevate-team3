import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangePasswordService } from '../service/change-password.service';
import { Subscription } from 'rxjs';
import { ButtonComponent } from '../../../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-change-password',
  imports: [FormsModule,ReactiveFormsModule,ButtonComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  oldPassword:boolean = false
  newPassword:boolean = false
  confirmPassword:boolean = false;
  passwordForm: FormGroup;

  changePasswordSubscription!: Subscription;

  constructor(private fb: FormBuilder , private _changePasswordService:ChangePasswordService) {
    this.passwordForm = this.fb.group({
                password: ['', Validators.required],
                newPassword: ['', [Validators.required, Validators.minLength(6)]],
                confirmPassword: ['', Validators.required],
              }, { validators: this.passwordsMatch });
  }

  passwordsMatch(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {debugger
    if (this.passwordForm.valid) {
      const { password, newPassword } = this.passwordForm.value;
      this.changePasswordSubscription = this._changePasswordService.changePassword({ password, newPassword }).subscribe({
        next:(res)=>{
          console.log(res);
        }, error:(err)=>{
          console.log(err);}
      })
    }
  }
  ngOnDestroy(): void {
    if(this.changePasswordSubscription){
      this.changePasswordSubscription.unsubscribe();
    }

  }
}
