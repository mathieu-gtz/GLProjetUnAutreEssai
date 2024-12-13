package com.example.ProjectManager_springboot.services.employee;

import com.example.ProjectManager_springboot.dto.CommentDto;
import com.example.ProjectManager_springboot.dto.TaskDto;
import com.example.ProjectManager_springboot.enums.TaskStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface EmployeeService {

    List<TaskDto> getTasksByEmployee(Long employeeId);

    TaskDto getTaskById(Long taskId);

    TaskDto updateTaskStatus(Long taskId, TaskStatus status);

    CommentDto createComment(Long taskId, String content);

    List<CommentDto> getCommentsByTaskId(Long taskId);

    List<TaskDto> searchEmployeeTaskByTitle(Long employeeId, String title);
}
