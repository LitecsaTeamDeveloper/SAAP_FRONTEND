import { Component, OnInit , Inject } from '@angular/core';
import { Validators, AbstractControl, FormBuilder, FormGroup, FormControl , Validator , FormsModule} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { SharedService } from '../../../shared/services/shared.service';
import { catchError } from 'rxjs/operators';

// import { CheckRequiredField } from '../_shared/helpers/form.helper';
// import { AuthService } from '../_auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { 

  loginForm: FormGroup;

  processing: Boolean = false;
  errores: Boolean = false;
  hide = true;

  //usuarios: any;
  usuarios: any = [];

  constructor(private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    // private authService: AuthService,
    private router: Router,
    private usuarioService: UsuarioService,
    private sharedService: SharedService
    //private usuarioService: ApiService
  ) { 
    this.loginForm = this.fb.group ({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit() {
    // if (this.authService.hasToken()) {
    //   this.handleLoginSuccess();
    // } else {
    //   this.initForm();
    // }
   console.log('ENTRO AL LOGIN');
    }

  getUsuario(usuario:any, pwd: any) {
    const body = {
      usuario: usuario,
      password: pwd
    };

    console.log (body);

    this.usuarioService.getUsuarios(body).pipe(
      catchError(error => {
        // Manejo del error
        if (error.status == 0) {

          alert( 'Error en la peticion de servicios APIs');
        } else {

          alert( error.error);
        }
        throw error; // Lanzar el error para que siga propagándose
      })
    ).subscribe(
      data => {
        this.usuarios = data;
        console.log ('objeto usuarios en login: ', this.usuarios);
        if (this.usuarios.valido) {
          this.sharedService.nombreUsuario = this.usuarios.nombre;
          this.sharedService.companiaUsuario = this.usuarios.idCompania;
          this.router.navigate(['home']);
        } else {
          this.error();
        }
      }
    );
    
  }

  // checkRequiredClass(frmControl: string) {
  //   const t  = this.loginForm.get()
  //   return {
  //     'required' : false
  //   };
  // }

  ingresar() {
    const usuario = this.loginForm.value.usuario;
    const password = this.loginForm.value.password;
    this.getUsuario(usuario,password);

  }

error() {
  this._snackBar.open('Usuario o password incorrectos','',{
    duration:2500,
    horizontalPosition: 'center',
    verticalPosition: 'top'
  })

}

  onSubmitButtonClicked() {
    this.errores  = false;
    this.processing  = false;
    // if (this.loginForm.valid) {
    //   this.login();
    // }
  }

  private login(usuario: string, pwd: string) {
    this.getUsuario(usuario,pwd);
    this.processing  = true;

    this.router.navigate(['home']);

  }


}
