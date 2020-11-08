import React from 'react';
import { Popup } from 'semantic-ui-react';

function MyPopup( { content, children } ) {
    return (
        <Popup 
          content={content}
          inverted
          position='bottom left'
          trigger={children} />
    );
}

export default MyPopup;