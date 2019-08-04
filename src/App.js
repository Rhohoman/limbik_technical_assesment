import React from 'react';
import logo from './logo.svg';
import './App.css';
import { JSONDATA } from './data.js';
import DataDisplayTable from './DataDisplayTable';
import DataDisplay from './DataDisplay';
import { Button, Form, Header } from 'semantic-ui-react';


class App extends React.Component{

  state = {
    data: JSONDATA,
    displayTable: true,
    displayObject: {},
    idSearchValue: "",
  }


  getKeys = () => {
        //here I manipulate the data and get just the keys so I can use them for
        let dataArray = this.state.data
        let keys = dataArray.map(object => Object.keys(object))[0]

        return keys
  }

  displayCallback = (dataObject) => {
    this.setState((prevState) => ({
        displayTable: !prevState,
        displayObject: dataObject,
      })
    )
  }

  backToDisplayTable = () => {
    console.log(`back!`)

    this.setState({
      displayTable: true,
    }, () => console.log(this.state.displayTable))
    
  }

  handleIdSearchChange = (event) => {
    console.log(event.target.value)
    this.setState({
      idSearchValue: event.target.value
    })
  }

  handleIdSearchIdSubmit = (event) => {
    event.preventDefault()
    // console.log('event: ', event.target.querySelector('input').value)
    let id = this.state.idSearchValue
    //search throguh all data to find object with this id and then send it to the data Display
    let data = this.state.data

    // data.filter(dataObject => dataObject.includes(id))
    let searchObject = data.filter(dataObject => dataObject.id == id)[0]

    // console.log(searchObject)

    this.setState((prevState) => ({
        displayTable: !prevState,
        displayObject: searchObject,
      })
    )
  }

  render(){
    const properties = this.getKeys()
    // const buttonGroup = properties.map( property => <Button onClick={() => console.log(`clicked ${property}`)} >{property}</Button>)
    return (
      <div>
        {this.state.displayTable === true ? 
          <div>
            <br/>
            <form onSubmit={(event) => this.handleIdSearchIdSubmit(event)}>
              Search: <input placeholder='search by id' name='idSearchValue' id='idSearchValue' onChange={(event) => this.handleIdSearchChange(event)}/><button >submit</button>
            </form>
            <br/>
            <br/>
            <br/>
            <br/>

            <h2>Filtering Options</h2>
            <Button.Group>
              <Button onClick={()=>console.log(`Filtering by id`)}>id</Button>
              <Button onClick={()=>console.log(`Filtering by pdf`)}>pdf</Button>
              <Button onClick={()=>console.log(`Filtering by text`)}>text</Button>
              <Button onClick={()=>console.log(`Filtering by url`)}>url</Button>
              <Button onClick={()=>console.log(`Filtering by impresions`)}>impressions</Button>
              <Button onClick={()=>console.log(`Filtering by clciks`)}>clicks</Button>
              <Button onClick={()=>console.log(`Filtering by image`)}>image</Button>
            </Button.Group>

            <form>
              <input placeholder='filtering...'/>
              <input placeholder='filtering...'/>
              <input placeholder='filtering...'/>
              <input placeholder='filtering...'/>
              <input placeholder='filtering...'/>
            </form>

            <DataDisplayTable data={this.state.data} properties={properties} displayCallback={this.displayCallback}/>
          </div>
            :
          <DataDisplay displayObject={this.state.displayObject} backToDisplayTable={this.backToDisplayTable}/>
        }
      </div>
    );
  }
}

export default App;
