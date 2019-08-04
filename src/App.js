import React from 'react';
import logo from './logo.svg';
import './App.css';
import { JSONDATA } from './data.js';
import DataDisplayTable from './DataDisplayTable';
import { Button } from 'semantic-ui-react';
class App extends React.Component{

  state = {
    data: JSONDATA,
  }


  getKeys = () => {
        //here I manipulate the data and get just the keys so I can use them for
        let dataArray = this.state.data
        let keys = dataArray.map(object => Object.keys(object))[0]

        return keys
  }


  render(){
    const properties = this.getKeys()
    const buttonGroup = properties.map( property => <Button onClick={() => console.log(`clicked ${property}`)} >{property}</Button>)
    return (
      <div>
        <br/>
        Search: <input placeholder='search by id'/>
        <br/>
        <br/>

        <Button.Group>
          <Button.Header>
            Filtering
          </Button.Header>
          {buttonGroup}
        </Button.Group>

        <DataDisplayTable data={this.state.data} properties={properties}/>
      </div>
    );
  }
}

export default App;
