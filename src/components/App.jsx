import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Contacts } from 'components/Contacts/Contacts';
import { ContactAddForm } from 'components/ContactAddForm/ContactAddForm';
import { Filter } from 'components/Filter/Filter';
import { Header, SecondHeader, Section } from './App.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    if (contacts) {
      const parsedContacts = JSON.parse(contacts);
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  deleteContact = e => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(
        contact => contact.id !== e.target.id
      ),
    }));
  };

  filterChange = e => {
    this.setState({ filter: e.target.value });
  };

  contactsChange = (name, number) => {
    this.setState(prevState => {
      if (
        prevState.contacts.find(contact =>
          contact.name.toLowerCase().includes(name.toLowerCase())
        )
      ) {
        return Notify.warning(`${name} is already in contacts`);
      }
      return {
        contacts: [
          ...prevState.contacts,
          { name: name, number: number, id: nanoid() },
        ],
      };
    });
  };

  render() {
    return (
      <>
        <Section>
          <Header>Phonebook</Header>

          <ContactAddForm contactsChange={this.contactsChange} />
          <SecondHeader>Contacts</SecondHeader>
          <Filter filterChange={this.filterChange} />
          <Contacts
            contacts={this.state.contacts}
            filter={this.state.filter}
            deleteContact={this.deleteContact}
          />
        </Section>
      </>
    );
  }
}
