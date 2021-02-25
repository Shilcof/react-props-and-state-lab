import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  baseURL = () => '/api/pets'

  onChangeType = (type) => {
    this.setState(state=>({
      filters: {
        ...state.filters, type
      }
    }))
  }

  onFindPetsClick = () => {
    const extension = this.state.filters.type === "all" ? "" : `?type=${this.state.filters.type}`
    fetch(this.baseURL() + extension)
      .then(res=>res.json())
      .then(pets=>this.setState(state=>({pets})))
  }

  onAdoptPet = (id) => {
    console.log(id)
    const pets = this.state.pets.map(p=>(
      (p.id === id ? {...p, isAdopted: true} : p)
    ))
    this.setState(state=>({
      pets: pets
    }))
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
