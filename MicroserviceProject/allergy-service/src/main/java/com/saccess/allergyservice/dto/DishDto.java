package com.saccess.allergyservice.dto;

public record DishDto(long id_dish,String name,String description,float price,String photo,String category,RestaurantDto restaurant){
    public float Rating() {
        return (float) Math.random()*5;
    }
}