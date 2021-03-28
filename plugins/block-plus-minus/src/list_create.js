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
import {plusMinusMutator} from './mutator_template';

/* eslint-disable quotes */
Blockly.defineBlocksWithJsonArray([
  {
    "type": "lists_create_with",
    "message0": "%{BKY_LISTS_CREATE_EMPTY_TITLE} %1",
    "args0": [
      {
        "type": "input_dummy",
        "name": "EMPTY",
      },
    ],
    "output": "Array",
    "style": "list_blocks",
    "helpUrl": "%{BKY_LISTS_CREATE_WITH_HELPURL}",
    "tooltip": "%{BKY_LISTS_CREATE_WITH_TOOLTIP}",
    "mutator": "new_list_create_with_mutator",
  },
]);
/* eslint-enable quotes */

const listCreateMutator = {
  ...plusMinusMutator,

  /**
   * Label displayed when empty.
   * @type {string}
   */
  MSG_EMPTY_: Blockly.Msg['LISTS_CREATE_EMPTY_TITLE'],
  /**
   * Label displayed when not empty.
   * @type {string}
   */
  MSG_ITEM_: Blockly.Msg['LISTS_CREATE_WITH_INPUT_WITH'],
};

/**
 * Updates the shape of the block to have 3 inputs if no mutation is provided.
 * @this Blockly.Block
 */
const listCreateHelper = function() {
  this.getInput('EMPTY').insertFieldAt(0, createPlusField(), 'PLUS');
  this.updateShape_(3);
};

Blockly.Extensions.registerMutator('new_list_create_with_mutator',
    listCreateMutator, listCreateHelper);
