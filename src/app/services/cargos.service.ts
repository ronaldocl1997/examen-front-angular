import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";
import {HttpClient, HttpParams, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import { Empleado } from "../interfaces/empleado";

@Injectable({
    providedIn: 'root'
})

export class CargosService {

    endpoint: string = environment.URL + "catalogo-cargos";

    constructor(private http: HttpClient, private router: Router) {
    };

    getCatalogoCargosList(sortBy: string, direcction: string){

        const params = new HttpParams()
        .set("sortBy", sortBy)
        .set("direction", direcction)

        return this.http.get<any>(`${this.endpoint}/list`, {
            params: params,
          });
    }

}

