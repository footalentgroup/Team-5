import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor() { }

  httpClient = inject(HttpClient);

  API_URL = "http://localhost:6000/"

  // Obtener equipos
  getTeams(){
    return this.httpClient.get(`${this.API_URL}getTeams`)
  }

  // Crear Equipos
  createTeam(name:string,description: string,members: string, devices: string, instagram: string, coverPhoto: string, createBy: string){
    const dateTeam = {
      name:name,
      description:description,
      members:members,
      devices:devices,
      instagram:instagram,
      coverPhoto:coverPhoto,
      createBy:createBy
    }

    return  this.httpClient.post(`${this.API_URL}createTeam`,dateTeam)
  }

}
