package com.sunnychanu.enterprisesync_backend;

import com.sunnychanu.enterprisesync_backend.Model.Issue;

import lombok.Data;

@Data
public class IssueRequest {
    private Long projectId;
    private Long sprintId;
    private Long assigneeId;
    private String title;
    private String description;
    private Issue.IssueType issueType;
    private Issue.Priority priority;
    private Issue.Status status;
}