package com.saccess.allergyservice.repositories;

import com.saccess.allergyservice.entities.Allergy;
import com.saccess.allergyservice.entities.Level;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IAllergyRepository extends JpaRepository<Allergy,Long> {
    public Allergy getAllergyByName(String name);
    @Query("select a from Allergy a where a.level=:level")
    public List<Allergy> getAllergyByLevel(@Param("level") Level level);
    @Query("select a from Allergy a where a.date between :startDate AND :endDate")
    public List<Allergy> getTotalAllergiesByDateRange(@Param("startDate") LocalDate startDate,@Param("endDate") LocalDate endDate);
     @Query("SELECT  a from Allergy a where a.id_user =:userid")
    public List<Allergy> getAllAleergybyUserId(@Param("userid") Long userid);

}
