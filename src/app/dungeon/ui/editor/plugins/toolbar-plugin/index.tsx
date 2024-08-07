'use client';

import { Button } from '@/components/ui/button';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { $isCodeNode, getDefaultCodeLanguage } from '@lexical/code';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { $isListNode, ListNode } from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $isHeadingNode } from '@lexical/rich-text';
import { $isParentElementRTL } from '@lexical/selection';
import {
  $findMatchingParent,
  $getNearestNodeOfType,
  mergeRegister,
} from '@lexical/utils';
import {
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  ElementFormatType,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  KEY_MODIFIER_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Italic,
  Link,
  Redo,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
  Undo,
} from 'lucide-react';
import { Dispatch, ReactNode, useCallback, useEffect, useReducer } from 'react';
import { getSelectedNode } from '../../utils/get-selected-node';
import { sanitizeUrl } from '../../utils/url';
import { BlockMenu } from './block-menu';
import { CodeMenu } from './code-menu';

const LowPriority = 1;
const NormalPriority = 2;

const initialState: {
  blockType: string;
  elementFormat: ElementFormatType;
  canUndo: boolean;
  canRedo: boolean;
  selectedElementKey: string;
  codeLanguage: string;
  isRTL: boolean;
  isLink: boolean;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isStrikethrough: boolean;
  isCode: boolean;
  isSubscript: boolean;
  isSuperscript: boolean;
} = {
  blockType: 'h1',
  elementFormat: 'left',
  canUndo: false,
  canRedo: false,
  selectedElementKey: '',
  codeLanguage: '',
  isRTL: false,
  isLink: false,
  isBold: false,
  isItalic: false,
  isUnderline: false,
  isStrikethrough: false,
  isCode: false,
  isSubscript: false,
  isSuperscript: false,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_CAN_UNDO':
      return { ...state, canUndo: action.payload };
    case 'SET_CAN_REDO':
      return { ...state, canRedo: action.payload };
    case 'SET_BLOCK_TYPE':
      return { ...state, blockType: action.payload };
    case 'SET_SELECTED_ELEMENT_KEY':
      return { ...state, selectedElementKey: action.payload };
    case 'SET_CODE_LANGUAGE':
      return { ...state, codeLanguage: action.payload };
    case 'SET_IS_RTL':
      return { ...state, isRTL: action.payload };
    case 'SET_IS_LINK':
      return { ...state, isLink: action.payload };
    case 'SET_IS_BOLD':
      return { ...state, isBold: action.payload };
    case 'SET_IS_ITALIC':
      return { ...state, isItalic: action.payload };
    case 'SET_IS_UNDERLINE':
      return { ...state, isUnderline: action.payload };
    case 'SET_IS_STRIKETHROUGH':
      return { ...state, isStrikethrough: action.payload };
    case 'SET_IS_CODE':
      return { ...state, isCode: action.payload };
    case 'SET_IS_SUBSCRIPT':
      return { ...state, isSubscript: action.payload };
    case 'SET_IS_SUPERSCRIPT':
      return { ...state, isSuperscript: action.payload };
    case 'SET_ELEMENT_FORMAT':
      return { ...state, elementFormat: action.payload };
    default:
      return state;
  }
};

export const ToolbarPlugin = (props: {
  setIsLinkEditMode: Dispatch<boolean>;
}): ReactNode => {
  const [editor] = useLexicalComposerContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  if (state.elementFormat === '') {
    dispatch({ type: 'SET_ELEMENT_FORMAT', payload: 'left' });
  }

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);
      if (elementDOM !== null) {
        dispatch({ type: 'SET_SELECTED_ELEMENT_KEY', payload: elementKey });
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();
          dispatch({ type: 'SET_BLOCK_TYPE', payload: type });
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          dispatch({ type: 'SET_BLOCK_TYPE', payload: type });
          if ($isCodeNode(element)) {
            dispatch({
              type: 'SET_CODE_LANGUAGE',
              payload: element.getLanguage() || getDefaultCodeLanguage(),
            });
          }
        }
      }
      // Update text format
      dispatch({ type: 'SET_IS_BOLD', payload: selection.hasFormat('bold') });
      dispatch({
        type: 'SET_IS_ITALIC',
        payload: selection.hasFormat('italic'),
      });
      dispatch({
        type: 'SET_IS_UNDERLINE',
        payload: selection.hasFormat('underline'),
      });
      dispatch({
        type: 'SET_IS_STRIKETHROUGH',
        payload: selection.hasFormat('strikethrough'),
      });
      dispatch({ type: 'SET_IS_CODE', payload: selection.hasFormat('code') });
      dispatch({
        type: 'SET_IS_SUBSCRIPT',
        payload: selection.hasFormat('subscript'),
      });
      dispatch({
        type: 'SET_IS_SUPERSCRIPT',
        payload: selection.hasFormat('superscript'),
      });

      dispatch({ type: 'SET_IS_RTL', payload: $isParentElementRTL(selection) });

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();

      if ($isLinkNode(parent) || $isLinkNode(node)) {
        dispatch({ type: 'SET_IS_LINK', payload: true });
      } else {
        dispatch({ type: 'SET_IS_LINK', payload: false });
      }

      // Element Format
      let matchingParent;
      if ($isLinkNode(parent)) {
        matchingParent = $findMatchingParent(
          node,
          (parentNode) => $isElementNode(parentNode) && !parentNode.isInline(),
        );
      }

      dispatch({
        type: 'SET_ELEMENT_FORMAT',
        payload: $isElementNode(matchingParent)
          ? matchingParent.getFormatType()
          : $isElementNode(node)
            ? node.getFormatType()
            : parent?.getFormatType() || 'left',
      });
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _) => {
          updateToolbar();
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          dispatch({ type: 'SET_CAN_UNDO', payload });
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          dispatch({ type: 'SET_CAN_REDO', payload });
          return false;
        },
        LowPriority,
      ),
    );
  }, [editor, updateToolbar]);

  useEffect(() => {
    return editor.registerCommand(
      KEY_MODIFIER_COMMAND,
      (payload) => {
        const event: KeyboardEvent = payload;
        const { code, ctrlKey, metaKey } = event;

        if (code === 'KeyK' && (ctrlKey || metaKey)) {
          event.preventDefault();
          let url: string | null;
          if (!state.isLink) {
            props.setIsLinkEditMode(true);
            url = sanitizeUrl('https://');
          } else {
            props.setIsLinkEditMode(false);
            url = null;
          }
          return editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
        }
        return false;
      },
      NormalPriority,
    );
  }, [editor, state.isLink, props, props.setIsLinkEditMode]);

  const alignButtons = [
    {
      type: 'left',
      icon: AlignLeft,
      label: 'Left Align',
    },
    {
      type: 'center',
      icon: AlignCenter,
      label: 'Center Align',
    },
    {
      type: 'right',
      icon: AlignRight,
      label: 'Right Align',
    },
    {
      type: 'justify',
      icon: AlignJustify,
      label: 'Justify Align',
    },
  ];

  const formatButtons = [
    {
      type: 'bold',
      icon: Bold,
      label: 'Bold',
      action: () => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
      },
    },
    {
      type: 'italic',
      icon: Italic,
      label: 'Italic',
      action: () => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
      },
    },
    {
      type: 'underline',
      icon: Underline,
      label: 'Underline',
      action: () => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
      },
    },
    {
      type: 'strikethrough',
      icon: Strikethrough,
      label: 'Strikethrough',
      action: () => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
      },
    },
    {
      type: 'subscript',
      icon: Subscript,
      label: 'Subscript',
      action: () => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'subscript');
      },
    },
    {
      type: 'superscript',
      icon: Superscript,
      label: 'Superscript',
      action: () => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'superscript');
      },
    },
    {
      type: 'code',
      icon: Code,
      label: 'Code',
      action: () => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
      },
    },
    {
      type: 'link',
      icon: Link,
      label: 'Link',
      action: () => {
        if (!state.isLink) {
          props.setIsLinkEditMode(true);
          editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl('https://'));
        } else {
          props.setIsLinkEditMode(false);
          editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
        }
      },
    },
  ];

  return (
    <Menubar className="overflow-x-scroll flex gap-2 py-4 rounded-none  rounded-t-md h-14 overflow-y-hidden">
      <section className="flex gap-2">
        <Button
          size={'icon'}
          variant={'ghost'}
          disabled={!state.canUndo}
          onClick={(e) => {
            e.preventDefault();

            editor.dispatchCommand(UNDO_COMMAND, undefined);
          }}
          aria-label="Undo"
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          size={'icon'}
          variant={'ghost'}
          disabled={!state.canRedo}
          onClick={(e) => {
            e.preventDefault();
            editor.dispatchCommand(REDO_COMMAND, undefined);
          }}
          aria-label="Redo"
        >
          <Redo className="h-4 w-4" />
        </Button>
      </section>

      <BlockMenu editor={editor} blockType={state.blockType} />

      {state.blockType === 'code' ? (
        <CodeMenu
          codeLanguage={state.codeLanguage}
          editor={editor}
          selectedElementKey={state.selectedElementKey}
        />
      ) : (
        <>
          <MenubarMenu>
            <MenubarTrigger className="p-0">
              {alignButtons.map((button) => {
                return button.type === state.elementFormat ? (
                  <Button
                    key={button.type}
                    size={'icon'}
                    variant={'ghost'}
                    aria-label={button.label}
                    onClick={(e) => e.preventDefault()}
                  >
                    <button.icon className="h-4 w-4" />
                  </Button>
                ) : null;
              })}
            </MenubarTrigger>
            <MenubarContent className="flex flex-col gap-2 ">
              {alignButtons.map((button) => (
                <MenubarItem
                  key={button.type}
                  onClick={(e) => {
                    e.preventDefault();
                    editor.dispatchCommand(
                      FORMAT_ELEMENT_COMMAND,
                      button.type as ElementFormatType,
                    );
                  }}
                >
                  <button.icon className="mr-2 h-4 w-4" />
                  <span>{button.label}</span>
                </MenubarItem>
              ))}
            </MenubarContent>
          </MenubarMenu>
          <section className="flex gap-2">
            {formatButtons.map((button) => (
              <Button
                key={button.type}
                size={'icon'}
                variant={state[button.type] ? 'secondary' : 'ghost'}
                onClick={(e) => {
                  e.preventDefault();
                  button.action();
                }}
                aria-label={button.label}
              >
                <button.icon className="h-4 w-4" />
              </Button>
            ))}
          </section>
        </>
      )}
    </Menubar>
  );
};
