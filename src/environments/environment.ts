// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBbtDwGpL-6kaWzkbN50nTa-JKyqrWsTMs',
    authDomain: 'ng-fitness-tracker-4d96a.firebaseapp.com',
    databaseURL: 'https://ng-fitness-tracker-4d96a.firebaseio.com',
    projectId: 'ng-fitness-tracker-4d96a',
    storageBucket: 'ng-fitness-tracker-4d96a.appspot.com',
    messagingSenderId: '842071502459'
  }
};
