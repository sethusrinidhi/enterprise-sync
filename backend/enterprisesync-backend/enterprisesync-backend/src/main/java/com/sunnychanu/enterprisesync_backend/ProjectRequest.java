package com.sunnychanu.enterprisesync_backend;

import lombok.Data;

@Data
public class ProjectRequest {
    private Long organizationId;
    private String name;
    private String projectKey;
    private String description;
}