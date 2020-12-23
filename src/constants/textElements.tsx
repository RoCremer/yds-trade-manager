import React from 'react';
import keyMirror from 'keymirror';

import { ITextElements } from '@typings/index';

const TEXT_TAGS = keyMirror({
  span: null,
  p: null,
  strong: null,
  em: null,
  div: null,
});

const TEXT_ELEMENTS: ITextElements = {
  [TEXT_TAGS.span]: (props: any) => <span {...props} />,
  [TEXT_TAGS.p]: (props: any) => <p {...props} />,
  [TEXT_TAGS.strong]: (props: any) => <strong {...props} />,
  [TEXT_TAGS.em]: (props: any) => <em {...props} />,
  [TEXT_TAGS.div]: (props: any) => <div {...props} />,
};

export default TEXT_ELEMENTS;
