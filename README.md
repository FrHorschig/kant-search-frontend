# KantSearchFrontend

This is the Angular frontend for the kant-search project. The Angular application displays pages for reading, searching and uploading the works of Immanuel Kant.

## Contributing

If you want to improve this codebase or add a feature, feel free to open a pull request. Make sure to explain any deviation from existing code conventions.

## Installation

### Using Docker

- pull the newest container with `docker pull ghcr.io/frhorschig/kant-search-frontend`
- run the docker container with the appropriate environment variables:

```bash
docker run -d \
  -v /path/to/local/ssl/certificate:/etc/nginx/ssl/server.crt \
  -v /path/to/local/ssl/key:/etc/nginx/ssl/server.key \
  -p 4200:4200
  --name ks-gui \
  frhorschig/kant-search-frontend
```

The `/etc/nginx/ssl` directory inside the Docker container is used by the Nginx server, so make sure to use this path or adjust the Nginx configuration to match your own path.

### Using Nginx

- ensure that Nginx is installed on your system
- download the zipped dist files and unzip the dist files to a directory of your choice
- download the Nginx configuration file and adjust it if necessary
- start the Nginx server

## Development

### Development setup

Refer to the [parent project](https://github.com/FrHorschig/kant-search) for a general overview and scripts for helping with the development setup, including a script to start the frontend locally together with the backend and the database.

### Coding patterns

#### Container and presentational components

We differentiate between presentational components and container components. Presenational components are concerned with the presenation of the data, they communicate with other parts of the application only through `@Input()` and `@Output()` decorators. Container components on the other hand arrange the presentational components and pass data on to them. See [here](https://blog.angular-university.io/angular-2-smart-components-vs-presentation-components-whats-the-difference-when-to-use-each-and-why/) for a more detailed explanation of this topic.

#### NgRx component-store

This Angular project makes heavy use of the NgRx [component-store](https://ngrx.io/guide/component-store) which in turn implements a variation of the [Redux pattern](https://redux.js.org/tutorials/fundamentals/part-7-standard-patterns).

A component store is a Redux store that is bound to one specific component. This store takes the responsibility of state management from the associated container component, so that the only concern of this component is the arrangement of presentational components.

Local stores are annotated with the `@Injectable()` decorator, they are injected into specific components and are bound to the components lifetime. Global stores on the other hand are not associated with one specific component but are responsible for one specific type of data, e.g. there is a store for the selected language. These global stores are annotated with `@Injectable({ providedIn: 'root' })` decorator, they exist as long as the application exists. They are usually accessed by other local or global stores.
