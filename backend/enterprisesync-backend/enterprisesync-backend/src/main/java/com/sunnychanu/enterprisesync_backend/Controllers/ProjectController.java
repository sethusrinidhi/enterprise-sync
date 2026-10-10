package com.sunnychanu.enterprisesync_backend.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sunnychanu.enterprisesync_backend.ProjectRequest;
import com.sunnychanu.enterprisesync_backend.Model.Organization;
import com.sunnychanu.enterprisesync_backend.Model.Project;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*")
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private OrganizationRepository organizationRepository;

    // Get all projects for an organization
    @GetMapping("/org/{orgId}")
    public List<Project> getProjectsByOrganization(@PathVariable Long orgId) {
        return projectRepository.findByOrganizationId(orgId);
    }

    // Create a new project
    @PostMapping
    public ResponseEntity<?> createProject(@RequestBody ProjectRequest request) {
        Organization org = organizationRepository.findById(request.getOrganizationId())
                .orElseThrow(() -> new RuntimeException("Organization not found"));

        Project project = Project.builder()
                .organization(org)
                .name(request.getName())
                .projectKey(request.getProjectKey())
                .description(request.getDescription())
                .build();

        Project savedProject = projectRepository.save(project);
        return ResponseEntity.ok(savedProject);
    }
}