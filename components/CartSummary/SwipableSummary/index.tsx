import { FormEventHandler, useState } from 'react';
import { Global } from '@emotion/react';
import CssBaseline from '@material-ui/core/CssBaseline';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Summary, SummaryProps } from '../Summary';
import { SummaryItems, SummaryItemsProps } from '../SummaryItems';
import { Root, StyledBox, Puller, Wrapper } from './styles';
import { Form } from '../styles';

const drawerBleeding = 140;

interface Props extends SummaryProps, SummaryItemsProps {
  handleCheckout: FormEventHandler<HTMLFormElement>;
}

const SwipableSummary = (props: Props) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

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
      <Box sx={{ textAlign: 'center', pt: 1 }}>
        <Button onClick={toggleDrawer(true)}>Visualizar o carrinho</Button>
      </Box>
      <SwipeableDrawer
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

          <Form onSubmit={props.handleCheckout}>
            <Summary {...props} />
          </Form>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <Wrapper>
            <SummaryItems {...props} />
          </Wrapper>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
};

export default SwipableSummary;
