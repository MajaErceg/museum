import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "@app/_models";
import { Komentar } from "@app/_models/komentar";
import { Ocena } from "@app/_models/ocena";
import { environment } from "@environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
  })
  export class PlanerService {

    private userSubject: BehaviorSubject<any>;
    public user: Observable<User>;

    constructor(private http: HttpClient) {

        this.userSubject = new BehaviorSubject<User>(JSON.parse(JSON.stringify(localStorage.getItem('user') || "")));
        this.user = this.userSubject.asObservable();
      }

      public get userValue(): User {
        return this.userSubject.value;
    
      }


          /////////////// OBILASCI ///////////////

    
    createNewObilazak(id: string, params) {
        return this.http.put(`${environment.apiUrl}/obilazakD/${id}`,params)
        .pipe(map(x => {
            // update stored user if the logged in user updated their own record
            if (id == this.userValue.id) {
                // update local storage
                const user = { ...this.userValue, ...params };
                localStorage.setItem('user', JSON.stringify(user));

                // publish updated user to subscribers
                this.userSubject.next(user);
            }
            return x;
        }));
    }

    addToObilazak(id: string, jedan: any , drugi : any) {
        return this.http.put(`${environment.apiUrl}/obilazakA/${id}`, {params : jedan, drugi })
        .pipe(map(x => {
            // update stored user if the logged in user updated their own record
            if (id == this.userValue.id) {
                // update local storage
                const user = { ...this.userValue, ... {params : jedan, drugi } };
                localStorage.setItem('user', JSON.stringify(user));

                // publish updated user to subscribers
                this.userSubject.next(user);
            }
            return x;
        }));
    }

    getObilazak(id: string) {
        return this.http.get<Array<Object>>(`${environment.apiUrl}/obilazakG/${id}`);
    }

    getObilazakZavrsen(id: string) {
      return this.http.get<Array<Object>>(`${environment.apiUrl}/obilazakZ/${id}`);
    }

    getObilazakTekuci(id: string) {
      return this.http.get<Array<Object>>(`${environment.apiUrl}/obilazakT/${id}`);
    }

    deleteObilazak(id: string, params) {
      return this.http.put(`${environment.apiUrl}/obilazakBrisi/${id}`,params)
      .pipe(map(x => {
          // update stored user if the logged in user updated their own record
          if (id == this.userValue.id) {
              // update local storage
              const user = { ...this.userValue, ...params };
              localStorage.setItem('user', JSON.stringify(user));

              // publish updated user to subscribers
              this.userSubject.next(user);
          }
          return x;
      }));
    }

    zavrsiObilazak(id: string, params){
      return this.http.put(`${environment.apiUrl}/zavrsiObilazak/${id}`, params)
      .pipe(map(x => {
          // update stored user if the logged in user updated their own record
          if (id == this.userValue.id) {
              // update local storage
              const user = { ...this.userValue, ... params};
              localStorage.setItem('user', JSON.stringify(user));

              // publish updated user to subscribers
              this.userSubject.next(user);
          }
          return x;
      }));
    }



        /////////////// IZLOZBE ///////////////


    getIzlozbe(id: string, params) {
      return this.http.put<Array<Object>>(`${environment.apiUrl}/izlozbeG/${id}`, params)
      .pipe(map(x => {
        // update stored user if the logged in user updated their own record
        if (id == this.userValue.id) {
            // update local storage
            const user = { ...this.userValue, ...params };
            localStorage.setItem('user', JSON.stringify(user));

            // publish updated user to subscribers
            this.userSubject.next(user);
        }
        return x;
    }));
    }

    deleteIzlozba(id: string,  jedan: any , drugi : any){
      return this.http.put(`${environment.apiUrl}/izlozbaBrisi/${id}`,{params : jedan, drugi })
      .pipe(map(x => {
          // update stored user if the logged in user updated their own record
          if (id == this.userValue.id) {
              // update local storage
              const user = { ...this.userValue, ...{params : jedan, drugi } };
              localStorage.setItem('user', JSON.stringify(user));

              // publish updated user to subscribers
              this.userSubject.next(user);
          }
          return x;
      }));

    }


        /////////////// OMILJENI ///////////////


    addToFavorites(id: string, params) {
      return this.http.put(`${environment.apiUrl}/favoritesA/${id}`, params)
      .pipe(map(x => {
          // update stored user if the logged in user updated their own record
          if (id == this.userValue.id) {
              // update local storage
              const user = { ...this.userValue, ... params};
              localStorage.setItem('user', JSON.stringify(user));

              // publish updated user to subscribers
              this.userSubject.next(user);
          }
          return x;
      }));
    }

    getFavorites(id: string) {
      return this.http.get<Array<Object>>(`${environment.apiUrl}/favoritesG/${id}`);
    }

    deleteFavorites(id: string, params) {
      return this.http.put(`${environment.apiUrl}/favoritesD/${id}`,params)
      .pipe(map(x => {
          // update stored user if the logged in user updated their own record
          if (id == this.userValue.id) {
              // update local storage
              const user = { ...this.userValue, ...params };
              localStorage.setItem('user', JSON.stringify(user));

              // publish updated user to subscribers
              this.userSubject.next(user);
          }
          return x;
      }));
    }
    


      /////////////// KOMENTARI ///////////////

    getKomentarByIzlozbaID(id: string) {
      return this.http.get<Array<Object>>(`${environment.apiUrl}/vratiK/${id}`);
    }

    napisiKomentar(kom: Komentar) {
      return this.http.post(`${environment.apiUrl}/napisiK`, kom);
    }

    deleteKomentar(id: string) {
      return this.http.delete(`${environment.apiUrl}/comments/${id}`)
          .pipe(map(x => {
              // auto logout if the logged in user deleted their own record
             
              return x;
          }));
    }

    getAllComments() {
      return this.http.get<Komentar[]>(`${environment.apiUrl}/komentari`);
    }

    pushOcena(OCC: Ocena){
      return this.http.post(`${environment.apiUrl}/ocenaP`, OCC);
    }

    getOcenaByIzlozbaID(id: string) {
      return this.http.get<Array<Object>>(`${environment.apiUrl}/ocenaG/${id}`);
    }

}