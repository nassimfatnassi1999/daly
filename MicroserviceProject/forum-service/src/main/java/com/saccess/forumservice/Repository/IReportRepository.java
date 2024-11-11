package com.saccess.forumservice.Repository;
import com.saccess.forumservice.Entities.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface IReportRepository extends JpaRepository<Report, Long> {

    @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END FROM Report r WHERE r.signalantId = :signalantId AND r.post.idPost = :postId")
    boolean existsBySignalantIdAndPostId(@Param("signalantId") Long signalantId, @Param("postId") Long postId);
    @Query("SELECT COUNT(r) FROM Report r WHERE r.post.idPost = ?1")
    int countReportsByPostId(Long postId);


    @Query("SELECT r.idReport FROM Report r WHERE r.post.idPost = :postId AND r.signalantId = :signalantId")
    Long findReportIdByPostIdAndSignalantId(@Param("postId") Long postId, @Param("signalantId") Long signalantId);

}
