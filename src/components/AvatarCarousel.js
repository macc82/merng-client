import React from 'react'
import { Dropdown } from 'semantic-ui-react';

const path = 'https://react.semantic-ui.com/images/avatar/large/';

const imageNameList = [
    { text: '', key: 'ade', value: 'ade.jpg', image: { avatar: true, src: `${path}ade.jpg` } },
    { text: '', key: 'chris', value: 'chris.jpg', image: { avatar: true, src: `${path}chris.jpg` } },
    { text: '', key: 'christian', value: 'christian.jpg', image: { avatar: true, src: `${path}christian.jpg` } },
    { text: '', key: 'daniel', value: 'daniel.jpg', image: { avatar: true, src: `${path}daniel.jpg` } },
    { text: '', key: 'elliot', value: 'elliot.jpg', image: { avatar: true, src: `${path}elliot.jpg` } },
    { text: '', key: 'helen', value: 'helen.jpg', image: { avatar: true, src: `${path}helen.jpg` } },
    { text: '', key: 'jenny', value: 'jenny.jpg', image: { avatar: true, src: `${path}jenny.jpg` } },
    { text: '', key: 'joe', value: 'joe.jpg', image: { avatar: true, src: `${path}joe.jpg` } },
    { text: '', key: 'justen', value: 'justen.jpg', image: { avatar: true, src: `${path}justen.jpg` } },
    { text: '', key: 'laura', value: 'laura.jpg', image: { avatar: true, src: `${path}laura.jpg` } },
    { text: '', key: 'matt', value: 'matt.jpg', image: { avatar: true, src: `${path}matt.jpg` } },
    { text: '', key: 'matthew', value: 'matthew.png', image: { avatar: true, src: `${path}matthew.png` } },
    { text: '', key: 'molly', value: 'molly.png', image: { avatar: true, src: `${path}molly.png` } },
    { text: '', key: 'nan', value: 'nan.jpg', image: { avatar: true, src: `${path}nan.jpg` } },
    { text: '', key: 'nom', value: 'nom.jpg', image: { avatar: true, src: `${path}nom.jpg` } },
    { text: '', key: 'rachel', value: 'rachel.png', image: { avatar: true, src: `${path}rachel.png` } },
    { text: '', key: 'steve', value: 'steve.jpg', image: { avatar: true, src: `${path}steve.jpg` } },
    { text: '', key: 'stevie', value: 'stevie.jpg', image: { avatar: true, src: `${path}stevie.jpg` } },
    { text: '', key: 'tom', value: 'tom.jpg', image: { avatar: true, src: `${path}tom.jpg` } },
    { text: '', key: 'veronika', value: 'veronika.jpg', image: { avatar: true, src: `${path}veronika.jpg` } },
    { text: '', key: 'zoe', value: 'zoe.jpg', image: { avatar: true, src: `${path}zoe.jpg` } },
];

function AvatarCarousel({ callback }) {
    
    return (
        <span><b>Select avatar{' '}</b>
    <Dropdown
      inline
      scrolling 
      options={imageNameList}
      defaultValue={imageNameList[0].value}
      onChange={(e, data) => callback({image: data.value})}
    />
  </span>
    );

}

export default AvatarCarousel;

export const DefaultAvatar = imageNameList[0].value;