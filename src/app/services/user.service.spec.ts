import { TestBed, getTestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../model/user.interface';

describe('UserService', () => {
  let service: UserService
  //tambien podriamos utilizar el inject()
  let injector: TestBed
  //simulamos solicitudes http
  let httpMock: HttpTestingController
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(UserService);
    //Tener acceso a las variables limpias antes de cada it()
    injector = getTestBed()
    //la linea de abajo esta deprecated
    //httpMock = injector.get(HttpTestingController)
    httpMock = injector.inject(HttpTestingController);
  });
  afterEach( () => {
    //verficamos que no haya solicitudes pendientes
    httpMock.verify()
  })

  it('Debe ser creado', () => {
    expect(service).toBeTruthy();
  });
  it('Debe retornar un obserbavle<User[]>', () => {
    //instanciamos nuestro servicio, hay dos formas
    //const service:UserService = new UserService()
    const service:UserService = TestBed.inject(UserService)
    //simulamos respuesta
    let mockUser: User[] = [
      {
        login: "mojombo",
        id: 1,
        node_id: "MDQ6VXNlcjE=",
        avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/mojombo",
        html_url: "https://github.com/mojombo",
        followers_url: "https://api.github.com/users/mojombo/followers",
        following_url: "https://api.github.com/users/mojombo/following{/other_user}",
        gists_url: "https://api.github.com/users/mojombo/gists{/gist_id}",
        starred_url: "https://api.github.com/users/mojombo/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/mojombo/subscriptions",
        organizations_url: "https://api.github.com/users/mojombo/orgs",
        repos_url: "https://api.github.com/users/mojombo/repos",
        events_url: "https://api.github.com/users/mojombo/events{/privacy}",
        received_events_url: "https://api.github.com/users/mojombo/received_events",
        type: "User",
        site_admin: false
      },
      {
        login: "defunkt",
        id: 2,
        node_id: "MDQ6VXNlcjI=",
        avatar_url: "https://avatars.githubusercontent.com/u/2?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/defunkt",
        html_url: "https://github.com/defunkt",
        followers_url: "https://api.github.com/users/defunkt/followers",
        following_url: "https://api.github.com/users/defunkt/following{/other_user}",
        gists_url: "https://api.github.com/users/defunkt/gists{/gist_id}",
        starred_url: "https://api.github.com/users/defunkt/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/defunkt/subscriptions",
        organizations_url: "https://api.github.com/users/defunkt/orgs",
        repos_url: "https://api.github.com/users/defunkt/repos",
        events_url: "https://api.github.com/users/defunkt/events{/privacy}",
        received_events_url: "https://api.github.com/users/defunkt/received_events",
        type: "User",
        site_admin: false
      }
    ]
    service.getAll().subscribe( (users) => {
      expect(users.length).toBe(2)
      expect(users).toEqual(mockUser)
      expect(users[0].login).toBeDefined()
    })
    //Validamos la url de nuestra API
    const req = httpMock.expectOne('https://api.github.com/users')
    expect(req.request.method).toBe('GET') //Validamos que sea un metodo GET
    req.flush(mockUser) //Proporciona valores ficticios como respuesta de nuestras peticiones
  })
});
