import React from 'react'
import { Segment, Grid } from 'semantic-ui-react'

import MobileMenuBar from './mobile/MenuBar';
import ComputerMenuBar from './computer/MenuBar';

function MenuBar() {
  const menuBar = (
    <Segment inverted textAlign="center" fixed='top'>      
        <Grid>
          <Grid.Row only='mobile tablet'>
            <MobileMenuBar />
          </Grid.Row>
          <Grid.Row only="computer">
            <Grid.Column>
              <ComputerMenuBar />
            </Grid.Column>
          </Grid.Row>
        </Grid>
    </Segment>
  );

  return menuBar;
}

export default MenuBar;