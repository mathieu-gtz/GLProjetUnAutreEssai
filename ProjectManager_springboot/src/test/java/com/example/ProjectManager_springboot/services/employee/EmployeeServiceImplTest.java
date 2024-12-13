package com.example.ProjectManager_springboot.services.employee;

import com.example.ProjectManager_springboot.dto.CommentDto;
import com.example.ProjectManager_springboot.dto.TaskDto;
import com.example.ProjectManager_springboot.entities.Comment;
import com.example.ProjectManager_springboot.entities.Project;
import com.example.ProjectManager_springboot.entities.Task;
import com.example.ProjectManager_springboot.entities.User;
import com.example.ProjectManager_springboot.enums.TaskStatus;
import com.example.ProjectManager_springboot.repositories.CommentRepository;
import com.example.ProjectManager_springboot.repositories.TaskRepository;
import com.example.ProjectManager_springboot.utils.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class EmployeeServiceImplTest {

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private JwtUtil jwtUtil;

    @Mock
    private CommentRepository commentRepository;

    @InjectMocks
    private EmployeeServiceImpl employeeService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getTasksByEmployee() {

        User user = new User();
        user.setName("Test User");
        Project project = new Project();
        project.setId(1L);
        Task task1 = new Task();
        task1.setUser(user);
        task1.setProject(project);
        Task task2 = new Task();
        task2.setUser(user);
        task2.setProject(project);
        when(taskRepository.findByUser_Id(anyLong())).thenReturn(Arrays.asList(task1, task2));

        List<TaskDto> tasks = employeeService.getTasksByEmployee(1L);

        assertEquals(2, tasks.size());
        verify(taskRepository, times(1)).findByUser_Id(1L);
    }

    @Test
    void getTaskById() {
        // Arrange
        User user = new User();
        user.setName("Test User");
        Project project = new Project();
        project.setId(1L);
        Task task = new Task();
        task.setUser(user);
        task.setProject(project);
        when(taskRepository.findById(anyLong())).thenReturn(Optional.of(task));

        TaskDto taskDto = employeeService.getTaskById(1L);

        assertNotNull(taskDto);
        verify(taskRepository, times(1)).findById(1L);
    }

    @Test
    void updateTaskStatus() {

        User user = new User();
        user.setName("Test User");
        Project project = new Project();
        project.setId(1L);
        Task task = new Task();
        task.setUser(user);
        task.setProject(project);
        when(taskRepository.findById(anyLong())).thenReturn(Optional.of(task));
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        TaskDto taskDto = employeeService.updateTaskStatus(1L, TaskStatus.COMPLETED);

        assertNotNull(taskDto);
        assertEquals(TaskStatus.COMPLETED, task.getTaskStatus());
        verify(taskRepository, times(1)).findById(1L);
        verify(taskRepository, times(1)).save(task);
    }

    @Test
    void createComment() {
        // Arrange
        User user = new User();
        user.setName("Test User");
        Project project = new Project();
        project.setId(1L);
        Task task = new Task();
        task.setUser(user);
        task.setProject(project);
        Comment comment = new Comment();
        comment.setTask(task);
        comment.setUser(user);
        when(taskRepository.findById(anyLong())).thenReturn(Optional.of(task));
        when(jwtUtil.getLoggedInUser()).thenReturn(user);
        when(commentRepository.save(any(Comment.class))).thenReturn(comment);

        CommentDto commentDto = employeeService.createComment(1L, "Test comment");

        assertNotNull(commentDto);
        verify(taskRepository, times(1)).findById(1L);
        verify(jwtUtil, times(1)).getLoggedInUser();
        verify(commentRepository, times(1)).save(any(Comment.class));
    }

    @Test
    void getCommentsByTaskId() {

        User user = new User();
        user.setName("Test User");
        Project project = new Project();
        project.setId(1L);
        Task task = new Task();
        task.setUser(user);
        task.setProject(project);
        Comment comment1 = new Comment();
        comment1.setTask(task);
        comment1.setUser(user);
        Comment comment2 = new Comment();
        comment2.setTask(task);
        comment2.setUser(user);
        when(commentRepository.findAllByTaskId(anyLong())).thenReturn(Arrays.asList(comment1, comment2));

        List<CommentDto> comments = employeeService.getCommentsByTaskId(1L);

        assertEquals(2, comments.size());
        verify(commentRepository, times(1)).findAllByTaskId(1L);
    }

    @Test
    void searchEmployeeTaskByTitle() {

        User user = new User();
        user.setName("Test User");
        Project project = new Project();
        project.setId(1L);
        Task task1 = new Task();
        task1.setUser(user);
        task1.setProject(project);
        task1.setTitle("Test Task 1");
        task1.setDueDate(new Date());
        Task task2 = new Task();
        task2.setUser(user);
        task2.setProject(project);
        task2.setTitle("Test Task 2");
        task2.setDueDate(new Date());
        when(taskRepository.findAllByUser_IdAndTitleContaining(anyLong(), anyString())).thenReturn(Arrays.asList(task1, task2));

        List<TaskDto> tasks = employeeService.searchEmployeeTaskByTitle(1L, "Test");

        assertEquals(2, tasks.size());
        verify(taskRepository, times(1)).findAllByUser_IdAndTitleContaining(1L, "Test");
    }
}