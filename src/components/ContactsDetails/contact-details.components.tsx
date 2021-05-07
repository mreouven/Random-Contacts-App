import React from "react";
import { connect } from "react-redux";
import { Text, Image, ScrollView, Linking } from "react-native";

import { ContactApiService, IContact } from "../../shared/api/contact.service";
import { ContactDetailsStyles } from "./contact-detail.styles";

interface ContactDetailsState {
  isLoading: boolean;
  contact: IContact;
}

class ContactDetails extends React.Component<any, ContactDetailsState> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      contact: this.props.route.params.contact,
    };
  }
  componentDidMount() {
    console.log(this.props.contact);
    this.props.navigation.setOptions({ title: `${this.state.contact.firstName} ${this.state.contact.lastName}` });
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
        style={ContactDetailsStyles.scrollview_container}
      >
        <Image
          style={ContactDetailsStyles.image}
          source={{ uri: this.state.contact.image }}
        />

        <Text style={ContactDetailsStyles.default_text}>
          {this.state.contact.firstName} {this.state.contact.lastName}
        </Text>
        <Text style={ContactDetailsStyles.link} onPress={()=>{Linking.openURL('mailto:'+this.state.contact.email)}}>
          {this.state.contact.email}
        </Text>
        <Text style={ContactDetailsStyles.link} onPress={()=>{Linking.openURL('tel:'+this.state.contact.phone)}}>
          {this.state.contact.phone}
        </Text>

        <Text style={ContactDetailsStyles.default_text} >
          {this.state.contact.address}
        </Text>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts,
  };
};

export default connect(mapStateToProps)(ContactDetails);
