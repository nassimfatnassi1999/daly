package com.saccess.allergyservice.dto;

import com.saccess.allergyservice.entities.Allergy;

import java.util.List;

public record FullAllergyUser(
        List<Userdto> userdtos,
        List<Allergy> alerrgys
) {
}
