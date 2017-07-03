const hostName:string = 'http://127.0.0.1:8000'

export const GlobalVariable = Object.freeze({
  loginRegisterLinks: {
    'login': hostName + '/rest-auth/login',
    'register': hostName + '/rest-auth/registration',
    'loginByToken': hostName + '/rest-auth/user',
  },
  documentLinks: {
    'list': hostName + '/document/list/',
    'details': hostName + '/document/details/',
    'create': hostName + '/document/create/',
    'update': hostName + '/document/update/',
    'download': hostName + '/document/download/'
  },
  innerLinks: {
    'Home' : {
      'name' : 'Home',
      'path' : ''
    },
    'CreateProject': {
      'name' : 'Create project',
      'path' : 'create-project'
    },
    'Auth': {
      'name' : 'Authorization',
      'path' : 'login'
    }
  },
  getJsonLink(name: string) {
    console.log('link:',this.loginRegisterLinks[name] + '/?format=json')
    return this.loginRegisterLinks[name] + '/?format=json'
  }

});
