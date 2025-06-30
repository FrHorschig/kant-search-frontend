# KantSearchFrontend

This is the Angular frontend of the kant-search project for reading and searching the works of Immanuel Kant.

## Contributing

If you want to improve this codebase or add a feature, feel free to open a pull request.

## Installation

Please refer to the [parent project](https://github.com/FrHorschig/kant-search).

## Development

### Development setup

Refer to the [parent project](https://github.com/FrHorschig/kant-search) for a general overview and scripts for helping with the development setup, including a script to start the frontend locally together with the backend and the database.

### Coding patterns

#### Container and presentational components

We differentiate between presentational components and container components. Presentational components are concerned with the presentation of the data, they communicate with other parts of the application only through `@Input()` and `@Output()` decorators. Container components on the other hand arrange the presentational components and pass data to them. See [this blog entry](https://blog.angular-university.io/angular-2-smart-components-vs-presentation-components-whats-the-difference-when-to-use-each-and-why/) for a more detailed explanation of this topic.

#### NgRx component-store

This project makes heavy use of the NgRx [component-store](https://ngrx.io/guide/component-store) which in turn implements the [Redux pattern](https://redux.js.org/tutorials/fundamentals/part-7-standard-patterns).

A component store is a Redux store that is responsible for one specific purpose, often the fetching of data for a container component. It takes the responsibility of state management from the associated component, so that the container component is only concerned with the arrangement of presentational components.

Local stores are annotated with the `@Injectable()` decorator, they are injected into specific components and are bound to the components lifetime. Global stores on the other hand are not associated with one specific component but are responsible for one specific type of data, e.g. there is a store for the selected language. These global stores are annotated with `@Injectable({ providedIn: 'root' })` decorator, they exist as long as the application exists. They are usually accessed by other local or global stores.

### Testing
Components are tested as usual. In the component store tests however we only test synchronous code, because setting up asynchronous tests is complicated. To achieve this, have as much code as possible in synchronous private methods and only test this synchronous code. The asynchronous code is tested through (currently manual) e2e tests. To help with this you can use the text xml files in the [parent repository](https://github.com/FrHorschig/kant-search/e2e-tests).
