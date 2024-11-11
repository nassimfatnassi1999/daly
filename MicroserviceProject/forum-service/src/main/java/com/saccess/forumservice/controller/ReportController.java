package com.saccess.forumservice.controller;
import com.saccess.forumservice.Entities.Report;
import com.saccess.forumservice.services.IGestionReport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
//@CrossOrigin("*")
@RestController
@RequestMapping("/api/Report")
public class ReportController {
    @Autowired
    IGestionReport gestionReport;
    @GetMapping("/{postId}/isReportedBy/{userId}")
    public boolean isReportedByUser(@PathVariable Long postId, @PathVariable Long userId) {
        return gestionReport.isReportedByUser(postId, userId);
    }
    @PostMapping("/AddReportAndAssignToUserAndPost/{numU}-{numP}")
    public Report AddReportAndAssignToUserAndPost(@RequestBody Report report,
                                                  @PathVariable("numU") Long userId,
                                                  @PathVariable("numP") Long idPost) {
        return gestionReport.AddReportAndAssignToUserAndPost(report, userId, idPost);
    }
    @GetMapping("/getall")
    public List<Report> getall() {
        return gestionReport.retrieveAllReport();}

    @GetMapping("/getId/{id}")
    public Report getId(@PathVariable("id") Long id) {
        return gestionReport.retreiveReport(id);}



    @DeleteMapping("/deleteID/{id}")
    public void delete(@PathVariable("id") long id){
        gestionReport.removeReport(id);
    }


    @GetMapping("/findReportBy/{postId}/{userId}")
    public Long findReportIdByPostIdAndUserId(@PathVariable Long postId, @PathVariable Long userId){
        return gestionReport.findReportIdByPostIdAndUserId(postId, userId);

    }



    @PutMapping ("/update")
    public Report update(@RequestBody Report report){
        return gestionReport.updateReport(report);
    }

    @GetMapping("/getReportsCount/{postId}")
    public int getReportsCountForPost(@PathVariable Long postId) {
        return gestionReport.getReportsCountForPost(postId);
    }
    /* @PostMapping("/ReporterPost")
    public Report reportPost(@RequestBody Report report) {
        if (!gestionReport.existsBySignalantIdAndPostId(report.getSignalantId(), report.getPost().getIdPost())) {
            return gestionReport.addReport(report);
        }
        else return null;
    }*/
}

