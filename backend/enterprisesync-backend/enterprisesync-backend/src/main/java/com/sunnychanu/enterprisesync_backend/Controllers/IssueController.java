package com.sunnychanu.enterprisesync_backend.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sunnychanu.enterprisesync_backend.IssueRequest;
import com.sunnychanu.enterprisesync_backend.Sprint;
import com.sunnychanu.enterprisesync_backend.Model.Issue;
import com.sunnychanu.enterprisesync_backend.Model.Project;
import com.sunnychanu.enterprisesync_backend.Model.User;
import com.sunnychanu.enterprisesync_backend.Model.Issue.IssueType;
import com.sunnychanu.enterprisesync_backend.Model.Issue.Priority;
import com.sunnychanu.enterprisesync_backend.Model.Issue.Status;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
@CrossOrigin(origins = "*")
public class IssueController {

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private SprintRepository sprintRepository;

    @Autowired
    private UserRepository userRepository;

    // Get all issues for a specific project
    @GetMapping("/project/{projectId}")
    public List<Issue> getIssuesByProject(@PathVariable Long projectId) {
        return issueRepository.findByProjectId(projectId);
    }

    // Create a new issue (Task, Bug, or Story)
    @PostMapping
    public ResponseEntity<?> createIssue(@RequestBody IssueRequest request) {
        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));

        Sprint sprint = null;
        if (request.getSprintId() != null) {
            sprint = sprintRepository.findById(request.getSprintId())
                    .orElse(null);
        }

        // Setting a default system reporter if not passed
        User reporter = userRepository.findAll().stream().findFirst()
                .orElseThrow(() -> new RuntimeException("No users found in system to act as reporter"));

        User assignee = null;
        if (request.getAssigneeId() != null) {
            assignee = userRepository.findById(request.getAssigneeId()).orElse(null);
        }

        Issue issue = Issue.builder()
                .project(project)
                .sprint(sprint)
                .reporter(reporter)
                .assignee(assignee)
                .title(request.getTitle())
                .description(request.getDescription())
                .issueType(request.getIssueType() != null ? request.getIssueType() : Issue.IssueType.TASK)
                .priority(request.getPriority() != null ? request.getPriority() : Issue.Priority.MEDIUM)
                .status(request.getStatus() != null ? request.getStatus() : Issue.Status.TO_DO)
                .build();

        Issue savedIssue = issueRepository.save(issue);
        return ResponseEntity.ok(savedIssue);
    }

    // Update issue status (Useful for Kanban drag-and-drop updates)
    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateIssueStatus(@PathVariable Long id, @RequestParam Issue.Status status) {
        Issue issue = issueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Issue not found"));

        issue.setStatus(status);
        Issue updatedIssue = issueRepository.save(issue);
        return ResponseEntity.ok(updatedIssue);
    }
}