import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { AppComponent } from './app.component';
import { User } from './model/user.interface';
import { UserService } from './services/user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
//UN espia se utilizan para probar que se llamen metodos
/*
  con x omitimos una prueba ejemplo:
  xdescribe
  xit('nombre_prueba',() => {})
*/
describe('AppComponent', () => {
  //beforeAll se ejecuta despues del describe 
  beforeAll( () => {
    console.log('Se ejecuta al inicar las pruebas')
  })
  afterAll( () => {
    console.log('Se ejecuta al final');
  })
  //Para no escribirlo en cada prueba
  let appComponent
  let servicio
  //beforeEach Se ejecuta antes de cada it
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers:[
        UserService,
        AppComponent
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    console.log('BeforeEach');
    appComponent = TestBed.inject(AppComponent);
    servicio = TestBed.inject(UserService)
  });
  //afterEach se ejecuta despues de cada it
  afterEach( () => {
    console.log('Finalizo el test')
  })

  it('Deberia crear un componente', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  //Creando nueva prueba
  it('El valor de myVar debe ser Hola Mundo', () => {
    //instancia de nuestro componente
    //const appComponent = new AppComponent();
    const valor = appComponent.myVar
    expect(valor).toEqual('Hola Mundo');
  })
  it('La variable saludo debe de contener Alfredo', () => {
    //const appComponent = new AppComponent();
    const value = appComponent.saludo
    expect(value).toContain('Alfredo');
  })
  //Verificamos si un numero es par
  it('Debe retornar true', () => {
    //const appComponent = new AppComponent();
    const result = appComponent.par(44)
    expect(result).toBeTruthy()
  })
  it('Debe llamar a userService y el metodo getAll() para obtener todos los usuarios', () => {
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
    //creamos el espia
    const users = spyOn(servicio, 'getAll').and.callFake( users => {
      //return Observable
      return of(mockUser)
    })
    appComponent.ngOnInit()
    expect(users).toHaveBeenCalled()
  })

});
