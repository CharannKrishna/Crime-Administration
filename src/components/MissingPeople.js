import * as firebase from 'firebase';
import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
//import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { Search } from '../store/action/auth'
import { connect } from 'react-redux'


const style = {
  //height: 100,
  //width: 100,
  margin: 20,
 // textAlign: 'center',
  // display: 'inline-block',
    display: 'block-inline',
  height: 'auto',
  width: 'auto',
  padding: 20,
  backgroundColor: '#BDBDBD'
  
};

class MissingPeopleList extends Component {
    constructor(){
        super();

        this.state = {
          //  missingPeopleList: [],
             arr: []
        }
         this.onSearch = this.onSearch.bind(this)
    }
    
    //working code
     onSearch(e) {
        let _self = this;
        e.preventDefault()
       // let ref = DBfirebase.ref.child("/donors");
        let ref = firebase.database().ref().child('/missingPeople');
        _self.arr = [];
       
    // ref.orderByChild(this.refs.selectedBlood.value).equalTo(true).once('value', function (snapshot) {
       //   ref.orderByChild('bloodgroup').equalTo("A+").once('value', function (snapshot) {
        console.log(this.refs.selectedCity.value)
          ref.orderByChild('city').equalTo(this.refs.selectedCity.value).once('value', function (snapshot) {
                
                        

            snapshot.forEach(childSnapshot => {

                _self.arr.push(childSnapshot.val())
                console.log("arr", _self.arr)
                
            })
            _self.props.serachPeople(_self.arr)
            _self.setState({
                arr: _self.props.storeReducer.missingPeople
                
            })
        });
  }

    render() {
        return (
            <div > 

                <center>
                     <h1 className="h1">Missing People List</h1>
                    <br /><br />


                               <form onSubmit={this.onSearch}>
                     <select name="city"
                       // value={this.props.signUpState.city}
                        required
                      //  onChange={this.props._inputHandler}
                      ref="selectedCity"
                      >
                        <option> City   </option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Kolkata">Kolkata</option>
                        <option value="New Delhi">New Delhi</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Pune">Pune</option>
                        <option value="Ahmedabad">Ahmedabad</option>
                        <option value="Kochi">Kochi</option>
                        <option value="Vizag">Vizag</option>
                    </select><br /><br />

                    <button onClick={this.onSearch} type="submit" > Find </button>
                      </form><br /><br />
</ center>
{console.log("this.state.arr", this.state.arr)}
               {this.state.arr.map((m, i) => {
                    return(
                      <div>
                    
                        <Paper style={style} zDepth={5} > 
                        <strong>Name:</strong> {m.missingPersonName} <br />
                       <strong> City:</strong> {m.city}<br /> 
                       <strong> Gender:</strong> {m.gender}<br />
                        <strong>Age:</strong> {m.age}<br />
                        <strong>Details:</strong> {m.missingDetails}<br />
                        <strong>Informer Name:</strong> {m.informerName}<br />
                        <strong>Informer Mobile:</strong> {m.informerMobile}<br />
                        </Paper>                     
                   </div>
  )
                })
                  
                }

            </div>
        );
    }
}


const mapStateToProps = (state) => { 
     console.log(state.MissingPeopleReducer)
    return {
        storeReducer: state.MissingPeopleReducer
    }
}
const mapDispatchToProps = (dispatch) => {
        return {
        serachPeople: (data) => {
            console.log(data)
            dispatch(Search(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MissingPeopleList);

