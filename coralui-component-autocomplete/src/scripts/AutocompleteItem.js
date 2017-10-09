/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2017 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 */

import Component from 'coralui-mixin-component';
import {transform} from 'coralui-util';

/**
 @class Coral.Autocomplete.Item
 @classdesc The Autocomplete Item
 @htmltag coral-autocomplete-item
 @extends HTMLElement
 @extends Coral.mixin.component
 */
class AutocompleteItem extends Component(HTMLElement) {
  constructor() {
    super();
  
    this._observer = new MutationObserver(this._handleMutation.bind(this));
    this._observer.observe(this, {
      characterData: true,
      childList: true,
      subtree: true
    });
  }
  
  /**
   Value of the item. <code>textContent</code> is used if not provided.
   
   @type {String}
   @default ""
   @htmlattribute value
   @htmlattributereflected
   @memberof Coral.Autocomplete.Item#
   */
  get value() {
    // keep spaces to only 1 max and trim to mimic native select option behavior
    return typeof this._value === 'undefined' ? this.textContent.replace(/\s{2,}/g, ' ').trim() : this._value;
  }
  set value(value) {
    this._value = transform.string(value);
    this._reflectAttribute('value', this._value);
    
    this.trigger('coral-autocomplete-item:_valuechanged');
  }
  
  /**
   The content zone element of the item.
   
   @type {HTMLElement}
   @contentzone
   @memberof Coral.Autocomplete.Item#
   */
  get content() {
    return this;
  }
  set content(value) {
    // Support configs
    if (typeof value === 'object') {
      for (const prop in value) {
        this[prop] = value[prop];
      }
    }
  }
  
  /**
   Whether this item is selected.
   
   @type {Boolean}
   @default false
   @htmlattribute selected
   @htmlattributereflected
   @memberof Coral.Autocomplete.Item#
   */
  get selected() {
    return this._selected || false;
  }
  set selected(value) {
    this._selected = transform.booleanAttr(value);
    this._reflectAttribute('selected', this._selected);
    
    this.trigger('coral-autocomplete-item:_selectedchanged');
  }
  
  /**
   Whether this item is disabled.
   
   @type {Boolean}
   @default false
   @htmlattribute disabled
   @htmlattributereflected
   @memberof Coral.Autocomplete.Item#
   */
  get disabled() {
    return this._disabled || false;
  }
  set disabled(value) {
    this._disabled = transform.booleanAttr(value);
    this._reflectAttribute('disabled', this._disabled);
  }
  
  /** @private */
  _handleMutation() {
    this.trigger('coral-autocomplete-item:_contentchanged', {
      content: this.textContent
    });
  }
  
  static get observedAttributes() {
    return ['selected', 'disabled', 'value'];
  }
}

export default AutocompleteItem;