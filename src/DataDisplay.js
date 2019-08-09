import React from 'react'
import { Table } from 'semantic-ui-react';

class DataDisplay extends React.Component{
    render(){
        let displayObjectArray = this.props.displayObjectArray

        const properties = this.props.properties
        const headerCell = properties.map( property => <Table.HeaderCell rowSpan='2'>{property}</Table.HeaderCell>)

        return(
            <div className='center'>
                <button onClick={() => this.props.backToDisplayTable()}>Back</button>
                <h3>Displaying...</h3>
                <Table celled structured striped >
                    <Table.Header>
                        <Table.Row>
                            {headerCell}
                        </Table.Row>
                    </Table.Header>
                    {displayObjectArray.map(obj =>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>{obj.id}</Table.Cell>
                                <Table.Cell>{obj.pdf}</Table.Cell>
                                <Table.Cell>{obj.text}</Table.Cell>
                                <Table.Cell>{obj.url}</Table.Cell>
                                <Table.Cell>{obj.impressions}</Table.Cell>
                                <Table.Cell>{obj.clicks}</Table.Cell>
                                <Table.Cell>amount: {obj.spend.amount == null ? 'N/A' : obj.spend.amount } / currency: {obj.spend.currency == null ? 'N/A' : obj.spend.currency }</Table.Cell>
                                <Table.Cell>{obj.created == null ? 'N/A' : obj.created}</Table.Cell>
                                <Table.Cell>{obj.ended == null ? 'N/A' : obj.ended}</Table.Cell>
                                <Table.Cell>Disclosed</Table.Cell>
                                <Table.Cell>{obj.image}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    )}
                </Table>
            </div>
        )
    }
}

export default DataDisplay