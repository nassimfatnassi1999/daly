package com.saccess.feedBack.dto;

public record Restodto( long id_restaurant
        ,String name,
         String logo,
         float waitTime,
         boolean isEcoFriendly,
        String contactInfo) {

}
