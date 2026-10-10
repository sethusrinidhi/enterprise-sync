package com.sunnychanu.enterprisesync_backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface IssueRepository extends JpaRepository<Issue, Long> {
    List<Issue> findByProjectId(Long projectId);
    List<Issue> findBySprintId(Long sprintId);
    List<Issue> findByAssigneeId(Long assigneeId);
}