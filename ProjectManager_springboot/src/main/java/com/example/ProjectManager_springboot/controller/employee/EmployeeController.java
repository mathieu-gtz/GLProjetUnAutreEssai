package com.example.ProjectManager_springboot.controller.employee;

import com.example.ProjectManager_springboot.dto.CommentDto;
import com.example.ProjectManager_springboot.dto.TaskDto;
import com.example.ProjectManager_springboot.enums.TaskStatus;
import com.example.ProjectManager_springboot.services.employee.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/employee")
@CrossOrigin(origins = "*")
public class EmployeeController {

    private final EmployeeService employeeService;


    @GetMapping("/{employeeId}/tasks")
    public ResponseEntity<List<TaskDto>> getTasksByEmployee(@PathVariable Long employeeId) {
        List<TaskDto> tasks = employeeService.getTasksByEmployee(employeeId);
        if (tasks == null || tasks.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/tasks/{taskId}")
    public ResponseEntity<TaskDto> getTaskById(@PathVariable Long taskId) {
        TaskDto task = employeeService.getTaskById(taskId);
        if (task == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(task);
    }

    @PutMapping("/tasks/{taskId}/{status}")
    public ResponseEntity<TaskDto> updateTaskStatus(@PathVariable Long taskId, @PathVariable TaskStatus status) {
        TaskDto updatedTask = employeeService.updateTaskStatus(taskId, status);
        if (updatedTask == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(updatedTask);
    }

    @PostMapping(path="/task/comment/{taskId}")
    public ResponseEntity<CommentDto> createComment(@PathVariable Long taskId, @RequestParam String content) {
        CommentDto createdCommentDto = employeeService.createComment(taskId, content);
        if(createdCommentDto == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCommentDto);
    }

    @GetMapping(path="/comments/{taskId}")
    public ResponseEntity<List<CommentDto>> getCommentByTaskId(@PathVariable Long taskId) {
        return ResponseEntity.ok(employeeService.getCommentsByTaskId(taskId));
    }

    @GetMapping(path="/{employeeId}/tasks/search/{title}")
    public ResponseEntity<List<TaskDto>> searchTask(@PathVariable("employeeId") Long employeeId, @PathVariable("title") String title) {
        return ResponseEntity.ok(employeeService.searchEmployeeTaskByTitle(employeeId, title));
    }
}
