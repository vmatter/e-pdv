import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

type Props = {
  count: number;
  page: number;
  onChangePage: () => Promise<void>;
};

const BasicPagination = ({ count, page, onChangePage }:Props) => {
  const classes = useStyles();   
  return (
    <div className={classes.root}>
      <Pagination count={count} page={page} onChange={onChangePage} />
    </div>
  );
}

export default BasicPagination;