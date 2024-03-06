import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Cargos } from 'src/app/interfaces/cargos';
import { Empleado } from 'src/app/interfaces/empleado';
import { CargosService } from 'src/app/services/cargos.service';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class EmpleadosComponent implements OnInit{

  empleadosList: Empleado[] = [];

  page:number = 1;
  size:number = 5;
  sortBy:string = 'id';
  direction:string = 'DESC';
  totalregistros : number = 0;
  totalPages: number = 0;
  paginaActual: number = 0;
  registrosPorPagina: number = 0;
  items: MenuItem[] = [];

  formFiltros: FormGroup;

  formEmpleado: FormGroup;

  visibleCrearEmpleado: boolean = false;

  cargosList: Cargos[] = [];

  selectedCargo: any;

  stateOptions: any[] = [{label: 'Activo', value: true}, {label: 'Inactivo', value: false}];

  value: string = 'off';

  esActualizacion = false;

  idEmpleadoActualizar : number | undefined;

  constructor( private empleadosService: EmpleadosService, private fb: FormBuilder, private cargosService: CargosService,private messageService: MessageService,private confirmationService: ConfirmationService){

    this.formFiltros = this.fb.group({
      nombre: [''],
      apellidoPaterno: [''],
      apellidoMaterno: [''],
      cargo: [''],
      id: [''],
      edad: [''],
      fechaNacimiento: ['']
    });

    this.formEmpleado = this.fb.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      edad: [0, Validators.required], // Puedes agregar otras validaciones según tus necesidades
      cargoId: [null, Validators.required]
    });

  }

  ngOnInit(): void {

    this.getEmpleados();
    this.getCatalogoCargos();
  };

  getCatalogoCargos(){
    this.cargosService.getCatalogoCargosList(this.sortBy,this.direction).subscribe((respusta:any)=>{
      console.log('catalogo cargos=',respusta);
      this.cargosList = respusta.datos;
    })
  }

  filtrar(){
    console.log(this.formFiltros.value);
    this.getEmpleados(this.formFiltros.value);
  }

  actualizarEmpleado(empleado: Empleado){
    this.esActualizacion = true; // Indica que la acción es una actualización
    this.visibleCrearEmpleado = true;
    console.log(empleado);
    this.formEmpleado.patchValue(empleado);
    this.idEmpleadoActualizar = empleado.id;
  }

  eliminarEmpleado(event:Event,empleado: Empleado){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Desea eliminar al empleado: ${empleado.nombre}?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.empleadosService.eliminarEmpleadoBd(empleado).subscribe((respuesta:any)=>{
            this.messageService.add({ severity: 'info', summary: 'Eliminado', detail: 'Empleado eliminado con exito', life: 3000 });
            this.getEmpleados();
          }, error=>{
            this.messageService.add({ severity: 'error', summary: 'Empleado', detail: 'Error al eliminar empleado', life: 3000 });
          })
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Empleado', detail: 'Se cancelo la operacion', life: 3000 });
      }
  });
  };

  getEmpleados(filtros?:any){
    this.empleadosService.listarEmpleadosPage(this.size, this.page, this.sortBy, this.direction, filtros).subscribe((respuesta:any)=>{
      console.log(respuesta)
      this.empleadosList = respuesta.datos;
      this.totalregistros = respuesta.totalRegistros;
      this.totalPages = respuesta.totalPaginas;
      this.paginaActual = respuesta.paginaActual;
      this.registrosPorPagina = respuesta.registrosPorPagina;
    })
  }

  next() {
    this.page++;
    this.getEmpleados(); // Fetch data for next page
  }

  prev() {
    if (this.page > 1) {
      this.page--;
      this.getEmpleados(); // Fetch data for previous page
    }
  }

  reset() {
      this.page = 1;
      this.getEmpleados();
  }

  pageChange(event:any) {
    this.page = event.page + 1;
    this.size = event.rows;

    this.getEmpleados();
    
  }

  isLastPage(): boolean {
    return this.empleadosList ? this.page === this.totalPages : true;
  }

  isFirstPage(): boolean {
    return this.empleadosList ? this.page === 1 : true;
  }

  save(severity: string) {
    console.log(severity);
  }

  crearEmpleado(){
    this.esActualizacion = false; // Indica que la acción es una creación
    this.visibleCrearEmpleado = true;
  };

  guardarEmpleado(){
    let cargo = this.formEmpleado?.get('cargoId')?.value;

    if (this.esActualizacion) {

      if(cargo.id){
        cargo = cargo.id;
      }
      const dataEnviar:any = {
        nombre:  this.formEmpleado?.get('nombre')?.value,
        apellidoPaterno: this.formEmpleado?.get('apellidoPaterno')?.value,
        apellidoMaterno: this.formEmpleado?.get('apellidoMaterno')?.value,
        fechaNacimiento: this.formEmpleado?.get('fechaNacimiento')?.value,
        edad: this.formEmpleado?.get('edad')?.value,
        cargoId: cargo
      };

      console.log('data en actualizar:',dataEnviar)
      this.empleadosService.actualizarEmpleado(dataEnviar, this.idEmpleadoActualizar).subscribe((respuesta:any)=>{
        this.visibleCrearEmpleado = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Empleado actualizado' });
        this.getEmpleados();
        this.formEmpleado.reset();
      }, error=>{
        this.formEmpleado.reset();
        this.messageService.add({ severity: 'warn', summary: 'warn', detail: 'Error al actualizar empleado' });
      })
    }else{
      console.log(this.formEmpleado.value);
      console.log('cargo',cargo);
      const dataEnviar:any = {
        nombre:  this.formEmpleado?.get('nombre')?.value,
        apellidoPaterno: this.formEmpleado?.get('apellidoPaterno')?.value,
        apellidoMaterno: this.formEmpleado?.get('apellidoMaterno')?.value,
        fechaNacimiento: this.formEmpleado?.get('fechaNacimiento')?.value,
        edad: this.formEmpleado?.get('edad')?.value,
        cargoId: cargo.id
      };

      console.log('data a guardar:', dataEnviar);

      this.empleadosService.crearEmpleado(dataEnviar).subscribe((respuesta:Empleado)=>{
        console.log('repsuesta empleado:', respuesta);
        this.visibleCrearEmpleado = false;
        this.getEmpleados();
        this.formEmpleado.reset();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Empleado Creado' });
      },error=>{
        console.log('error al crear empleado:', error);
        this.visibleCrearEmpleado = false;
        this.formEmpleado.reset();
        this.messageService.add({ severity: 'warn', summary: 'warn', detail: 'Error al crear Empleado' });
      });
    }
  };

  cambiarEstado(estado: boolean, empleado:Empleado){

    empleado.estado = estado;

    this.empleadosService.actualizarEmpleado(empleado).subscribe((respuesta:Empleado)=>{
      console.log(respuesta);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Estado Cambiado' });
    }, error=>{
      this.messageService.add({ severity: 'warn', summary: 'warn', detail: 'Error al cambiar estado' });
    })
  }

}
