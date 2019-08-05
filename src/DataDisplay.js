import React from 'react'

class DataDisplay extends React.Component{
    render(){
        let displayObject = this.props.displayObject
        return(
            <div>
                <button onClick={() => this.props.backToDisplayTable()}>Back</button>
                <h3>Display card</h3>
                id: {displayObject.id}<br/>
                pdf: {displayObject.pdf}<br/>
                text: {displayObject.text}<br/>
                url: {displayObject.url}<br/>
                impressions: {displayObject.impressions}<br/>
                clicks: {displayObject.clicks}<br/>
                image: {displayObject.image}
            </div>
        )
    }
}

export default DataDisplay