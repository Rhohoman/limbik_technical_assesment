import React from 'react'
import { Table } from 'semantic-ui-react';

class DataDisplayTable extends React.Component {

    render(){
        const data = this.props.data
        const properties = this.props.properties

        const headerCell = properties.map( property => <Table.HeaderCell rowSpan='2'>{property}</Table.HeaderCell>)

        const tableRow = data.map(dataObject =>
            <Table.Row>
                <Table.Cell>{dataObject.id}</Table.Cell>
                <Table.Cell>{dataObject.pdf}</Table.Cell>
                {/* <Table.Cell>{dataObject.text}</Table.Cell>
                <Table.Cell>{dataObject.url}</Table.Cell>
                <Table.Cell>{dataObject.impressions}</Table.Cell>
                <Table.Cell>{dataObject.clicks}</Table.Cell>
                <Table.Cell>{dataObject.spend}</Table.Cell>
                <Table.Cell>{dataObject.created}</Table.Cell>
                <Table.Cell>{dataObject.ended}</Table.Cell> */}
            </Table.Row>
        )
        // const tableRow = data.map(data => console.log(data))
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