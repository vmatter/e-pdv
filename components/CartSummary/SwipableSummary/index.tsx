import { useState } from 'react';
import { Global } from '@emotion/react';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Skeleton from '@material-ui/core/Skeleton';
// import Typography from '@material-ui/core/Typography';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { Summary, SummaryProps } from '../Summary';
import { SummaryItems, SummaryItemsProps } from '../SummaryItems';
import { Root, StyledBox, Puller } from './styles';

const drawerBleeding = 222;

interface Props extends SummaryProps, SummaryItemsProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const SwipableSummary = (props: Props) => {
  const { window } = props;
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: '50%',
            overflow: 'visible',
          },
        }}
      />
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Summary {...props} />
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
          <SummaryItems {...props} />
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
};

export default SwipableSummary;
