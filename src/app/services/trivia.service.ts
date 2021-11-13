import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quiz } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class TriviaService {
  questions:Quiz[]
  constructor(private http:HttpClient) { }

   private  ejecutarQuery<T>(query :string){
    return  this.http.get<T>(query)
  }
  
 async getCategory( category:string ) {
    if(category !='')
    return  await this.ejecutarQuery<Quiz[]>(`https://api.trivia.willfry.co.uk/questions?categories=${category}&limit=20`).toPromise();
  }
}
