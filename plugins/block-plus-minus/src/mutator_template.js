/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Changes the list_create block to use a +/- mutator UI.
 */

import Blockly from 'blockly/core';
import {createPlusField} from './field_plus';
import {createMinusField} from './field_minus';

export const plusMinusMutator = {
  /**
   * Number of item inputs the block has.
   * @type {number}
   */
  itemCount_: 0,

  /**
   * Label displayed when empty.
   * @type {string}
   */
  MSG_EMPTY_: '',
  /**
   * Label displayed when not empty.
   * @type {string}
   */
  MSG_ITEM_: '',

  /**
   * Input value's type.
   * @type {string|string[]|null}
   */
  VALUE_TYPE: null,

  /**
   * @type {Blockly.Input}
   * @private
   */
  topInput_: null,

  /**
   * Creates XML to represent number of inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  /**
   * Parses XML to restore the inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    const targetCount = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_(targetCount);
  },

  /**
   * Adds inputs to the block until it reaches the target number of inputs.
   * @param {number} targetCount The target number of inputs for the block.
   * @this Blockly.Block
   * @private
   */
  updateShape_: function(targetCount) {
    while (this.itemCount_ < targetCount) {
      this.addPart_();
    }
    while (this.itemCount_ > targetCount) {
      this.removePart_();
    }
    this.updateMinus_();
  },

  /**
   * Callback for the plus image. Adds an input to the end of the block and
   * updates the state of the minus.
   * @this Blockly.Block
   */
  plus: function() {
    this.addPart_();
    this.updateMinus_();
  },

  /**
   * Callback for the minus image. Removes an input from the end of the block
   * and updates the state of the minus.
   * @this Blockly.Block
   */
  minus: function() {
    if (this.itemCount_ == 0) {
      return;
    }
    this.removePart_();
    this.updateMinus_();
  },

  // To properly keep track of indices we have to increment before/after adding
  // the inputs, and decrement the opposite.
  // Because we want our first input to be ADD0 (not ADD1) we increment after.

  /**
   * Adds an input to the end of the block. If the block currently has no
   * inputs it updates the top 'EMPTY' input to receive a block.
   * @this Blockly.Block
   * @private
   */
  addPart_: function() {
    if (this.itemCount_ == 0) {
      if (this.getInput('EMPTY')) {
        this.removeInput('EMPTY');
      }
      this.topInput_ = this.appendValueInput('ADD' + this.itemCount_)
          .setCheck(this.VALUE_TYPE)
          .appendField(createPlusField(), 'PLUS')
          .appendField(this.MSG_ITEM_);
    } else {
      this.appendValueInput('ADD' + this.itemCount_)
          .setCheck(this.VALUE_TYPE);
    }
    this.itemCount_++;
  },

  /**
   * Removes an input from the end of the block. If we are removing the last
   * input this updates the block to have an 'EMPTY' top input.
   * @this Blockly.Block
   * @private
   */
  removePart_: function() {
    this.itemCount_--;
    this.removeInput('ADD' + this.itemCount_);
    if (this.itemCount_ == 0) {
      this.topInput_ = this.appendDummyInput('EMPTY')
          .appendField(createPlusField(), 'PLUS')
          .appendField(this.MSG_EMPTY_);
    }
  },

  /**
   * Makes it so the minus is visible iff there is an input available to remove.
   * @private
   */
  updateMinus_: function() {
    const minusField = this.getField('MINUS');
    if (!minusField && this.itemCount_ > 0) {
      this.topInput_.insertFieldAt(1, createMinusField(), 'MINUS');
    } else if (minusField && this.itemCount_ < 1) {
      this.topInput_.removeField('MINUS');
    }
  },
};
