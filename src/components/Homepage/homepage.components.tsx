import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  View,
  Button,
  FlatList,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";

import { ContactApiService, IContact } from "../../shared/api/contact.service";
import { HomePageStyles } from "./homepages.styles";

const Item = ({ name, image }) => (
  <View style={HomePageStyles.container}>
    <Image style={HomePageStyles.image} source={{ uri: image }} />
    <Text style={HomePageStyles.textBold}>{name}</Text>
  </View>
);

interface MyState {
  isLoading: boolean;
  contact: IContact[];
}

class HomePage extends React.Component<any, MyState> {
  constructor(props) {
    super(props);
    this.state = {
      contact: [],
      isLoading: true,
    };
  
  }


  componentDidMount() {
    this.loadContacts();
    this.props.navigation.setOptions({ headerTitle:props=> <Text style={HomePageStyles.header} onPress={this.reloadData.bind(this)}>Randomize Me!</Text> });


  }
  private loadContacts() {
    //Initilalize loader
    this.setState({ isLoading: true });
    ContactApiService.getSingleContact()
      .then((data: IContact) => {
        if (data && this.state.contact.length <= 8) {
          this.loadContacts();
        } else {
          this.setState({ ...this.state, isLoading: false });
          const action = { type: "ADD", value: this.state.contact }
          this.props.dispatch(action)
        }
        this.setState({
          contact: [...this.state.contact, data],
        });
      })
      .catch(() => {
        this.loadContacts();
      });
  }
  private loadContact() {
    //Best practice but doesn't work because there are problems with the api when I sent all request instantly (cors block policy)
    this.setState({ isLoading: true });
    ContactApiService.LoadMultipleContacts().then((data) => {
      this.setState({
        contact: [...this.state.contact, ...data],
        isLoading: false,
      });
    });
  }

  reloadData() {
    //Empty our current state
    this.setState({ contact: [] });
    const action = { type: "REFRESH" }
    this.props.dispatch(action)
    //Retrieve new data
    this.loadContacts();
  }


  private displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={HomePageStyles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }

  private displayDetailForContact(contact) {
    //Using React Navigation to go to the child view
    this.props.navigation.navigate(
      "ContactDetails",
      { contact },
      { title: contact.firstName }
    );
  }

  renderItem({ item }: { item: IContact }) {
    return (
      <TouchableOpacity
        style={HomePageStyles.item}
        onPress={(event) => {
          this.displayDetailForContact(item);
        }}
      >
        <Item name={`${item.firstName} ${item.lastName}`} image={item.image} />
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View style={HomePageStyles.main_container}>
       
        <FlatList
          data={this.state.contact}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-around" }}
          keyExtractor={(item) => item.email.toString()}
          renderItem={this.renderItem.bind(this)}
        />
        {this.displayLoading()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts,
  };
};

export default connect(mapStateToProps)(HomePage);
