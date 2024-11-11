package com.saccess.allergyservice.services;

import com.saccess.allergyservice.dto.Userdto;
import com.saccess.allergyservice.entities.Contact;
import com.saccess.allergyservice.repositories.IContactRespository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
@AllArgsConstructor
@Service
public class GestionContactImpl implements IGestionContact {
    @Autowired
    IContactRespository gestionContact;
    @Override
    public Contact addcontact(Contact contact) {
        contact.setDate(LocalDate.now());
        String email= contact.getMail();
        sendContactNotification(email);
        return gestionContact.save(contact);
    }

    @Override
    public void removeContact(Long id_contact) {
        gestionContact.deleteById(id_contact);

    }

    @Override
    public List<Contact> retrieveContact() {
        return gestionContact.findAllByOrderByDateDesc();
    }
    @Autowired
    private JavaMailSender emailSender;
    public  void sendContactNotification(String toEmail) {
        SimpleMailMessage message  = new SimpleMailMessage();
        message.setFrom("*-----*-----*----*");
        message.setSubject("Confirmation de réception de votre Contact");
        message.setTo(toEmail);
        message.setText(  "\"Cher utilisateur,\" \n" +
                "                \"Nous avons bien reçu votre CONTACT et nous vous en remercions. Votre opinion est précieuse pour nous \" \n" +
                "                \"et nous l'utiliserons pour améliorer nos services. Si vous avez d'autres questions ou commentaires, \" \n" +
                "                \"n'hésitez pas à nous contacter.\"\n" +
                "                \"Cordialement,\" \n" +
                "                \"ESPREAT\"");
        emailSender.send(message);
    }
}
