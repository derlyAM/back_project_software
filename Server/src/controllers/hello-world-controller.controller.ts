import {get} from '@loopback/rest';

export class HelloWorldController {
  constructor() {}

  @get('/hello')
  hello(): string {
    return 'Hello World!';
  }
}