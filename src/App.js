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

  handleSearchIdSubmit = (event) => {
    debugger
    event.preventDefault()
    console.log('event: ', event)
  }

  render(){
    const properties = this.getKeys()
    // const buttonGroup = properties.map( property => <Button onClick={() => console.log(`clicked ${property}`)} >{property}</Button>)
    return (
      <div>
        {this.state.displayTable === true ? 
          <div>
            <br/>
            <form >
              Search: <input placeholder='search by id' name='idSearchValue' onChange={(event) => this.handleIdSearchChange(event)}/><button onSubmit={(event) => this.handleIdSearchIdSubmit(event)}>submit</button>
            </form>
            <br/>
            <br/>


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

<<<<<<< HEAD
        <Button.Group>
          <Button.Header>
            Filtering
          </Button.Header>
          {buttonGroup}
        </Button.Group>
=======
            </Button.Group>
>>>>>>> 28bed5e435b42cc6857c605ed610a63016f6b14d

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
