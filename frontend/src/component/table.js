import React, {useMemo} from 'react'
import { Table, ButtonToolbar, ButtonGroup, Button} from 'react-bootstrap';
import { useTable, usePagination } from "react-table";

const TableContend=({head, contend, pagination})=>{

    const data= useMemo(()=>contend,[contend]);
    const columns= useMemo(()=>head,[head]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex },
    } = useTable({ columns, data, initialState: { pageIndex: 0, pageSize:4}}, usePagination)

    return(
        <div>
            <Table striped bordered hover responsive {...getTableProps()} >
                <thead>
                    {// Loop over the header rows
                    headerGroups.map(headerGroup => (
                        // Apply the header row props
                        <tr {...headerGroup.getHeaderGroupProps()}>
                        {// Loop over the headers in each row
                        headerGroup.headers.map(column => (
                            // Apply the header cell props
                            <th {...column.getHeaderProps()}>
                            {// Render the header
                            column.render('Header')}
                            </th>
                        ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {// Loop over the table rows
                    page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps({
                            onClick:()=>{console.log(row.original.id)}
                            })}>
                            {row.cells.map(cell => {
                              return <td {...cell.getCellProps()} >{cell.render('Cell')}</td>
                            })}
                          </tr>
                        )
                      })}
                </tbody>
            </Table>
            {
                pagination?
                    <>
                        <ButtonToolbar aria-label="Toolbar with button groups">
                            <ButtonGroup className="me-2" aria-label="First group">
                                <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                                {'<<'}
                                </Button>
                                <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
                                {'<'}
                                </Button>
                                <Button onClick={() => nextPage()} disabled={!canNextPage}>
                                {'>'}
                                </Button>
                                <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                                {'>>'}
                                </Button>
                                <span>
                                pagina{' '}
                                <strong>
                                    {pageIndex + 1} de {pageOptions.length}
                                </strong>{' '}
                                </span>
                            </ButtonGroup>
                        </ButtonToolbar>       
                    </>
                :
                <></>
            }
        </div>
        
    )
}

export default TableContend;