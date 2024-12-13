package com.example.ProjectManager_springboot.services.userProject;

import com.example.ProjectManager_springboot.entities.UserProject;
import com.example.ProjectManager_springboot.entities.UserProjectId;
import com.example.ProjectManager_springboot.enums.UserRole;
import com.example.ProjectManager_springboot.repositories.UserProjectRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.mockito.Mockito.verify;

class UserProjectServiceTest {

    @Mock
    private UserProjectRepository userProjectRepository;

    @InjectMocks
    private UserProjectService userProjectService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void assignUserToProject() {

        Long userId = 1L;
        Long projectId = 1L;
        UserRole role = UserRole.EMPLOYEE;

        userProjectService.assignUserToProject(userId, projectId, role);

        UserProject expectedUserProject = new UserProject();
        expectedUserProject.setId(new UserProjectId(userId, projectId));
        expectedUserProject.setRole(role);
        verify(userProjectRepository).save(expectedUserProject);
    }
}