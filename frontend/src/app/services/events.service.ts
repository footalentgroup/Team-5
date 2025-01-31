import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private httpClient: HttpClient) { }
  url: string = "https://respawn-events-t5.vercel.app/api/events/create"

  createEvent(data: FormData){
    return this.httpClient.post(this.url, data)
  }

  
}
