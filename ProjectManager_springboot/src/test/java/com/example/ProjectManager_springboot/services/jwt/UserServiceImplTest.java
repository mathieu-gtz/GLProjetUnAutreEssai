package com.example.ProjectManager_springboot.services.jwt;

import com.example.ProjectManager_springboot.entities.User;
import com.example.ProjectManager_springboot.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void userDetailsService() {

        User user = new User();
        user.setEmail("test@example.com");
        when(userRepository.findFirstByEmail("test@example.com")).thenReturn(Optional.of(user));

        UserDetailsService userDetailsService = userService.userDetailsService();

        UserDetails userDetails = userDetailsService.loadUserByUsername("test@example.com");

        assertNotNull(userDetails);
        verify(userRepository, times(1)).findFirstByEmail("test@example.com");
    }

    @Test
    void userDetailsService_UserNotFound() {

        when(userRepository.findFirstByEmail("notfound@example.com")).thenReturn(Optional.empty());

        UserDetailsService userDetailsService = userService.userDetailsService();

        assertThrows(UsernameNotFoundException.class, () -> {
            userDetailsService.loadUserByUsername("notfound@example.com");
        });
        verify(userRepository, times(1)).findFirstByEmail("notfound@example.com");
    }
}