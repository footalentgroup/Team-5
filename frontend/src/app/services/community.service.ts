import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor() { }

  httpClient = inject(HttpClient);

  API_URL = "http://localhost:6000/"

// Obtener comunidades 
getCommunity(){
  return this.httpClient.get(`${this.API_URL}getCommunity`)
}

// Crear crear
createCommunity(coverPhoto:string,name:string,description:string,  type:string,interests: string, rules:string, socialLinks:string, createdBy: string, subscribers: string, ){
  const dateCommunity = {
    coverPhoto:coverPhoto,
    name:name,
    description:description,
    type: type,
    interests:interests,
    rules:rules,
    socialLinks:socialLinks,
    createdBy: createdBy,
    subscribers:subscribers
  }

  return  this.httpClient.post(`${this.API_URL}createCommunity`,dateCommunity)
}

}
