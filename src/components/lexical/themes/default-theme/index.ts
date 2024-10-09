/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { EditorThemeClasses } from 'lexical';

import './default-theme.css';

export const defaultTheme: EditorThemeClasses = {
  autocomplete: 'default-theme__autocomplete',
  blockCursor: 'default-theme__blockCursor',
  characterLimit: 'default-theme__characterLimit',
  code: 'default-theme__code',
  codeHighlight: {
    atrule: 'default-theme__tokenAttr',
    attr: 'default-theme__tokenAttr',
    boolean: 'default-theme__tokenProperty',
    builtin: 'default-theme__tokenSelector',
    cdata: 'default-theme__tokenComment',
    char: 'default-theme__tokenSelector',
    class: 'default-theme__tokenFunction',
    'class-name': 'default-theme__tokenFunction',
    comment: 'default-theme__tokenComment',
    constant: 'default-theme__tokenProperty',
    deleted: 'default-theme__tokenProperty',
    doctype: 'default-theme__tokenComment',
    entity: 'default-theme__tokenOperator',
    function: 'default-theme__tokenFunction',
    important: 'default-theme__tokenVariable',
    inserted: 'default-theme__tokenSelector',
    keyword: 'default-theme__tokenAttr',
    namespace: 'default-theme__tokenVariable',
    number: 'default-theme__tokenProperty',
    operator: 'default-theme__tokenOperator',
    prolog: 'default-theme__tokenComment',
    property: 'default-theme__tokenProperty',
    punctuation: 'default-theme__tokenPunctuation',
    regex: 'default-theme__tokenVariable',
    selector: 'default-theme__tokenSelector',
    string: 'default-theme__tokenSelector',
    symbol: 'default-theme__tokenProperty',
    tag: 'default-theme__tokenProperty',
    url: 'default-theme__tokenOperator',
    variable: 'default-theme__tokenVariable',
  },
  embedBlock: {
    base: 'default-theme__embedBlock',
    focus: 'default-theme__embedBlockFocus',
  },
  hashtag: 'default-theme__hashtag',
  heading: {
    h1: 'default-theme__h1',
    h2: 'default-theme__h2',
    h3: 'default-theme__h3',
    h4: 'default-theme__h4',
    h5: 'default-theme__h5',
    h6: 'default-theme__h6',
  },
  hr: 'default-theme__hr',
  image: 'lexical-image',
  indent: 'default-theme__indent',
  inlineImage: 'inline-lexical-image',
  layoutContainer: 'default-theme__layoutContainer',
  layoutItem: 'default-theme__layoutItem',
  link: 'default-theme__link',
  list: {
    checklist: 'default-theme__checklist',
    listitem: 'default-theme__listItem',
    listitemChecked: 'default-theme__listItemChecked',
    listitemUnchecked: 'default-theme__listItemUnchecked',
    nested: {
      listitem: 'default-theme__nestedListItem',
    },
    olDepth: [
      'default-theme__ol1',
      'default-theme__ol2',
      'default-theme__ol3',
      'default-theme__ol4',
      'default-theme__ol5',
    ],
    ul: 'default-theme__ul',
  },
  ltr: 'default-theme__ltr',
  mark: 'default-theme__mark',
  markOverlap: 'default-theme__markOverlap',
  paragraph: 'default-theme__paragraph',
  quote: 'default-theme__quote',
  rtl: 'default-theme__rtl',
  table: 'default-theme__table',
  tableAddColumns: 'default-theme__tableAddColumns',
  tableAddRows: 'default-theme__tableAddRows',
  tableCell: 'default-theme__tableCell',
  tableCellActionButton: 'default-theme__tableCellActionButton',
  tableCellActionButtonContainer:
    'default-theme__tableCellActionButtonContainer',
  tableCellEditing: 'default-theme__tableCellEditing',
  tableCellHeader: 'default-theme__tableCellHeader',
  tableCellPrimarySelected: 'default-theme__tableCellPrimarySelected',
  tableCellResizer: 'default-theme__tableCellResizer',
  tableCellSelected: 'default-theme__tableCellSelected',
  tableCellSortedIndicator: 'default-theme__tableCellSortedIndicator',
  tableResizeRuler: 'default-theme__tableCellResizeRuler',
  tableSelected: 'default-theme__tableSelected',
  tableSelection: 'default-theme__tableSelection',
  text: {
    bold: 'default-theme__textBold',
    code: 'default-theme__textCode',
    italic: 'default-theme__textItalic',
    strikethrough: 'default-theme__textStrikethrough',
    subscript: 'default-theme__textSubscript',
    superscript: 'default-theme__textSuperscript',
    underline: 'default-theme__textUnderline',
    underlineStrikethrough: 'default-theme__textUnderlineStrikethrough',
  },
};