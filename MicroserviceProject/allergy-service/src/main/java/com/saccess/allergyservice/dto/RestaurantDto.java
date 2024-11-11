package com.saccess.allergyservice.dto;

public record RestaurantDto(
        Long id,
        String name,
        String logo,
        float averageRating,
        float waitTime,
        String contactInfo,
        boolean delivery
) {}