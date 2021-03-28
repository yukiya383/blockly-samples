/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Changes the text_join block to use a +/- mutator UI.
 */

import Blockly from 'blockly/core';
import {createPlusField} from './field_plus';
import {plusMinusMutator} from './mutator_template';

const textJoinMutator = {
  ...plusMinusMutator,
  /**
   * Label displayed when not empty.
   * @type {string}
   */
  MSG_ITEM_: Blockly.Msg['TEXT_JOIN_TITLE_CREATEWITH'],

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
          .appendField(this.newQuote_(true))
          .appendField(this.newQuote_(false));
    }
  },
};

/**
 * Adds the quotes mixin to the block. Also updates the shape so that if no
 * mutator is provided the block has two inputs.
 * @this Blockly.Block
 */
const textJoinHelper = function() {
  this.mixin(Blockly.Constants.Text.QUOTE_IMAGE_MIXIN);
  this.updateShape_(2);
};

Blockly.Extensions.unregister('text_join_mutator');
Blockly.Extensions.registerMutator('text_join_mutator',
    textJoinMutator, textJoinHelper);
