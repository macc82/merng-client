import React, { useState } from 'react'
import { Image, Icon, Segment, Button, Header } from 'semantic-ui-react';

const imageNameList = [ 
    {name: 'ade', filetype: 'jpg'},
    {name: 'chris', filetype: 'jpg'},
    {name: 'christian', filetype: 'jpg'},
    {name: 'daniel', filetype: 'jpg'},
    {name: 'elliot', filetype: 'jpg'},
    {name: 'elyse', filetype: 'png'},
    {name: 'helen', filetype: 'jpg'},
    {name: 'jenny', filetype: 'jpg'},
    {name: 'joe', filetype: 'jpg'},
    {name: 'justen', filetype: 'jpg'},
    {name: 'kristy', filetype: 'png'},
    {name: 'laura', filetype: 'jpg'},
    {name: 'matt', filetype: 'jpg'},
    {name: 'matthew', filetype: 'png'},
    {name: 'molly', filetype: 'png'},
    {name: 'nan', filetype: 'jpg'},
    {name: 'nom', filetype: 'jpg'},
    {name: 'patrick', filetype: 'png'},
    {name: 'rachel', filetype: 'png'},
    {name: 'steve', filetype: 'jpg'},
    {name: 'stevie', filetype: 'jpg'},
    {name: 'tom', filetype: 'jpg'},
    {name: 'veronika', filetype: 'jpg'},
    {name: 'zoe', filetype: 'jpg'},
];

function AvatarCarousel({callback}) {
    const [currentIndex, setCurrentIndex] = useState(0);    

    const onImageChange = async (type) => {
        switch (type) {
            case 'increment':
                await setCurrentIndex((currentIndex === imageNameList.length - 1) ? 0 : currentIndex + 1);
                break;
            case 'decrement':
                await setCurrentIndex((currentIndex === 0) ? imageNameList.length - 1 : currentIndex - 1);                
                break;
            default:
                throw new Error();
        }
   
        callback({image: `${imageNameList[currentIndex].name}.${imageNameList[currentIndex].filetype}`});
    };

    return (
        <Segment compact>
            <Header as='h3' style={{margin: 'auto', textAlign: 'center'}}>Avatar</Header>
            <Image
                size="small"
                style={{margin: '0.5rem auto'}}
                src={`https://react.semantic-ui.com/images/avatar/large/${imageNameList[currentIndex].name}.${imageNameList[currentIndex].filetype}`}

            />
            <Button icon floated="left" onClick={() => onImageChange('decrement')}><Icon name='arrow circle left' size="big"/></Button>
            <Button icon floated="right" onClick={() => onImageChange('increment')}><Icon name='arrow circle right' size="big"/></Button>
        </Segment>
    );

}

export default AvatarCarousel;