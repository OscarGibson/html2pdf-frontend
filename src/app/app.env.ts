import { Injectable } from '@angular/core';

@Injectable()
export class EnvVar {
  constructor() {}
  hostName:string = 'http://127.0.0.1:8000';

  loginRegisterLinks = {
    'login': this.hostName + '/rest-auth/login',
    'register': this.hostName + '/rest-auth/registration',
    'loginByToken': this.hostName + '/rest-auth/user',
  }
  documentLinks = {
    'list': this.hostName + '/document/list/',
    'details': this.hostName + '/document/details/',
    'create': this.hostName + '/document/create/',
    'update': this.hostName + '/document/update/',
    'download': this.hostName + '/document/download/'
  }
  innerLinks = {
    'Home' : {
      'name' : 'Home',
      'path' : ''
    },
    'Create project': {
      'name' : 'Create project',
      'path' : 'create-project'
    }
  }
  menuCatalog = {
    'Home' : '',
    'Create project': 'create-project'
  }
  mainCatalog = {
    'login' : this.loginRegisterLinks,
    'document' : this.documentLinks,
    'innerLinks' : this.innerLinks,
    'menuCatalog' : this.menuCatalog
  }

  getLink(catalogName,LinkName) {
    return this.mainCatalog[catalogName][LinkName]
  }
  getLinkJson(catalogName,LinkName) {
    return this.mainCatalog[catalogName][LinkName] + '/?format=json'
  }
}
