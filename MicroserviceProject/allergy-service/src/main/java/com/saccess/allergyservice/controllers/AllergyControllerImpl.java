package com.saccess.allergyservice.controllers;

import com.saccess.allergyservice.dto.DishDto;
import com.saccess.allergyservice.dto.FullAllergyUser;
import com.saccess.allergyservice.dto.FullResponse;
import com.saccess.allergyservice.dto.Userdto;
import com.saccess.allergyservice.entities.Allergy;
import com.saccess.allergyservice.entities.Contact;
import com.saccess.allergyservice.entities.Level;
import com.saccess.allergyservice.services.IGestionAllergy;
import com.saccess.allergyservice.services.IGestionContact;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/allergy")
@AllArgsConstructor
//@CrossOrigin("*")
public class AllergyControllerImpl {
IGestionAllergy gestionAllergy;
IGestionContact gestionContact;
    @GetMapping("/get")
    public List<Allergy> getAll(){
        return gestionAllergy.retrieveAllAllergy();
    }
    @GetMapping("/getAllergybyid/{id}")
    public Allergy getAllergyById(@PathVariable("id") Long id_Allergy){
        return gestionAllergy.retrieveAllergy(id_Allergy);
    }
    @PutMapping("/update")
    public Allergy updateAllergy(@RequestBody Allergy allergy){
        return gestionAllergy.updateAllergy(allergy);
    }
    @PostMapping("/add")
    public Allergy AddAllergy(@RequestBody Allergy allergy){
        return gestionAllergy.addAllergy(allergy);
    }
    //@CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/delete/{id}")
    public void deleteallergy(@PathVariable("id") Long id_allergy){
        gestionAllergy.removeAllergy(id_allergy);
    }

    @GetMapping("/getAllergybyLevel/{level}")
    public FullAllergyUser getAllergyBylevel(@PathVariable("level")Level level){
        return  gestionAllergy.getAllergyLevel(level);
    }
    @GetMapping("/getUserById/{id}")
    public Userdto getUserById(@PathVariable("id")Long id){
        return gestionAllergy.findUserById(id) ;
    }
    @GetMapping("/getTotalAll/{datede}/{datefin}")
    public int  getTotalAllergiesByDateRange(@PathVariable("datede") LocalDate datedebut,@PathVariable("datefin") LocalDate dateFin){
        return gestionAllergy.getTotalAllergiesByDateRange(datedebut,dateFin) ;
    }

    @GetMapping("/getFullResponse/{id}")
    public FullResponse getAllAllergybyUserid(@PathVariable("id") Long id){
        return gestionAllergy.getUserAndAllergy(id);
    }
    @GetMapping("/getAllUsers")
    public List<Userdto> getAllUsers(){return gestionAllergy.getAllUsers();}
    @GetMapping("/getAllUsersAllery")
    public FullAllergyUser getAllUsersAllergy(){return gestionAllergy.getAllUserAllergy();}
    @DeleteMapping("/deletebyuserid/{id}")
    public void deleteallergybyuserid(@PathVariable("id") Long id_user){
        gestionAllergy.deleteAllegiesByUserId(id_user);
    }
    @GetMapping("/getreccomanded/{id_user}")
    public List<DishDto> getReccomanded(@PathVariable("id_user") Long id_user){
        return gestionAllergy.getRecomendation(id_user);
    }
    @PostMapping("/addContact")
    public Contact Addcontact(@RequestBody Contact contact){
        return gestionContact.addcontact(contact);
    }
    @DeleteMapping("/deletecontact/{id}")
    public void deletecontact(@PathVariable("id") Long id_contact){
        gestionContact.removeContact(id_contact);
    }
    @GetMapping("/getconatct")
    public List<Contact> getAllConatct(){
        return gestionContact.retrieveContact();
    }
}
