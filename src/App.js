import React from 'react';
import logo from './logo.svg';
import './App.css';
import { JSONDATA } from './data.js';
import DataDisplayTable from './DataDisplayTable';
import DataDisplay from './DataDisplay';
import { Button } from 'semantic-ui-react';


class App extends React.Component{

  state = {
    data: JSONDATA,
    displayTable: true,
    displayObject: {},
  }


  getKeys = () => {
        //here I manipulate the data and get just the keys so I can use them for
        let dataArray = this.state.data
        let keys = dataArray.map(object => Object.keys(object))[0]

        return keys
  }

  displayCallback = (dataObject) => {
    //callback from table
    // console.log(dataObject)
    this.setState((prevState) => ({
        displayTable: !prevState,
        displayObject: dataObject,
      })
    )
  }

  backToDisplayTable = () => {
    console.log(`back!`)
  }


  render(){
    const properties = this.getKeys()
    // const buttonGroup = properties.map( property => <Button onClick={() => console.log(`clicked ${property}`)} >{property}</Button>)
    return (
      <div>
        {this.state.displayTable ? 
          <div>
            <br/>
            Search: <input placeholder='search by id'/>
            <br/>
            <br/>

            <h2>Filtering Options</h2>
            <Button.Group>
              {/* {buttonGroup} */}
              <Button onClick={()=>console.log(`Filtering by id`)}>id</Button>
              <Button onClick={()=>console.log(`Filtering by pdf`)}>pdf</Button>
              <Button onClick={()=>console.log(`Filtering by text`)}>text</Button>
              <Button onClick={()=>console.log(`Filtering by url`)}>url</Button>
              <Button onClick={()=>console.log(`Filtering by impresions`)}>impressions</Button>
              <Button onClick={()=>console.log(`Filtering by clciks`)}>clicks</Button>
              <Button onClick={()=>console.log(`Filtering by image`)}>image</Button>

            </Button.Group>

            <DataDisplayTable data={this.state.data} properties={properties} displayCallback={this.displayCallback}/>
          </div>
            :
          <DataDisplay displayObject={this.state.displayObject} back={this.backToDisplayTable}/>
        }
      </div>
    );
  }
}

export default App;
