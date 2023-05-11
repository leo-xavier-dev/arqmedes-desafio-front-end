import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Users } from 'src/app/models/users.model';
import { MyCustomPaginatorIntl } from 'src/app/services/pagination.service';
import { UsersService } from 'src/app/services/users.service';
import { DetailComponent } from './details/detail/detail.component';
import { ManagementComponent } from './details/management/management.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [{provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl}],
})
export class UsersComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'nome', 'usuario', 'actions'];
  dataSource: MatTableDataSource<Users>;
  users: Users[] | undefined;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger | any;

  constructor(
    private _usersService: UsersService,
    public dialog: MatDialog,
  ) { 
    this.dataSource = new MatTableDataSource(this.users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator || null;
    this.dataSource.sort = this.sort || null;
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this._usersService.getUsers().subscribe(user => {
      this.users = user;
      this.dataSource.data = this.users;
    });
  }

  detail(user: Users) {
    const dialogRef = this.dialog.open(DetailComponent,
      {
        data: user,
        restoreFocus: false, 
        width: '60%',
      });
    dialogRef.afterClosed().subscribe(() => {});
  }

  edit(user?: Users) {
    const dialogRef = this.dialog.open(ManagementComponent,
      {
        data: user,
        restoreFocus: false, 
        width: '60%',
      });
    dialogRef.afterClosed().subscribe(() => { this.getUsers() });
  }

  remove(user: Users) {
    Swal.fire({
      title: 'Deseja realmente excluir esse usuário?',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      denyButtonText: `Sair`,
    }).then((result) => {      
      if (result.isConfirmed) {
        this._usersService.deleteUser(user).subscribe({
          next: _ => {
            Swal.fire('Excluído!', 'O usuário foi excluído com sucesso.', 'success');
            this.getUsers();
          }, 
          error: _ => {            
            Swal.fire('Erro!', 'Não foi possível excluir o usuário.', 'error');
          }
        })
      } 
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
