import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";
import {HttpClient, HttpParams, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import { Empleado } from "../interfaces/empleado";

@Injectable({
    providedIn: 'root'
})

export class EmpleadosService {

    endpoint: string = environment.URL + "empleados";

    constructor(private http: HttpClient, private router: Router) {
    };

    listarEmpleadosPage(size:number, page:number, sortBy: string, direction: string, filtros:any){

        // Filtra los campos de filtros que no son cadena vacía
        const filtrosNoVacios = Object.fromEntries(
            Object.entries(filtros || {}).filter(([_, value]) => value !== '')
        );

        console.log('filtros en servicio empleados=',filtros)
        const data = {
            size: size,
            page: page,
            sortBy: sortBy,
            direction: direction,
            ...filtrosNoVacios
        };

        console.log("data", data)
        return this.http.post<any[]>(this.endpoint+"/page",data);

    };

    crearEmpleado(data:Empleado){
        return this.http.post<Empleado>(this.endpoint,data);
    };

    actualizarEmpleado(data:Empleado, idEmpleadoActualizar?:number){
        
        if(idEmpleadoActualizar){
            data.id = idEmpleadoActualizar
        };
        return this.http.put<Empleado>(this.endpoint+`/${data?.id}`,data);
    };

    eliminarEmpleadoBd(data:Empleado){
        return this.http.delete<Empleado>(this.endpoint+`/bd/${data?.id}`);
    }

}

