package com.saccess.feedBack.repositories;

import com.saccess.feedBack.dto.UFeedback;
import com.saccess.feedBack.entities.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.saccess.feedBack.dto.Restodto;
import java.time.LocalDate;
import java.util.Date;
import java.util.Scanner;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.repository.query.Param;
@Repository
public interface IFeedBackRepository extends JpaRepository<Feedback,Long> {


  @Query("SELECT f FROM Feedback f ORDER BY f.UpdatedAt DESC")
  List<Feedback> findAllByOrderByUpdatedAtDesc();

  @Query("SELECT  f from Feedback f  where f.user_id =:userid ")
  public List<Feedback> getAllFeedbackbyUserId(@Param("userid") Long userid);

 // @Query("SELECT f, r.name FROM Feedback f JOIN Restodto r ON r.id_restaurant = f.id_restaurant WHERE f.user_id = :userId")
  //public List<Object[]> getAllFeedbackAndRestaurantNamesByUserId(@Param("userId") Long userId);


}
