package com.saccess.allergyservice.dto;

import com.saccess.allergyservice.entities.Allergy;

import java.util.List;

public record FullResponse(
        Userdto user,
        List<Allergy> alerrgys

) {
}
