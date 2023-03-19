import React from 'react';
import {View} from 'react-native';

import {MARGIN} from './Config';
import Tile from './Tile';
import Collection from './Collection';
import {legends} from './data';

const Chrome = () => {
  return (
    <View
      style={{flex: 1, backgroundColor: 'black', paddingHorizontal: MARGIN}}>
      <Collection
        editing={true}
        onDragEnd={positions =>
          console.log(JSON.stringify(positions, null, 2))
        }>
        {legends.map((tile, index) => (
          <Tile
            onLongPress={() => true}
            key={tile.id + '-' + index}
            id={tile.id + '-' + index}
            uri={tile.uri}
          />
        ))}
      </Collection>
    </View>
  );
};

export default Chrome;
