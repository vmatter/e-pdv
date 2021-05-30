import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

type Props = {
  open: boolean;
  handleClose: any;
  title: string;
  content: any;
  footer?: any;
};

export const ReponsiveDialog = ({
  open,
  handleClose,
  title,
  content,
  footer,
}: Props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      fullWidth={true}
    >
      <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>{footer}</DialogActions>
    </Dialog>
  );
};
