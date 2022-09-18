import PropTypes from 'prop-types';
import {useState } from 'react';
//іконки та стилі
import { FiPlus } from 'react-icons/fi';
import s from './ContactForm.module.css';

export const ContactForm =({onSubmit})=> {
 const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  //беремо знач з інпут та оновл useState
  const handleChangeName = evt => {
    const value = evt.currentTarget.value;
    setName(value);
  };
  
  const handleChangeNumber= evt => {
    const value = evt.currentTarget.value;
    setName(value);
  };

   // Отрим знач з форми

  const handleSubmit = evt => {
     evt.preventDefault();
     onSubmit({name, number});
     resetForm();
  };
  
  //очищаємо інпут форми
const resetForm = () => {
  setName('');
  setNumber('');
};
  
//return
      return (
      <form className={s.contactForm} onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={handleChangeName}
          />
        </label>

        <label>
          Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={handleChangeNumber}
          />
        </label>
        <button type="submit" className={s.button}>
          
          <FiPlus style={{ color: 'green', paddingRight: 10, fontSize:18 }} />
          Add contact
        </button>
      </form>
    );
  
  
  };




ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};