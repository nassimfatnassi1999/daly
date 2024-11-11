package com.saccess.forumservice.services;

import com.saccess.forumservice.Entities.Report;

import java.util.List;

public interface IGestionReport {
    Report retreiveReport(Long idReport);
    List<Report> retrieveAllReport();
    Report addReport(Report report);
    Report updateReport(Report report);
    void removeReport(Long idReport);
    Report AddReportAndAssignToUserAndPost(Report report, Long userId, Long idPost);
    int getReportsCountForPost(Long postId);
    //Report existsBySignalantIdAndPostId(Long signalantId, Long postId);
    boolean isReportedByUser(Long postId, Long userId);
    Long findReportIdByPostIdAndUserId(Long postId, Long userId);
}
