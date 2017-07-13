import React from 'react';
import {connect} from 'react-redux';
import {fetchRestaurant} from '../actions/hungry';
import NeverList from './never-list';

export class HungryList extends React.Component {
//send restaurant request
  submitQuery(event){
    event.preventDefault();
    const value = this.input.value;
    console.log(value);
    this.props.dispatch(fetchRestaurant(value));
    this.value="";
  }

  render() {
    if(this.props.error) {
      return <div>{this.props.error}</div>;
    }
    if(this.props.loading) {
      return <div>Loading...</div>
    }
    //map through the list of restaurants and display restaurant info
    const restaurants = this.props.restaurants.map((restaurant, index) => {
      return (
         <li key={restaurant.id}>
            Restaurant: {restaurant.name}<br/>
            Type: {restaurant.categories[0].title}<br/>
            Address: {restaurant.location.display_address}<br/>
            Contact: {restaurant.display_phone}
        </li>
  )});

  return (
    <div className="root">
      <h1 className="headertxt">I'm Hungry</h1>
      <h2> Hungry but you don't know what you want to eat? Have no fear the I'm hungry app is here.
      Just enter your city or zipcode and we will find a restaruant for you. If a restaurnt shows up that you don't like
      simply hit the never button and it will never show up again. If you like it hit the yes button and you will be given directions.
      </h2>
      <form onSubmit={(e)=>this.submitQuery(e)}>
      <input type="text" name="city" className="City" placeholder="city or zipcode" ref={input => this.input = input}/>

      <button type="submit" id="search">Search by City or ZipCode</button>
      </form>
    <ul>
      {restaurants}
    </ul>
    <NeverList restaruantProps={this.props.restaurants}/>

    </div>
    )

}

}
export const mapStateToProps = (state) => ({
  restaurants: state.restaurants
});

export default connect(mapStateToProps)(HungryList);
