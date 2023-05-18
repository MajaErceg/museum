import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered users
const usersKey = 'users-key-list12';
let users = JSON.parse(localStorage.getItem(usersKey)) || [];


const commentsKey = 'comments-key-list12';
let comments = JSON.parse(localStorage.getItem(commentsKey)) || [];

const ocenaKey = 'ratings-key-list12';
let oceneLista = JSON.parse(localStorage.getItem(ocenaKey)) || [];



@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return handleRoute();

        function handleRoute() {
            switch (true) {


                ///////////// USER ROUTES /////////////
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                case url.match(/\/users\/\d+$/) && method === 'PUT':
                    return updateUser();
                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                    return deleteUser();

                case url.match(/\/comments\/\d+$/) && method === 'DELETE':
                    return deleteKomentar();

                case url.endsWith('/komentari') && method === 'GET':
                    return getAllComments();


                ///////////// OBILAZAK ROUTES /////////////
                case url.match(/\/obilazakD\/\d+$/) && method === 'PUT':
                    return createNewObilazak();

                case url.match(/\/obilazakG\/\d+$/) && method === 'GET':
                    return getObilasci();

                case url.match(/\/obilazakBrisi\/\d+$/) && method === 'PUT':
                    return deleteObilazak();

                case url.match(/\/zavrsiObilazak\/\d+$/) && method === 'PUT':
                    return zavrsiObilazak();


                case url.match(/\/obilazakZ\/\d+$/) && method === 'GET':
                    return getObilasciZavrsen();

                case url.match(/\/obilazakT\/\d+$/) && method === 'GET':
                    return getObilasciTekuci();

                ///////////// IZLOZBA ROUTES /////////////
                case url.match(/\/obilazakA\/\d+$/) && method === 'PUT':
                    return addToObilazak();

                case url.match(/\/izlozbeG\/\d+$/) && method === 'PUT':
                    return getIzlozbe();

                case url.match(/\/izlozbaBrisi\/\d+$/) && method === 'PUT':
                    return deleteIzlozba();


                ///////////// FAVORITES ROUTES /////////////
                case url.match(/\/favoritesA\/\d+$/) && method === 'PUT':
                    return addToFavorites();

                case url.match(/\/favoritesG\/\d+$/) && method === 'GET':
                    return getFavorites();

                case url.match(/\/favoritesD\/\d+$/) && method === 'PUT':
                    return deleteFavorites();

                ///////////// COMMENTS ROUTES /////////////

                case url.endsWith('/napisiK') && method === 'POST':
                    return napisiKomentar();

                case url.match(/\/vratiK\/\d+$/) && method === 'GET':
                    return getKomentarByIzlozbaID();

                case url.endsWith('/ocenaP') && method === 'POST':
                    return pushOcena();

                case url.match(/\/ocenaG\/\d+$/) && method === 'GET':
                    return getOcenaByIzlozbaID();

                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions

        ///////////// USER FUNCTIONS /////////////

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                ...basicDetails(user),
                token: 'fake-jwt-token'
            })
        }

        function register() {
            const user = body

            if (users.find(x => x.username === user.username)) {
                return error('Username "' + user.username + '" is already taken')
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem(usersKey, JSON.stringify(users));
            return ok();
        }


        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users.map(x => basicDetails(x)));
        }


        function getUserById() {
            if (!isLoggedIn()) return unauthorized();

            const user = users.find(x => x.id === idFromUrl());
            return ok(basicDetails(user));
        }

        function updateUser() {
            if (!isLoggedIn()) return unauthorized();

            let params = body;
            let user = users.find(x => x.id === idFromUrl());

            // only update password if entered
            if (!params.password) {
                delete params.password;
            }

            // update and save user
            Object.assign(user, params);
            localStorage.setItem(usersKey, JSON.stringify(users));

            return ok();
        }

        function deleteUser() {
            if (!isLoggedIn()) return unauthorized();

            users = users.filter(x => x.id !== idFromUrl());
            localStorage.setItem(usersKey, JSON.stringify(users));
            return ok();
        }

        function deleteKomentar() {
            if (!isLoggedIn()) return unauthorized();

            comments = comments.filter(x => x.id !== idFromUrl());
            localStorage.setItem(commentsKey, JSON.stringify(comments));
            return ok();
        }


        ///////////// OBILAZAK FUNCTIONS /////////////

        function createNewObilazak() {
            if (!isLoggedIn()) return unauthorized();

            let obilazakk = body;
            let user = users.find(x => x.id === idFromUrl());

            let obilasci = user.obilazak;


            if (obilasci.find(x => x.naziv === obilazakk.naziv)) {
                return error('Obilazak :  "' + obilazakk.naziv + '" vec postoji')
            }

            obilazakk.id = obilasci.length ? Math.max(...obilasci.map(x => x.id)) + 1 : 1;

            obilazakk.status = "Tekuci obilazak";

            obilasci.push(obilazakk);

            localStorage.setItem(usersKey, JSON.stringify(users));

            return ok();
        }

        function getObilasci() {
            if (!isLoggedIn()) return unauthorized();
            const user = users.find(x => x.id === idFromUrl());

            const obilasci = user.obilazak;

            return ok(obilasci.map(
                (x: { id: any; naziv: any; izlozbe: any; status: any }) => basicDetailsObilazak(x)));
        }

        function deleteObilazak() {
            if (!isLoggedIn()) return unauthorized();

            let obilazakk = body;
            let user = users.find(x => x.id === idFromUrl());

            const removeIndex = user.obilazak.findIndex((item: { naziv: any; }) => item.naziv === obilazakk.naziv);

            user.obilazak.splice(removeIndex, 1);

            localStorage.setItem(usersKey, JSON.stringify(users));
            return ok();
        }

        function zavrsiObilazak() {
            if (!isLoggedIn()) return unauthorized();

            let obilazak = body;

            let user = users.find(x => x.id === idFromUrl());

            let obilasci = user.obilazak;

            let ima = obilasci.find(x => x.id === obilazak.id);
            if (!ima) {
                return error('Obilazak : "' + obilazak.naziv + '" ne postoji')
            }

            obilazak.id = obilazak.id;

            obilazak.naziv = obilazak.naziv;

            obilazak.izlozbe = obilazak.izlozbe;

            obilazak.status = "Zavrsen obilazak";

            obilasci.push(obilazak);

            return ok();
        }


        function getObilasciZavrsen() {
            if (!isLoggedIn()) return unauthorized();
            const user = users.find(x => x.id === idFromUrl());

            const obilasci = user.obilazak;

            const zavrsen = obilasci.filter(x => x.status === 'Zavrsen obilazak')

            return ok(zavrsen.map(
                (x: { id: any; naziv: any; izlozbe: any; status: any }) => basicDetailsObilazak(x)));
        }

        function getObilasciTekuci() {
            if (!isLoggedIn()) return unauthorized();
            const user = users.find(x => x.id === idFromUrl());

            const obilasci = user.obilazak;

            const tekuci = obilasci.filter(x => x.status === 'Tekuci obilazak')

            return ok(tekuci.map(
                (x: { id: any; naziv: any; izlozbe: any; status: any }) => basicDetailsObilazak(x)));
        }


        ///////////// IZLOZBE FUNCTIONS /////////////

        function addToObilazak() {
            if (!isLoggedIn()) return unauthorized();

            let obilazakID = body.params;

            let noviID = obilazakID.pop()

            let izlozba = body.drugi;

            let user = users.find(x => x.id === idFromUrl());

            let obilasci = user.obilazak;

            let nasPostojeciObilazak = obilasci.find(x => x.id === noviID)

            if (!nasPostojeciObilazak) {
                return error('Obilazak :  "' + noviID + '" ne postoji')
            }


            let daliImaIzlozba = nasPostojeciObilazak.izlozbe.find(x=> x.uq === izlozba.uq);

            console.log(daliImaIzlozba)
            console.log(izlozba.id);
            console.log(nasPostojeciObilazak.izlozbe.find(x=> x.uq === izlozba.uq))

            if(daliImaIzlozba){

                return error(" izlozba je vec dodata u obilazak : " + nasPostojeciObilazak.naziv + " !")
            }

            nasPostojeciObilazak.izlozbe.push(izlozba)
            localStorage.setItem(usersKey, JSON.stringify(users));

            return ok();
        }

        function getIzlozbe() {
            if (!isLoggedIn()) return unauthorized();

            const obilazakID = body

            const user = users.find(x => x.id === idFromUrl());

            const obilasci = user.obilazak;

            let jedanObilazak = obilasci.find(x => x.id === obilazakID);

            let izlozbe = jedanObilazak.izlozbe;

            return ok(izlozbe.map(
                (x: { id: any, uq: any, url: any, naziv: any, tip: any, eksponati: any, brEksponata: any, cena: any, vreme: any, link: any, ocena: any }) => basicDetailsIzlozba(x)));

        }

        function deleteIzlozba() {
            if (!isLoggedIn()) return unauthorized();
            let user = users.find(x => x.id === idFromUrl());

            let obilazakID = body.params;

            let izlozba = body.drugi;               // prosledimo objekat izlozbe koju brisemo 

            let obilasci = user.obilazak;

            let jedanObilazak = obilasci.find(x => x.id === obilazakID);

            let izlozbe = jedanObilazak.izlozbe;

            const removeIndex = izlozbe.findIndex((item: { naziv: any; }) => item.naziv === izlozba.naziv);

            izlozbe.splice(removeIndex, 1);

            localStorage.setItem(usersKey, JSON.stringify(users));
            return ok();
        }


        ///////////// FAVORITES FUNCTIONS /////////////

        function addToFavorites() {
            if (!isLoggedIn()) return unauthorized();

            let noviFavorit = body;

            let user = users.find(x => x.id === idFromUrl());

            let sviFavoriti = user.favorites;

            if (sviFavoriti.find(x => x.naziv === noviFavorit.naziv)) {
                return error('Eksponat "' + noviFavorit.naziv + '" je vec dodat u omiljene!')
            }

            noviFavorit.id = sviFavoriti.length ? Math.max(...sviFavoriti.map(x => x.id)) + 1 : 1;

            sviFavoriti.push(noviFavorit);

            localStorage.setItem(usersKey, JSON.stringify(users));

            return ok();
        }

        function getFavorites() {
            if (!isLoggedIn()) return unauthorized();
            const user = users.find(x => x.id === idFromUrl());

            const sviFavoriti = user.favorites;

            return ok(sviFavoriti.map(
                (x: { id: any, url: any, naziv: any, cena: any, vreme: any, zemljaPorekla: any, link: any, dostupno: any, omiljeni: any , imeIzlozbe: any}) => basicDetailsEksponat(x)));
        }

        function deleteFavorites() {

            if (!isLoggedIn()) return unauthorized();

            let user = users.find(x => x.id === idFromUrl());

            let prosledjenEksponat = body;

            const removeIndex = user.favorites.findIndex((item: { naziv: any; }) => item.naziv === prosledjenEksponat.naziv);

            user.favorites.splice(removeIndex, 1);

            localStorage.setItem(usersKey, JSON.stringify(users));

            return ok();
        }


        ///////////// oceni komentari FUNCTIONS /////////////

        function getAllComments() {
            if (!isLoggedIn()) return unauthorized();
            return ok(comments.map(x => basicDetailsKomentar(x)));
        }

        function getKomentarByIzlozbaID() {
            if (!isLoggedIn()) return unauthorized();       /// prosledjujemo id izlozbe i trazimo : 

            const id = idFromUrl().toString();

            const izlozba = comments.filter(x => x.idIzlozbe === id);    // nadji mi izlozbu iz KOMENTARA*global  ciji je id prosledjen

            return ok(izlozba.map((x: { id: any; tekst: any; idUser: any; idIzlozbe: any, imeUsera: any }) => basicDetailsKomentar(x)));
        }

        function napisiKomentar() {
            if (!isLoggedIn()) return unauthorized();

            const kom = body;         // nadjemo usera po id iz URL

            kom.id = comments.length ? Math.max(...comments.map(x => x.id)) + 1 : 1;     // napravimo ID komentara

            comments.push(kom);               // stavimo nas komentar u komentare globalne * svi ih vide 

            localStorage.setItem(commentsKey, JSON.stringify(comments))

            return ok();
        }


        function pushOcena() {
            if (!isLoggedIn()) return unauthorized();

            const occ = body;

            occ.stvarnaSV = occ.rating

            if (oceneLista.find(x => x.id === occ.id)) {

                var novaLista = oceneLista.filter((x => x.id === occ.id))

                novaLista.push(occ);

                var broj = 0;

                novaLista.forEach(element => {
                    broj += element.rating;

                });

                occ.stvarnaSV = broj / novaLista.length;

            }


            oceneLista.push(occ);

            localStorage.setItem(ocenaKey, JSON.stringify(oceneLista))

            console.log(oceneLista)

            return ok();
        }

        function getOcenaByIzlozbaID() {
            if (!isLoggedIn()) return unauthorized();       /// prosledjujemo id izlozbe i trazimo : 

            const id = idFromUrl().toString();

            const izlozbaOcena = oceneLista.filter(x => x.id === id);    // nadji mi izlozbu iz oceneLista*global  ciji je id prosledjen

            return ok(izlozbaOcena.map((x: { id: any; rating: any, stvarnaSV: any }) => basicDetailsOcena(x)));
        }



        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500)); // delay observable to simulate server api call
        }

        function error(message) {
            return throwError({ error: { message } })
                .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorized' } })
                .pipe(materialize(), delay(500), dematerialize());
        }

        function basicDetails(user) {
            const { id, username, firstName, lastName, email, phone,address, obilazak, favorites } = user;
            return { id, username, firstName, lastName, email, phone,address, obilazak, favorites };
        }

        function basicDetailsObilazak(obilazak) {
            const { id, naziv, izlozbe, status } = obilazak;
            return { id, naziv, izlozbe, status };
        }

        function basicDetailsIzlozba(izlozba) {
            const { id, uq, url, naziv, tip, eksponati, brEksponata, cena, vreme, link } = izlozba;
            return { id, uq, url, naziv, tip, eksponati, brEksponata, cena, vreme, link };
        }

        function basicDetailsEksponat(eksponat) {
            const { id, url, naziv, cena, vreme, zemljaPorekla, link, dostupno, omiljeni, imeIzlozbe } = eksponat;
            return { id, url, naziv, cena, vreme, zemljaPorekla, link, dostupno, omiljeni, imeIzlozbe };
        }

        function basicDetailsKomentar(kom) {
            const { id, tekst, idUser, idIzlozbe, imeUsera } = kom;
            return { id, tekst, idUser, idIzlozbe, imeUsera };
        }

        function basicDetailsOcena(ocena) {
            const { id, rating, stvarnaSV } = ocena;
            return { id, rating, stvarnaSV };
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};