import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {
  Table, TableBody, TableCell,
  TableHead, TableRow, Paper,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// const MyTable = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
// `;

// const Thead = styled.div`
//   font-weight: bold;
//   width: 100%;
// `;

// const Trow = styled.div`
//   align-items: center;
//   display: flex;
//   justify-content: space-between;
// `;

// const HeaderCell = withTheme()(styled.div`
//   flex: 1 1 auto;
//   padding: ${({ theme }) => theme.spacing.unit * 2}px;
// `);

// HeaderCell.propTypes = {
//   theme: PropTypes.object.isRequired,
// };

// const Tbody = styled.div`
//   align-items: center;
//   display: flex;
//   flex-direction: column;<TableCell>rafafhgkigh@gmail.com</TableCell>
//   width: 100%;
// `;

// const PaperRow = styled(Paper)`
//   align-items: stretch;
//   display: flex;
//   flex: 1 1 auto;
//   justify-content: space-between;
// `;

// const TableCell = withTheme()(styled.div`
//   padding: ${({ theme }) => theme.spacing.unit * 2}px;
// `);

// TableCell.propTypes = {
//   theme: PropTypes.object.isRequired,
// };

const styles = theme => ({
  row: {
    backgroundColor: 'red',
  },
  tableCell: {
    padding: theme.spacing.unit * 2,
  },
  table: {
    borderCollapse: 'separate',
    borderSpacing: '0 1em',
    minWidth: 700,
  },
  // cells: {
  //   border: 'none',
  //   padding: theme.spacing.unit * 2,
  // },
});

// const ListFormat = () => {
//   return (
//     <MyTable>
//       <Thead>
//         <Trow>
//           <HeaderCell>Nome</HeaderCell>
//           <HeaderCell>Email</HeaderCell>
//           <HeaderCell>Telefone</HeaderCell>
//         </Trow>
//       </Thead>
//       <Tbody>
//         <PaperRow>
//           <TableCell>Rafael Klynger</TableCell>
//           <TableCell>rafafhgkigh@gmail.com</TableCell>
//           <TableCell>(83) 9 9875-7582</TableCell>
//         </PaperRow>
//       </Tbody>
//     </MyTable>
//   );
// };

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const ListFormat = ({ classes }) => {
  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Dessert (100g serving)</TableCell>
          <TableCell numeric>Calories</TableCell>
          <TableCell numeric>Fat (g)</TableCell>
          <TableCell numeric>Carbs (g)</TableCell>
          <TableCell numeric>Protein (g)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map(row => {
          // <TableRow className={classes.row} key={row.id}>
          return (
            <Paper component="tr" key={row.id}>
              <TableCell className={classes.tableCell} component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell className={classes.tableCell} numeric>{row.calories}</TableCell>
              <TableCell className={classes.tableCell} numeric>{row.fat}</TableCell>
              <TableCell className={classes.tableCell} numeric>{row.carbs}</TableCell>
              <TableCell className={classes.tableCell} numeric>{row.protein}</TableCell>
            </Paper>
          );
          // </TableRow>
        })}
      </TableBody>
    </Table>
  );
};

ListFormat.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { theme: true })(ListFormat);
