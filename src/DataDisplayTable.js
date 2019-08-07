import React from 'react'
import { Table } from 'semantic-ui-react';

class DataDisplayTable extends React.Component {

    render(){
        const data = this.props.data
        const properties = this.props.properties

        const headerCell = properties.map( property => (property == 'impressions' || property == 'clicks') ? <Table.HeaderCell onClick={() => this.props.sortTableData(property) }>{property} (click to sort)</Table.HeaderCell> : <Table.HeaderCell rowSpan='2'>{property}</Table.HeaderCell>)

        const tableRow = data.map(dataObject =>
            // <Table.Row onClick={() => this.props.displayCallback(dataObject)}>
            <Table.Row >
                <Table.Cell>{dataObject.id}</Table.Cell>
                <Table.Cell>{dataObject.pdf}</Table.Cell>
                <Table.Cell>{dataObject.text}</Table.Cell>
                <Table.Cell>{dataObject.url}</Table.Cell>
                <Table.Cell>{dataObject.impressions}</Table.Cell>
                <Table.Cell>{dataObject.clicks}</Table.Cell>
                <Table.Cell>amount: {dataObject.spend.amount == null ? 'N/A' : dataObject.spend.amount } / currency: {dataObject.spend.currency == null ? 'N/A' : dataObject.spend.currency }</Table.Cell>
                <Table.Cell>{dataObject.created == null ? 'N/A' : dataObject.created}</Table.Cell>
                <Table.Cell>{dataObject.ended == null ? 'N/A' : dataObject.ended}</Table.Cell>
                <Table.Cell>Disclosed</Table.Cell>
                <Table.Cell>{dataObject.image  == null ? 'N/A' : dataObject.image}</Table.Cell>
            </Table.Row>
        )
        return(
            <div className='display-table'>
                <h1>Display Table</h1>

                <Table celled structured striped compact>

                    <Table.Header>
                        <Table.Row>
                            {headerCell}
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {tableRow}
                    </Table.Body>

                </Table>
            </div>
        )
    }
}

export default DataDisplayTable