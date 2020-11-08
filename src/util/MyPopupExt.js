import React from 'react';
import { Popup } from 'semantic-ui-react';

function MyPopupExt( { content, trigger, children } ) {
    return (
        <Popup 
          content={content}
          inverted
          position='bottom left'
          trigger={trigger}>{children}</Popup>
    );
}

export default MyPopupExt;