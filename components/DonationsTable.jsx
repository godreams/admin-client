import React from 'react'
import {observer, inject} from 'mobx-react'
import {observable} from 'mobx'
import Table from 'grommet/components/Table'
import TableHeader from 'grommet/components/TableHeader'
import TableRow from 'grommet/components/TableRow'

@inject('appState') @observer
export default class DonationsTable extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Table scrollable='true' selectable='true'>
        <TableHeader labels={['Donor', 'Amount', 'Date', 'Status']}/>
        <tbody>
          <TableRow>
            <td>Mr. Billionare</td>
            <td>20000</td>
            <td>15 March, 2017</td>
            <td className="secondary">Pending</td>
          </TableRow>
          <TableRow>
            <td>RobinHood</td>
            <td>2000</td>
            <td>1 April, 2017</td>
            <td>Approved</td>
          </TableRow>
        </tbody>
      </Table>
    )
  }
}
