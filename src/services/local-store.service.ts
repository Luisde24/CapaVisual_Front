import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStoreService {

  constructor() { }
 
  SetLocalStorange(key: string, data: any) 
  {
    try {
      sessionStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.log(e);
    }
  }

  GetLocalStorange(key: string) 
  {
    try {
      // return JSON.parse(sessionStorage.getItem(key));
    } catch (e) {
      console.log(e);
    }
  }

  EliminarSessionStorange()
  {
    sessionStorage.clear();
  }

    RemoverLocalStorange(key: string): void 
    {
        try {
          sessionStorage.removeItem(key);
        } catch (e) {
          console.error('Errore a remover el storange', e);
        }
    }

}
