import { NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { AccordionModule } from 'primeng/accordion';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [],
  exports: [
    MenubarModule,
    FieldsetModule,
    PanelModule,
    TableModule,
    SplitButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    AccordionModule,
    CalendarModule,
    InputTextModule,
    DialogModule
  ]
})
export class PrimeNgModule { }
