package com.saccess.allergyservice.repositories;

import com.saccess.allergyservice.entities.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IContactRespository extends JpaRepository<Contact,Long> {
    List<Contact> findAllByOrderByDateDesc();
}
