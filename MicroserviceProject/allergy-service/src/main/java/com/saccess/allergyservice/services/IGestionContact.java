package com.saccess.allergyservice.services;

import com.saccess.allergyservice.entities.Allergy;
import com.saccess.allergyservice.entities.Contact;

import java.util.List;

public interface IGestionContact {
    public Contact addcontact(Contact contact);
    void removeContact(Long id_contact);
    public List<Contact> retrieveContact();
}
