package com.saccess.forumservice.services;
import com.saccess.forumservice.Entities.Post;
import com.saccess.forumservice.Entities.Report;
import com.saccess.forumservice.Repository.IPostRepository;
import com.saccess.forumservice.Repository.IReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class GestionReportImpl implements IGestionReport {
    @Autowired
    IReportRepository reportRep;
    @Autowired
    IPostRepository postRep;



    @Override
    public List<Report> retrieveAllReport() {
        return reportRep.findAll();
    }
    @Override
    public void removeReport(Long idReport) {
        reportRep.deleteById(idReport);
    }

    @Override
    public Report AddReportAndAssignToUserAndPost(Report report, Long userId, Long idPost) {

        if (!postRep.existsById(idPost)) {
            throw new RuntimeException("Post with ID " + idPost + " does not exist.");
        }
        Post post = postRep.findById(idPost).get();
        report.setPost(post);
        report.setSignalantId(userId);
        report.setReportDate(LocalDate.now());
        return reportRep.save(report);
    }
    @Override
    public Report retreiveReport(Long idReport) {
        return reportRep.findById(idReport).get();
    }
    @Override
    public Report addReport(Report report) {
        return reportRep.save(report);
    }

    @Override
    public Report updateReport(Report report) {
        return reportRep.save(report);
    }



    @Override
    public int getReportsCountForPost(Long postId) {
        return reportRep.countReportsByPostId(postId);
    }

    @Override
    public boolean isReportedByUser(Long postId, Long userId) {
        return reportRep.existsBySignalantIdAndPostId(userId, postId);
    }

    @Override
    public Long findReportIdByPostIdAndUserId(Long postId, Long userId) {
        return reportRep.findReportIdByPostIdAndSignalantId(postId, userId);
    }
}





