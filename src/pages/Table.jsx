import React, { useMemo } from 'react'
import { usePagination, useSortBy, useTable } from 'react-table'
import styled from 'styled-components'

const nomes = [
    'Alexandre',
    'Eduardo',
    'Henrique',
    'Murilo',
    'Theo',
    'André',
    'Enrico',
    'Henry',
    'Nathan',
    'Thiago',
    'Antônio',
    'Enzo',
    'Ian',
    'Otávio',
    'Thomas',
    'Augusto',
    'Erick',
    'Isaac',
    'Pietro',
    'Vicente',
    'Breno',
    'Felipe',
    'João',
    'Rafael',
    'Vinícius',
    'Bruno',
    'Fernando',
    'Kaique',
    'Raul',
    'Vitor',
    'Caio',
    'Francisco',
    'Leonardo',
    'Rian',
    'Yago',
    'Cauã',
    'Frederico',
    'Luan',
    'Ricardo',
    'Ygor',
    'Daniel',
    'Guilherme',
    'Lucas',
    'Rodrigo',
    'Yuri',
    'Danilo',
    'Gustavo',
    'Mathias',
    'Samuel',
]

const randomWord = () => {
    const index = Math.floor(nomes.length * Math.random())
    return nomes[index]
}

const range = (len) => {
    const arr = []
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }
    return arr
}

const newPerson = () => {
    const statusChance = Math.random()
    return {
        firstName: randomWord(),
        lastName: randomWord(),
        age: Math.floor(Math.random() * 30),
        visits: Math.floor(Math.random() * 100),
        progress: Math.floor(Math.random() * 100),
        status:
            statusChance > 0.66 ? 'relationship' : statusChance > 0.33 ? 'complicated' : 'single',
    }
}

function makeData(...lens) {
    const makeDataLevel = (depth = 0) => {
        const len = lens[depth]
        return range(len).map((d) => {
            return {
                ...newPerson(),
                subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
            }
        })
    }

    return makeDataLevel()
}

const Table1 = () => {
    const data = useMemo(
        () => [
            {
                col1: 'IGNORED',
                col2: 'World',
                col1_1: 'what1',
                col1_2: 'what2',
            },
            {
                col1: 'IGNORED',
                col2: 'rocks',
                // col1_1: 'what1',
                col1_2: 'what2',
            },
            {
                col1: 'IGNORED',
                col2: 'you want',
                col1_1: 'what1',
                // col1_2: 'what2',
            },
            {
                col1: 'IGNORED',
                col2: 'col2 row 4',
                // col1_1: 'what1',
                // col1_2: 'what2',
            },
        ],
        []
    )

    const initialState = {
        hiddenColumns: ['col3'],
    }

    const columns = useMemo(
        () => [
            {
                Header: 'Column 1',
                accessor: 'col1', // accessor is the "key" in the data
                columns: [
                    {
                        Header: 'Subc 1.1',
                        accessor: 'col1_1',
                    },
                    {
                        Header: 'Subc 1.2',
                        accessor: 'col1_2',
                    },
                ],
            },
            {
                Header: 'Column 2',
                accessor: 'col2',
            },
            {
                Header: 'Column 3 não será mostrada',
                accessor: 'col3',
            },
        ],
        []
    )

    const tableInstance = useTable({ columns, data, initialState })
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance

    return (
        <table {...getTableProps()} style={{ border: 'solid 1px blue', margin: 10 }}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th
                                {...column.getHeaderProps()}
                                style={{
                                    borderBottom: 'solid 3px red',
                                    background: 'aliceblue',
                                    color: 'black',
                                    fontWeight: 'bold',
                                }}
                            >
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>

            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        style={{
                                            padding: '10px',
                                            border: 'solid 1px gray',
                                            background: 'papayawhip',
                                        }}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

const Styles = styled.div`
    padding: 1rem;

    table {
        border-spacing: 0;
        border: 1px solid black;

        tr {
            ${'' /* :first-child {
        td {
          border-top: 1px solid black;
        }
      } */}

            :last-child {
                td {
                    border-bottom: 0;
                }
            }
        }

        tbody {
            tr {
                :nth-child(even) {
                    background: #ccc;
                }

                :hover:nth-child(even) {
                    background: yellow;
                    cursor: pointer;
                }
            }
        }

        th,
        td {
            margin: 0;
            padding: 0.5rem;
            border-bottom: 1px solid black;
            border-right: 1px solid black;

            :last-child {
                border-right: 0;
            }
        }

        tfoot {
            tr:first-child {
                td {
                    border-top: 2px solid black;
                }
            }
            font-weight: bolder;
        }
    }
`

const Table2 = () => {
    const data = useMemo(() => makeData(10), [])

    const columns = useMemo(
        () => [
            {
                Header: 'Name',
                Footer: 'Name',
                columns: [
                    {
                        Header: 'First Name',
                        accessor: 'firstName',
                        Footer: 'First Name',
                    },
                    {
                        Header: 'Last Name',
                        accessor: 'lastName',
                        Footer: 'Last Name',
                    },
                ],
            },
            {
                Header: 'Info',
                Footer: 'Info',
                columns: [
                    {
                        Header: 'Age',
                        accessor: 'age',
                        Footer: 'Age',
                    },
                    {
                        Header: 'Visits',
                        accessor: 'visits',
                        Footer: (info) => {
                            // Only calculate total visits if rows change
                            const total = useMemo(
                                () => info.rows.reduce((sum, row) => row.values.visits + sum, 0),
                                [info.rows]
                            )

                            return <>Total: {total}</>
                        },
                    },
                    {
                        Header: 'Status',
                        accessor: 'status',
                        Footer: 'Status',
                    },
                    {
                        Header: 'Profile Progress',
                        accessor: 'progress',
                        Footer: 'Profile Progress',
                    },
                ],
            },
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })

    return (
        <Styles>
            <h2>Footer</h2>

            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((group) => (
                        <tr {...group.getHeaderGroupProps()}>
                            {group.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
                <tfoot>
                    {footerGroups.map((group) => (
                        <tr {...group.getFooterGroupProps()}>
                            {group.headers.map((column) => (
                                <td {...column.getFooterProps()}>{column.render('Footer')}</td>
                            ))}
                        </tr>
                    ))}
                </tfoot>
            </table>
        </Styles>
    )
}

const Table3 = () => {
    const columns = useMemo(
        () => [
            {
                Header: 'Name',
                columns: [
                    {
                        Header: 'First Name',
                        accessor: 'firstName',
                    },
                    {
                        Header: 'Last Name',
                        accessor: 'lastName',
                    },
                ],
            },
            {
                Header: 'Info',
                columns: [
                    {
                        Header: 'Age',
                        accessor: 'age',
                    },
                    {
                        Header: 'Visits',
                        accessor: 'visits',
                    },
                    {
                        Header: 'Status',
                        accessor: 'status',
                    },
                    {
                        Header: 'Profile Progress',
                        accessor: 'progress',
                    },
                ],
            },
        ],
        []
    )

    const data = useMemo(() => makeData(2000), [])

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
        {
            columns,
            data,
        },
        useSortBy
    )

    // We don't want to render all 2000 rows for this example, so cap
    // it at 20 for this use case
    const firstPageRows = rows.slice(0, 20)

    return (
        <Styles>
            <h2>Sorting</h2>

            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                // Add the sorting props to control sorting. For this example
                                // we can add them into the header props
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    {/* Add a sort direction indicator */}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🙃'
                                                : ' 😄'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {firstPageRows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <br />

            <div>Showing the first 20 results of {rows.length} rows</div>
        </Styles>
    )
}

const Table4 = () => {
    const columns = useMemo(
        () => [
            {
                Header: 'Name',
                columns: [
                    {
                        Header: 'First Name',
                        accessor: 'firstName',
                    },
                    {
                        Header: 'Last Name',
                        accessor: 'lastName',
                    },
                ],
            },
            {
                Header: 'Info',
                columns: [
                    {
                        Header: 'Age',
                        accessor: 'age',
                    },
                    {
                        Header: 'Visits',
                        accessor: 'visits',
                    },
                    {
                        Header: 'Status',
                        accessor: 'status',
                    },
                    {
                        Header: 'Profile Progress',
                        accessor: 'progress',
                    },
                ],
            },
        ],
        []
    )

    const data = useMemo(() => makeData(100001), [])

    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 2 },
        },
        usePagination
    )

    // Render the UI for your table
    return (
        <Styles>
            <pre>
                <code>
                    {JSON.stringify(
                        {
                            pageIndex,
                            pageSize,
                            pageCount,
                            canNextPage,
                            canPreviousPage,
                        },
                        null,
                        2
                    )}
                </code>
            </pre>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to page:{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                        style={{ width: '100px' }}
                    />
                </span>{' '}
                <select
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </Styles>
    )
}

const TableExample = () => {
    return (
        <div>
            <Table1 />

            <Table2 />

            <Table3 />

            <Table4 />
        </div>
    )
}

export default TableExample
