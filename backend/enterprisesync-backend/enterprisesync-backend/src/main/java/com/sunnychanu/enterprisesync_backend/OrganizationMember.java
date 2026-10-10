package com.sunnychanu.enterprisesync_backend;

import com.sunnychanu.enterprisesync_backend.Model.Organization;
import com.sunnychanu.enterprisesync_backend.Model.User;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "organization_members")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrganizationMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organization_id", nullable = false)
    private Organization organization;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role; // ADMIN, MANAGER, DEVELOPER[cite: 1]

    public enum Role {
        ADMIN, MANAGER, DEVELOPER
    }
}