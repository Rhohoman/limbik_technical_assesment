import React from 'react'
import { Table } from 'semantic-ui-react';

class DataDisplayTable extends React.Component {


    render(){
        const data = this.props.data
        const properties = this.props.properties

        const headerCell = properties.map( property => (property == 'impressions' || property == 'clicks') ? <Table.HeaderCell rowSpan='2' onClick={() => this.props.sortTableData(property)}>{property}</Table.HeaderCell> : <Table.HeaderCell rowSpan='2'>{property}</Table.HeaderCell>)

        const tableRow = data.map(dataObject =>
            <Table.Row onClick={() => this.props.displayCallback(dataObject)}>
                <Table.Cell>{dataObject.id}</Table.Cell>
                <Table.Cell>{dataObject.pdf}</Table.Cell>
                <Table.Cell>{dataObject.text}</Table.Cell>
                <Table.Cell>{dataObject.url}</Table.Cell>
                <Table.Cell>{dataObject.impressions}</Table.Cell>
                <Table.Cell>{dataObject.clicks}</Table.Cell>
                <Table.Cell>spend</Table.Cell>
                <Table.Cell>created</Table.Cell>
                <Table.Cell>ended</Table.Cell>
                <Table.Cell>targeting</Table.Cell>
                <Table.Cell>{dataObject.image}</Table.Cell>
            </Table.Row>
        )
        return(
            <div>
                <h1>Display Table</h1>

                <Table celled structured striped compact>

                    <Table.Header>
                        <Table.Row>
                            {headerCell}
                        </Table.Row>
                    </Table.Header>
                    {/* the header here takes the keys */}

                    <Table.Body>
                        {tableRow}
                    </Table.Body>

                </Table>
            </div>
        )
    }
}

export default DataDisplayTable