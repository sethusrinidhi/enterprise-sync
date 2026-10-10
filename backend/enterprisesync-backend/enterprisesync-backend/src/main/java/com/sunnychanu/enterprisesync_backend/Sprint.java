package com.sunnychanu.enterprisesync_backend;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

import com.sunnychanu.enterprisesync_backend.Model.Project;

@Entity
@Table(name = "sprints")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Sprint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    private SprintStatus status = SprintStatus.PLANNED;

    public enum SprintStatus {
        PLANNED, ACTIVE, COMPLETED
    }
}