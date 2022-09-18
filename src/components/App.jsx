import { useState, useEffect} from 'react';
import { nanoid } from 'nanoid'; //бібл в умові
import { ContactForm } from './ContactForm';
//import { ContactItem } from './Contacts';
import { ContactList } from './Contacts';
import { Filter } from './Filter'
import s from './App.module.css';//загальний контейнер-дів


export const App = () => {
  //перероблюємо стейт на конст. Забираєм useState з localStorage знач для змінних або робимо новий масив 'contacts'
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? []
  });
//для фільтра просто пуста строка як і було
  const [filter, setFilter] = useState('');

//useEffect запис або онвлюємо масив contacts в localStorage при зміні useState contacts
  useEffect(() => {
    window.localStorage.getItem('contacts', JSON.stringify(contacts))
  }, [contacts]);

  //створюємо унікальний айдішник контакту та робимо перевірку на унікальн імя+ тел
  function addContact({ name, number }) {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const normalizeContact = contact.name.toLocaleLowerCase();
 if (contacts.find(({ name }) => name.toLowerCase() === normalizeContact)) {
      return alert(`${name} already exists`);
    }
    if (contacts.find(({ number }) => number === contact.number)) {
      return alert(`${number} already exists`);
    }

    setContacts(prevState => [contact, ...prevState]);
  };

  //фільтр по пошуку конт
  const changeFilter = evt => {
    const search = evt.currentTarget.value;
    setFilter(search)
  };

  //показуєм знайдений контакт по фільтру
  const visibleFilterContacts = () => {
    const normalizeFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  }
  //видаляєм контакт зі списку
  const deleteContact = contactItemId => {
    console.log(contactItemId);
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactItemId)
    );
  };
  //ретьорнимо
  
return (
      <div className={s.container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />

        <ContactList
          contacts={visibleFilterContacts}
          handleDeleteContact={deleteContact}
        />
      </div>
    );
  };

  