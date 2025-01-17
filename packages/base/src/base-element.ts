/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import {MDCFoundation} from '@material/base';
import {LitElement} from 'lit-element';

import {Constructor} from './utils.js';

export * from 'lit-element';
export {classMap} from 'lit-html/directives/class-map.js';
export {observer} from './observer.js';
export {addHasRemoveClass} from './utils.js';
export * from '@material/base/types.js';

export abstract class BaseElement extends LitElement {
  /**
   * Root element for MDC Foundation usage.
   *
   * Define in your component with the `@query` decorator
   */
  protected abstract mdcRoot: HTMLElement;

  /**
   * Return the foundation class for this component
   */
  protected abstract readonly mdcFoundationClass: Constructor<MDCFoundation>;

  /**
   * An instance of the MDC Foundation class to attach to the root element
   */
  protected abstract mdcFoundation: MDCFoundation;

  /**
   * Create the adapter for the `mdcFoundation`.
   *
   * Override and return an object with the Adapter's functions implemented:
   *
   *    {
   *      addClass: () => {},
   *      removeClass: () => {},
   *      ...
   *    }
   */
  protected abstract createAdapter(): {}

  /**
   * Create and attach the MDC Foundation to the instance
   */
  protected createFoundation() {
    if (this.mdcFoundation !== undefined) {
      this.mdcFoundation.destroy();
    }
    this.mdcFoundation = new this.mdcFoundationClass(this.createAdapter());
    this.mdcFoundation.init();
  }

  protected firstUpdated() {
    this.createFoundation();
  }
}
