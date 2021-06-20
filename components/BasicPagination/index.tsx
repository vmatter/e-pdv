import TablePagination from '@material-ui/core/TablePagination';

type Props = {
  count: number;
  page: number;
  onChangePage: (e: object, newPage: number) => void
  rowsPerPage: number;
  onChangeRowsPerPage: (e: any) => void
};

const BasicPagination = ({ count, page, onChangePage, rowsPerPage, onChangeRowsPerPage }:Props) => {
  return (
      <TablePagination
        count={count}
        page={page}
        onChangePage={onChangePage}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        labelRowsPerPage="Resultados por página"
      />  
  );
}

export default BasicPagination;