import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';
import { Cidades, EstadoCivil, Estados, Users } from 'src/app/models/users.model';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})

export class ManagementComponent implements OnInit {

  estados: Estados[] = [];
  cidades: Cidades[] = [];
  estadoCivil: EstadoCivil[] = [];
  selectedEstado: string | any;
  selectedCidade: string | any;
  isEdit: boolean = false;
  breakpoint: number = 5;

  form: FormGroup;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Users,
    private dialogRef: MatDialogRef<ManagementComponent>,
    private _http: HttpClient,
    private _usersService: UsersService,
    public _fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.form = this._fb.group({
      id: [null],
      nome: [null, Validators.required],
      usuario: [null],
      senha: [null],
      cpf: [null],
      profissao: [null],
      dataNascimento: [null],
      estadoCivil: [null],
      cidade: [null],
      uf: [null]
    });
  }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 5;
    this.getEstados();
    this.getEstadoCivil();
    console.log('Registro selecionado:', this.data);
    this.isEdit = (this.data) ? true : false;
    if (this.isEdit) {
      this.form.patchValue(this.data);
      this.setCidade(this.data.uf);
    }    
  }

  onSubmit(): void {
    if (this.isEdit) {
      this._usersService.updateUser(this.form.value).subscribe({
        next: _ => {          
          this.openSnackBar('Usuário alterado com sucesso!', 'Fechar');
          this.dialogRef.close();
        }, 
        error: _ => {          
          Swal.fire('Erro!', 'Não foi possível editar o usuário.', 'error');
        }
      })
    } else {
      this._usersService.createUser(this.form.value).subscribe({
        next: _ => {
          this.openSnackBar('Usuário alterado com sucesso!', 'Fechar');
          this.dialogRef.close();
        }, 
        error: _ => {
          Swal.fire('Erro!', 'Não foi possível criar o usuário.', 'error');
        }
      })
    }
  }

  getEstados(uf?: string): void {
    this._usersService.getEstados().subscribe(estados => this.estados = estados);
  }
  
  setCidade(estado: string): void {
    this._usersService.getCidades().subscribe(cidades => this.cidades = cidades.filter(cidade => cidade.sigla === estado));    
  }
  
  getEstadoCivil(): void {
    this._usersService.getEstadoCivil().subscribe(civil => this.estadoCivil = civil);
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 6;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 4000 });
  }
}
