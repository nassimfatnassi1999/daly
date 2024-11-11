package com.saccess.allergyservice.services;

import com.saccess.allergyservice.dto.DishDto;
import com.saccess.allergyservice.dto.FullAllergyUser;
import com.saccess.allergyservice.dto.FullResponse;
import com.saccess.allergyservice.dto.Userdto;
import com.saccess.allergyservice.entities.Allergy;
import com.saccess.allergyservice.entities.Level;

import java.time.LocalDate;
import java.util.List;

public interface IGestionAllergy {
    public List<Allergy> retrieveAllAllergy();
    public Allergy addAllergy(Allergy allergy);
    public Allergy updateAllergy (Allergy allergy);
    public Allergy retrieveAllergy (Long id_Allergy);
    void removeAllergy(Long id_Allergy);
    Allergy getAllergyByname(String name);
    FullAllergyUser getAllergyLevel(Level level);
    Userdto findUserById(Long userid);
    public int getTotalAllergiesByDateRange(LocalDate startDate, LocalDate endDate);
    public FullResponse getUserAndAllergy(Long id);
    public List<Userdto> getAllUsers();
    public FullAllergyUser getAllUserAllergy();
    public void deleteAllegiesByUserId(long user_id);

    List<DishDto> getRecomendation(Long userId);
}
