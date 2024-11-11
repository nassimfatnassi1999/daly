package com.saccess.allergyservice.dto;

public record Userdto(
        Long id,
        String firstName,
        String lastName,
        String email,
        String preferences
    ) {
}
