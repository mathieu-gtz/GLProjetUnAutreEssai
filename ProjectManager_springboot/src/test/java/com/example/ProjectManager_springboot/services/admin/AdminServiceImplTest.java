package com.example.ProjectManager_springboot.services.admin;

import com.example.ProjectManager_springboot.dto.UserDto;
import com.example.ProjectManager_springboot.entities.User;
import com.example.ProjectManager_springboot.enums.UserRole;
import com.example.ProjectManager_springboot.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AdminServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private AdminServiceImpl adminService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void changeUserRole() {

        User user = new User();
        user.setId(1L);
        user.setUserRole(UserRole.EMPLOYEE);
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        adminService.changeUserRole(1L, "MANAGER");

        assertEquals(UserRole.MANAGER, user.getUserRole());
        verify(userRepository, times(1)).findById(1L);
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void getUser() {
        // Arrange
        User user1 = new User();
        user1.setUserRole(UserRole.EMPLOYEE);
        User user2 = new User();
        user2.setUserRole(UserRole.MANAGER);
        User user3 = new User();
        user3.setUserRole(UserRole.ADMIN);
        when(userRepository.findAll()).thenReturn(Arrays.asList(user1, user2, user3));

        List<UserDto> users = adminService.getUser();

        assertEquals(2, users.size());
        verify(userRepository, times(1)).findAll();
    }
}