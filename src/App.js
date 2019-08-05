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
    idSearchValue: '',
    id: '',
    pdf: '',
    text: '',
    url: '',
    image: '',
    filterForm: null,
    filteredTableData: [],
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

  handleFilterChange = (event) => {
    // console.log(`${event.target.name}: `,event.target.value)
    let filterKey = event.target.name
    let filterTerm = event.target.value
    this.setState({
      [event.target.name]: filterTerm
    },() => this.handleDataTableFilter(filterKey,filterTerm))
  }

  handleDataTableFilter = (filterKey,filterTerm) => {
    let data = this.state.data
    let filteredData = []
    console.log(`filterKey: `,filterKey)
    console.log(`filterTerm: `,filterTerm)

    // debugger

    if( filterKey == 'id'){
      filteredData = data.filter(obj => obj[filterKey].toString().includes(filterTerm))
    } else {
      filteredData = data.filter(obj => obj[filterKey] !== null)
      filteredData = filteredData.filter(obj => obj[filterKey].includes(filterTerm))
    }
    // I want to return the entire object not just the key
    // iterate through the data and check if the filter keys are  
    // console.log(`filteredData: `,filteredData)

    this.setState({
      filteredTableData: filteredData
    },() => console.log(`filtered Table Data: `,this.state.filteredTableData))

  }

  filterFormDisplay = (event) => {
    console.log(event.target.innerText)
    this.setState({
      filterForm: event.target.innerText
    })
  }

  resetTableData = (event) => {
    //clear filters
    event.preventDefault()
    document.getElementById('filterForm').reset()
    this.setState({
      filteredTableData: this.state.data,
      filterForm: null,
    })
  }

  render(){
    const properties = this.getKeys()
    const filteringType = this.state.filterForm
    const formDisplay = filteringType == null ? null : <form id='filterForm'> {filteringType.charAt(0).toUpperCase() + filteringType.slice(1)} <input onChange={(event) => this.handleFilterChange(event)} name={filteringType} placeholder='filtering...'/> <button onClick={(event) => this.resetTableData(event)}>clear filtering</button></form>
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
              <Button onClick={(event) => this.filterFormDisplay(event)}>id</Button>
              <Button onClick={(event) => this.filterFormDisplay(event)}>pdf</Button>
              <Button onClick={(event) => this.filterFormDisplay(event)}>text</Button>
              <Button onClick={(event) => this.filterFormDisplay(event)}>url</Button>
              <Button onClick={(event) => this.filterFormDisplay(event)}>impressions</Button>
              <Button onClick={(event) => this.filterFormDisplay(event)}>clicks</Button>
              <Button onClick={(event) => this.filterFormDisplay(event)}>image</Button>
            </Button.Group>

            {formDisplay}
            {/* <form>
              Id: <input onChange={(event) => this.handleFilterChange(event)} name='id' placeholder='filtering...'/><br/>
              Pdf: <input onChange={(event) => this.handleFilterChange(event)} name='pdf' placeholder='filtering...'/><br/>
              Text: <input onChange={(event) => this.handleFilterChange(event)} name='text' placeholder='filtering...'/><br/>
              Url: <input onChange={(event) => this.handleFilterChange(event)} name='url' placeholder='filtering...'/><br/>
              Image: <input onChange={(event) => this.handleFilterChange(event)} name='image' placeholder='filtering...'/>
            </form> */}
            

            <DataDisplayTable data={this.state.filteredTableData.length == 0 ? this.state.data : this.state.filteredTableData} properties={properties} displayCallback={this.displayCallback}/>
          </div>
            :
          <DataDisplay displayObject={this.state.displayObject} backToDisplayTable={this.backToDisplayTable}/>
        }
      </div>
    );
  }
}

export default App;
