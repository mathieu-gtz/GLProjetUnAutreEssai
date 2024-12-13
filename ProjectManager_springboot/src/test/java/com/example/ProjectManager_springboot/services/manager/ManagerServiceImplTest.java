package com.example.ProjectManager_springboot.services.manager;

import com.example.ProjectManager_springboot.dto.*;
import com.example.ProjectManager_springboot.entities.*;
import com.example.ProjectManager_springboot.enums.UserRole;
import com.example.ProjectManager_springboot.repositories.*;
import com.example.ProjectManager_springboot.utils.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ManagerServiceImplTest {

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private ManagerServiceImpl managerService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createProject() {

        User manager = new User();
        manager.setId(1L);
        when(userRepository.findById(1L)).thenReturn(Optional.of(manager));

        ProjectDto projectDto = new ProjectDto();
        projectDto.setManagerId(1L);
        projectDto.setName("Project Name");
        projectDto.setDescription("Project Description");

        Project project = new Project();
        project.setId(1L);
        when(projectRepository.save(any(Project.class))).thenReturn(project);

        ProjectDto result = managerService.createProject(projectDto);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        verify(userRepository, times(1)).findById(1L);
        verify(projectRepository, times(1)).save(any(Project.class));
    }

    @Test
    void createTask() {

        User user = new User();
        user.setId(1L);
        user.setName("Test User");
        Project project = new Project();
        project.setId(1L);
        project.setName("Test Project");
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(projectRepository.findById(1L)).thenReturn(Optional.of(project));

        TaskDto taskDto = new TaskDto();
        taskDto.setEmployee(1L);
        taskDto.setTitle("Task Title");
        taskDto.setDescription("Task Description");

        Task task = new Task();
        task.setId(1L);
        task.setUser(user);
        task.setProject(project);
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        TaskDto result = managerService.createTask(1L, taskDto);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        verify(userRepository, times(1)).findById(1L);
        verify(projectRepository, times(1)).findById(1L);
        verify(taskRepository, times(1)).save(any(Task.class));
    }

    @Test
    void deleteTask() {

        managerService.deleteTask(1L);

        verify(taskRepository, times(1)).deleteById(1L);
    }

    @Test
    void getProjectsByManager() {

        Project project1 = new Project();
        project1.setId(1L);
        Project project2 = new Project();
        project2.setId(2L);
        when(projectRepository.findByManagerId(1L)).thenReturn(Arrays.asList(project1, project2));

        List<ProjectDto> result = managerService.getProjectsByManager(1L);

        assertEquals(2, result.size());
        verify(projectRepository, times(1)).findByManagerId(1L);
    }

    @Test
    void getTasksByProjectId() {

        Project project = new Project();
        project.setId(1L);

        User user = new User();
        user.setId(1L);
        user.setName("Test User");

        Task task1 = new Task();
        task1.setId(1L);
        task1.setUser(user);
        task1.setProject(project);

        Task task2 = new Task();
        task2.setId(2L);
        task2.setUser(user);
        task2.setProject(project);

        project.setTasks(Arrays.asList(task1, task2));
        when(projectRepository.findById(1L)).thenReturn(Optional.of(project));

        List<TaskDto> result = managerService.getTasksByProjectId(1L);

        assertEquals(2, result.size());
        verify(projectRepository, times(1)).findById(1L);
    }

    @Test
    void updateTask() {

        Task task = new Task();
        task.setId(1L);
        Project project = new Project();
        project.setId(1L);
        task.setProject(project);

        User user = new User();
        user.setId(1L);
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        TaskDto taskDto = new TaskDto();
        taskDto.setTitle("Updated Title");
        taskDto.setDescription("Updated Description");
        taskDto.setEmployee(1L);

        Task updatedTask = new Task();
        updatedTask.setId(1L);
        updatedTask.setTitle("Updated Title");
        updatedTask.setDescription("Updated Description");
        updatedTask.setUser(user);
        updatedTask.setProject(project);
        when(taskRepository.save(any(Task.class))).thenReturn(updatedTask);

        TaskDto result = managerService.updateTask(1L, taskDto);

        assertNotNull(result);
        assertEquals("Updated Title", result.getTitle());
        verify(taskRepository, times(1)).findById(1L);
        verify(userRepository, times(1)).findById(1L);
        verify(taskRepository, times(1)).save(any(Task.class));
    }

    @Test
    void getAllEmployees() {

        User user1 = new User();
        user1.setUserRole(UserRole.EMPLOYEE);
        User user2 = new User();
        user2.setUserRole(UserRole.EMPLOYEE);
        when(userRepository.findAllByUserRole(UserRole.EMPLOYEE)).thenReturn(Arrays.asList(user1, user2));

        List<UserDto> result = managerService.getAllEmployees();

        assertEquals(2, result.size());
        verify(userRepository, times(1)).findAllByUserRole(UserRole.EMPLOYEE);
    }

    @Test
    void getTaskById() {

        Task task = new Task();
        task.setId(1L);

        Project project = new Project();
        project.setId(1L);
        task.setProject(project);

        User user = new User();
        user.setId(1L);
        user.setName("Test User");
        task.setUser(user);

        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

        TaskDto result = managerService.getTaskById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        verify(taskRepository, times(1)).findById(1L);
    }

    @Test
    void getProjectById() {

        Project project = new Project();
        project.setId(1L);
        when(projectRepository.findById(1L)).thenReturn(Optional.of(project));

        ProjectDto result = managerService.getProjectById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        verify(projectRepository, times(1)).findById(1L);
    }

    @Test
    void getAllManagers() {

        User user1 = new User();
        user1.setUserRole(UserRole.MANAGER);
        User user2 = new User();
        user2.setUserRole(UserRole.MANAGER);
        when(userRepository.findAllByUserRole(UserRole.MANAGER)).thenReturn(Arrays.asList(user1, user2));

        List<UserDto> result = managerService.getAllManagers();

        assertEquals(2, result.size());
        verify(userRepository, times(1)).findAllByUserRole(UserRole.MANAGER);
    }

    @Test
    void createComment() {

        Task task = new Task();
        task.setId(1L);
        User user = new User();
        user.setId(1L);
        user.setName("Test User");
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));
        when(jwtUtil.getLoggedInUser()).thenReturn(user);

        Comment comment = new Comment();
        comment.setId(1L);
        comment.setTask(task);
        comment.setUser(user);
        when(commentRepository.save(any(Comment.class))).thenReturn(comment);

        CommentDto result = managerService.createComment(1L, "Comment Content");

        assertNotNull(result);
        assertEquals(1L, result.getId());
        verify(taskRepository, times(1)).findById(1L);
        verify(jwtUtil, times(1)).getLoggedInUser();
        verify(commentRepository, times(1)).save(any(Comment.class));
    }

    @Test
    void getCommentsByTaskId() {

        Task task = new Task();
        task.setId(1L);

        User user = new User();
        user.setId(1L);
        user.setName("Test User");

        Comment comment1 = new Comment();
        comment1.setId(1L);
        comment1.setTask(task);
        comment1.setUser(user);

        Comment comment2 = new Comment();
        comment2.setId(2L);
        comment2.setTask(task);
        comment2.setUser(user);

        when(commentRepository.findAllByTaskId(1L)).thenReturn(Arrays.asList(comment1, comment2));

        List<CommentDto> result = managerService.getCommentsByTaskId(1L);

        assertEquals(2, result.size());
        verify(commentRepository, times(1)).findAllByTaskId(1L);
    }

    @Test
    void searchProjectTaskByTitle() {
        // Arrange
        User user = new User();
        user.setId(1L);
        user.setName("Test User");

        Project project = new Project();
        project.setId(1L);
        project.setName("Test Project");

        Task task1 = new Task();
        task1.setId(1L);
        task1.setDueDate(new Date());
        task1.setUser(user);
        task1.setProject(project);

        Task task2 = new Task();
        task2.setId(2L);
        task2.setDueDate(new Date());
        task2.setUser(user);
        task2.setProject(project);

        when(taskRepository.findAllByProject_IdAndTitleContaining(1L, "Title")).thenReturn(Arrays.asList(task1, task2));

        List<TaskDto> result = managerService.searchProjectTaskByTitle(1L, "Title");

        assertEquals(2, result.size());
        verify(taskRepository, times(1)).findAllByProject_IdAndTitleContaining(1L, "Title");
    }

    @Test
    void searchManagerProjectByName() {

        Project project1 = new Project();
        project1.setId(1L);
        project1.setEndDate(new Date());
        Project project2 = new Project();
        project2.setId(2L);
        project2.setEndDate(new Date());
        when(projectRepository.findAllByManager_IdAndNameContaining(1L, "Name")).thenReturn(Arrays.asList(project1, project2));

        List<ProjectDto> result = managerService.searchManagerProjectByName(1L, "Name");

        assertEquals(2, result.size());
        verify(projectRepository, times(1)).findAllByManager_IdAndNameContaining(1L, "Name");
    }
}