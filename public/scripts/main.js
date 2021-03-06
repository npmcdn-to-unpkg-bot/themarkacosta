
import Isvg from 'react-inlinesvg'
import {Home} from './components/home.js';
import {About} from './components/about.js';
import {Contact} from './components/contact.js';
import {Skills} from './components/skills.js';
import {Projects} from './components/projects.js';
import {Nav, items, socials} from './components/nav.js'
import {gunk , drawText, positionParticles} from './plugins/gunk.js';
import {particle} from './plugins/particle.js';
import {load} from './plugins/load.js';





class TheMarkAcosta extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'Home',
      particles: [],
      ctx: null,
      keyword: "I'm Mark ,",
      W:0,
      H:0,
      minDist: 6,
      imageData: null,
      firstLoad:true,
      firstLoadHome: true

    }

  }

  componentDidMount(){
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    var isEdge = !isIE && !!window.StyleMedia;
       var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0; 
      if(!isEdge && !isSafari){
        gunk(this);
        particle();
      }
  }

  update(state){
	 this.setState({activeItem: state})  	
   this.setState({firstLoad: false})
   this.setState({firstLoadHome: false})
    this.setState({particles: []});
   
  }


  render() {
    var isFirefox = typeof InstallTrigger !== 'undefined';
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    var isEdge = !isIE && !!window.StyleMedia;
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;

    if(!this.state.firstLoadHome){

      $('#content-cover').show();
      if(!isEdge && !isFirefox && !isSafari){
        drawText(this);
         positionParticles(this);
      }


      setTimeout(() => {
          load();
        }, 200)      

    } 

  	var h = null;

    if(this.state.activeItem == 'Home' )
    {
      if(!isFirefox&& isSafari)
      $($('canvas')[1]).show() ;    
      h = <Home  first={this.state.firstLoad} onUpdate={this.update.bind(this)} />
    }
  	else if( this.state.activeItem == "About"){
      if(!isFirefox && !isSafari)
      $($('canvas')[1]).hide();  		
      h = <About onUpdate={this.update.bind(this)} />
    }
  	else if( this.state.activeItem == "Skills"){
      if(!isFirefox && !isSafari)
      $($('canvas')[1]).hide();  		
      h = <Skills />  		
    }
  	else if( this.state.activeItem == "Projects"){
      if(!isFirefox && !isSafari)
      $($('canvas')[1]).hide();  		
      h = <Projects />
    }
  	else if( this.state.activeItem == "Contact"){
      if(!isFirefox && !isSafari)
        $($('canvas')[1]).hide() ; 		
      h =  <Contact />  
    }
  	else{h = <h1>Invalid Choice</h1>}  		  		  	

    return (
    <span>
       <p id="breadcrumb">{'<' + this.state.activeItem + '/>'}</p>    
       <div id="nav">
  	      <div id="nav-container">
  	      	<Nav onUpdate={this.update.bind(this)} items={items} socials={socials}/>
  	      </div>
       </div>
       <div id="content">
         {h}
         <span id="load">
            <div id="load-brand"><Isvg src="/assets/themarkacosta.svg"></Isvg></div>
         
            <p id="load-text">Mark is thinking</p>
            <div id="progress-bar"><span id="progress"></span></div>
         </span>
         <span id="content-cover"></span>
       </div>
       <span style={{position: 'absolute',top: '0'}} id="particlesjs"></span>
    </span>
    )
  }
}

ReactDOM.render(
 <TheMarkAcosta  />

 ,
  document.getElementById('the-mark-acosta')
);
