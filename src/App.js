import React, { Component } from 'react';
import Particles from 'react-particles-js';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import SignIn from './Components/SignIn/SignIn'
import Rank from './Components/Rank/Rank';
import Register from './Components/Register/Register'
import './App.css';
import 'tachyons';

const particlesOptions = {
  particles: {
   number: { 
     value:500, 
     density:{ 
       enable:true, 
       value_area: 4000
     }
   }
}
}

const initialState = { 
  input: '',
  imageUrl: '',
  box: {},
  route: 'signIn',
  isSignedIn: false,
  user: { 
    id: '', 
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor(){ 
    super(); 
    this.state = { 
      input: '',
      imageUrl: '',
      box: {},
      route: 'signIn',
      isSignedIn: false,
      user: { 
        id: '', 
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  resetState = () => { 
    this.setState(this.baseState)
  }

  loadUser = (data) => { 
    this.setState({ user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => { 
    this.setState({box: box})
  }

  onInputChange = (event) => { 
     this.setState({input: event.target.value}); 
  }

  onSubmit = () => { 
    this.setState({imageUrl: this.state.input}); 
    fetch('https://mighty-temple-95378.herokuapp.com/imageurl', { 
       method: 'post',
       headers: {'Content-Type': 'application/json'}, 
       body: JSON.stringify({
         input: this.state.input
       })
     })
     .then(response => response.json())
    .then(response => {
        if (response){
        fetch('https://mighty-temple-95378.herokuapp.com/image', { 
          method: 'put',
          headers: {'Content-Type': 'application/json'}, 
          body: JSON.stringify({
          id: this.state.user.id
         })
        })
        .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

    onRouteChange = (route) => {
      if (route === 'signout') {
        this.setState(initialState)
      } 
      else if (route === 'home') {
        this.setState({isSignedIn: true})
      }
      this.setState({route: route});
    }
  
  render() {
  const { isSignedIn, imageUrl, route, box, user } = this.state;
  return (
    <div className="App">
        <Particles className="particles" params={particlesOptions}/>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/> 
        { route === 'home' ? 
        <React.Fragment>
        <Logo /> 
        <Rank name={user.name} entries={user.entries}/>
        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/> 
        <FaceRecognition box={box} imageUrl={imageUrl}/>
        </React.Fragment>
        : (
             route === 'signIn' ? 
             <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> :
             (route === 'register' ?
             <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> : 
             <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>))
        }
    </div>
  );
 }
}


export default App;
