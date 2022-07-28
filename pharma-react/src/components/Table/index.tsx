import React, { useState, useEffect } from 'react'
import { ReactComponent as RefreshIcon } from '../../assets/icons/refreshing.svg'
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg'

interface TableProps {
  data: Array<any>
  columns: Array<{
    name: string
    selector: string
    action?: Function
  }>
  loadMore: Function
  nextPage: Function
  pageLimit: number
}

const Table: React.FC<TableProps> = ({
  data = [],
  columns = [],
  loadMore,
  pageLimit,
  nextPage,
}) => {
  const [sortedData, setSortedData] = useState<Array<any>>(data)
  const [sorting, setSorting] = useState<string>('')

  async function orderBy(value: string) {
    let dataArr = [...data]

    dataArr = await dataArr.slice(0, pageLimit).sort((itemA, itemB) => {
      if (value === 'name') {
        if (itemA.name.first < itemB.name.first) return -1
        if (itemA.name.first > itemB.name.first) return 1
      }
      if (itemA[value] < itemB[value]) return -1
      if (itemA[value] > itemB[value]) return 1
      return 0
    })

    setSortedData(dataArr)
  }

  useEffect(() => {
    orderBy(sorting)
  }, [data, sorting])

  return (
    <div className="text-center">
      <table className="shadow-lg bg-white overflow-auto table-auto w-full mx-auto">
        <tr>
          {columns.map((column) => (
            <th className="bg-gray-400 border text-left py-0" key={column.name}>
              <button
                onClick={() => setSorting(column.selector)}
                className="w-full lg:px-8 py-4"
                type="button"
              >
                {column.name}
              </button>
            </th>
          ))}
        </tr>
        <tbody>
          {sortedData.slice(0, pageLimit).map((item) => (
            <tr>
              {columns.map((column) =>
                column.action ? (
                  <td className="border lg:px-8  py-4">
                    {column.action(item)}
                  </td>
                ) : (
                  <td className="border lg:px-8  py-4">
                    <p>{item[column.selector]}</p>
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {pageLimit < data.length ? (
        <div className="flex justify-center my-12 text-center">
          <button
            onClick={() => loadMore()}
            className="flex text-center"
            type="button"
          >
            <span>
              <RefreshIcon className="h-6 mr-2" />
            </span>
            show more
          </button>
        </div>
      ) : (
        <div className="flex justify-center my-12 text-center">
          <button
            onClick={() => nextPage()}
            className="flex text-center"
            type="button"
          >
            <span>
              <PlusIcon className="w-6 h-6 mr-2" />
            </span>
            Next Page
          </button>
        </div>
      )}
    </div>
  )
}

export default Table
