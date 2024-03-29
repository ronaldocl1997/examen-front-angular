import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.items = [
            {
                label: 'Empleados',
                icon: 'pi pi-fw pi-users',
                routerLink: 'empleados'
            }
        ];
  };

}
