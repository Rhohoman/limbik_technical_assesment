import React from 'react'
import { Table } from 'semantic-ui-react';

class MultipleDataDisplay extends React.Component{
    render(){
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
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>{displayObject.id}</Table.Cell>
                            <Table.Cell>{displayObject.pdf}</Table.Cell>
                            <Table.Cell>{displayObject.text}</Table.Cell>
                            <Table.Cell>{displayObject.url}</Table.Cell>
                            <Table.Cell>{displayObject.impressions}</Table.Cell>
                            <Table.Cell>{displayObject.clicks}</Table.Cell>
                            <Table.Cell>amount: {displayObject.spend.amount == null ? 'N/A' : displayObject.spend.amount } / currency: {displayObject.spend.currency == null ? 'N/A' : displayObject.spend.currency }</Table.Cell>
                            <Table.Cell>{displayObject.created == null ? 'N/A' : displayObject.created}</Table.Cell>
                            <Table.Cell>{displayObject.ended == null ? 'N/A' : displayObject.ended}</Table.Cell>
                            <Table.Cell>Disclosed</Table.Cell>
                            <Table.Cell>{displayObject.image}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        )
    }
}

export default MultipleDataDisplay