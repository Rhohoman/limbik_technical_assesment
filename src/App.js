import React from 'react';
import logo from './logo.svg';
import './App.css';
import { JSONDATA } from './data.js';
import DataDisplayTable from './DataDisplayTable';
import DataDisplay from './DataDisplay';
import { Button, Input } from 'semantic-ui-react';


class App extends React.Component{

  state = {
    data: JSONDATA,
    displayTable: true,
    displayObjectArray: [],
    idSearchValue: '',
    id: '',
    pdf: '',
    text: '',
    url: '',
    image: '',
    filterForm: null,
    filteredTableData: [],
    sorted: false,
  }


  getKeys = () => {
        let dataArray = [...this.state.data]
        let keys = dataArray.map(object => Object.keys(object))[0]

        return keys
  }

  // stretch
  // displayCallback = (dataObject) => {
  //   let displayObjectArrayCopy = [...this.state.displayObjectArray]

  //   displayObjectArrayCopy = [...displayObjectArrayCopy, dataObject]
  //   this.setState((prevState) => ({
  //       displayTable: !prevState,
  //       displayObjectArray: displayObjectArrayCopy,
  //     })
  //   )
  // }


  backToDisplayTable = () => {
    this.setState({
      displayTable: true,
      displayObjectArray: [],
    })
    
  }

  handleIdSearchChange = (event) => {
    this.setState({
      idSearchValue: event.target.value
    })
  }

  handleIdSearchIdSubmit = (event) => {
    event.preventDefault()
    let id = this.state.idSearchValue
    let data = [...this.state.data]
    let searchObject = data.filter(dataObject => dataObject.id == id)[0]
    // debugger
    if (searchObject == null){
      alert('id does not exist')
      return
    }

    this.setState((prevState) => ({
        displayTable: !prevState,
        displayObjectArray: [...this.state.displayObjectArray, searchObject],
      })
    )
  }

  handleFilterChange = (event) => {
    let filterKey = event.target.name
    let filterTerm = event.target.value
    this.setState({
      [event.target.name]: filterTerm
    },() => this.handleDataTableFilter(filterKey,filterTerm))
  }

  handleDataTableFilter = (filterKey,filterTerm) => {
    let data = this.state.data
    let filteredData = []

    if( (filterKey == 'id') || (filterKey == 'impressions') || (filterKey == 'clicks')){
      filteredData = data.filter(obj => obj[filterKey].toString().includes(filterTerm))
      if(filteredData.length == 0){
        alert('no data matches this filter term')
      }
    } else {
      filteredData = data.filter(obj => obj[filterKey] !== null)
      filteredData = filteredData.filter(obj => obj[filterKey].includes(filterTerm))
      if(filteredData.length == 0){
        alert('no data matches this filter term')
      }
    }

    this.setState({
      filteredTableData: filteredData
    })

  }

  filterFormDisplay = (event) => {
    this.setState({
      filterForm: event.target.innerText
    })
  }

  resetTableData = (event) => {
    event.preventDefault()
    document.getElementById('filterForm').reset()
    this.setState({
      filteredTableData: this.state.data,
      filterForm: null,
    })
  }

  sortTableData = (sortType) => {

    let data = [...this.state.data]
    let sortedData = []

    if (sortType == 'impressions'){

      sortedData = this.state.sorted ? data.sort(function(a,b) {return a.impressions - b.impressions}) : data.sort(function(a,b) {return b.impressions - a.impressions})

      this.setState({
        sorted: !this.state.sorted,
        filteredTableData: sortedData,
      })
    } else if (sortType == 'clicks'){
      sortedData = this.state.sorted ? data.sort(function(a,b) {return a.impressions - b.impressions}) : data.sort(function(a,b) {return b.impressions - a.impressions})

      this.setState({
        sorted: !this.state.sorted,
        filteredTableData: sortedData,
      })
    }
  }

  multipleFileSubmit = (event) => {
    event.preventDefault()
    let copydisplayObjectArray = [...this.state.displayObjectArray]
    let id = event.target.querySelector('#multipleFileFormInput').value
    let data = [...this.state.data]

    let submittedObj = data.find(dataObject => dataObject.id == id)

    if (submittedObj != null){
      if(!copydisplayObjectArray.includes(submittedObj)){
        copydisplayObjectArray = [...copydisplayObjectArray,submittedObj]
    
        this.setState({
          displayObjectArray: copydisplayObjectArray,
        })
      } else {
        alert('File with that id has already been added!')
      }
    } else {
      alert('File with that id does not exist.')
    }
  }

  viewMultipleFiles = () => {
    this.setState((prevState) =>({
        displayTable: !prevState,
      })
    )
  }

  deleteFileFromView = (obj) => {
    //find the obj delete the obj from displayobject array
    console.log('deleting this obj: ',obj)
    let copydisplayObjectArray = [...this.state.displayObjectArray]
    let index = copydisplayObjectArray.indexOf(obj)

    copydisplayObjectArray.splice(index,1)

    this.setState({
      displayObjectArray: copydisplayObjectArray
    })

  }

  render(){
    const properties = this.getKeys()
    const filteringType = this.state.filterForm
    const filesArray = [...this.state.displayObjectArray]

    const formDisplay = filteringType == null ? null :
      <form id='filterForm' className='filter-form'>
        {filteringType.charAt(0).toUpperCase() + filteringType.slice(1)}:
        <input id='filterFormInput' onChange={(event) => this.handleFilterChange(event)} name={filteringType} placeholder='filtering...'/>
        <button onClick={(event) => this.resetTableData(event)}>clear filtering</button>
      </form>

    const multipleFilesArrayDisplay = filesArray == null ? null : <div className='button-group-spacing'>
                                                                    {filesArray.map(file => <button className='button-spacing' onClick={() => this.deleteFileFromView(file)}>{file.id}</button>)}
                                                                  </div>
    console.log(filesArray)
    return (
      <div>
        {this.state.displayTable === true ? 
          <div className='center'>
            <form onSubmit={(event) => this.handleIdSearchIdSubmit(event)}  >
              <h3>Search by Id</h3> <Input action={{ icon: 'search' }} placeholder='id here' name='idSearchValue' id='idSearchValue' onChange={(event) => this.handleIdSearchChange(event)}/>
            </form>

            <div>
              <form className='multiple-file-form' onSubmit={(event) => this.multipleFileSubmit(event)}>
                <h3>To view multiple files together type in the Ids here</h3>
                <input id='multipleFileFormInput' placeholder='submit one id at a time'/>
                <button>Submit</button>
              </form>
              {multipleFilesArrayDisplay}
              {filesArray.length == 0 ? null : <button onClick={this.viewMultipleFiles}>Click to view</button>}
            </div>

            <h3>Filtering Options</h3>
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

            {/* <DataDisplayTable data={this.state.filteredTableData.length == 0 ? this.state.data : this.state.filteredTableData} properties={properties} displayCallback={this.displayCallback} sortTableData={this.sortTableData}/> */}
            <DataDisplayTable data={this.state.filteredTableData.length == 0 ? this.state.data : this.state.filteredTableData} properties={properties} sortTableData={this.sortTableData}/>
          </div>
            :
          <DataDisplay displayObjectArray={this.state.displayObjectArray} backToDisplayTable={this.backToDisplayTable} properties={properties}/>
        }
      </div>
    );
  }
}

export default App;
