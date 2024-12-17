package com.example.ProjectManager_springboot.controller.manager;

import com.example.ProjectManager_springboot.dto.CommentDto;
import com.example.ProjectManager_springboot.dto.ProjectDto;
import com.example.ProjectManager_springboot.dto.TaskDto;
import com.example.ProjectManager_springboot.dto.UserDto;
import com.example.ProjectManager_springboot.entities.Project;
import com.example.ProjectManager_springboot.repositories.ProjectRepository;
import com.example.ProjectManager_springboot.services.employee.EmployeeService;
import com.example.ProjectManager_springboot.services.manager.ManagerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/manager")
public class ManagerController {
    private final ManagerService managerService;
    private final ProjectRepository projectRepository;

    @PostMapping("/projects")
    public ResponseEntity<ProjectDto> createProject(@RequestBody ProjectDto projectDto) {
        ProjectDto createdProject = managerService.createProject(projectDto);
        if (createdProject == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProject);
    }

    @PostMapping("/projects/{projectId}/tasks")
    public ResponseEntity<TaskDto> createTask(@PathVariable Long projectId, @RequestBody TaskDto taskDto) {
        TaskDto createdTaskDTO = managerService.createTask(projectId, taskDto);
        if (createdTaskDTO == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTaskDTO);
    }


    @DeleteMapping("/task/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        managerService.deleteTask(id);
        return ResponseEntity.ok(null);
    }


    @GetMapping("/managers/{managerId}/projects")
    public ResponseEntity<List<ProjectDto>> getProjectsByManager(@PathVariable Long managerId) {
        List<ProjectDto> projects = managerService.getProjectsByManager(managerId);
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/project/{projectId}/manager")
    public ResponseEntity<Long> getManagerIdByProject(@PathVariable Long projectId) {
        Project project = projectRepository.findById(projectId).orElse(null);
        if (project == null || project.getManager() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(project.getManager().getId());
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<TaskDto>> viewProject(@PathVariable Long projectId) {
        List<TaskDto> tasks = managerService.getTasksByProjectId(projectId);
        if (tasks == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(tasks);
    }

    @PutMapping("/tasks/{taskId}")
    public ResponseEntity<TaskDto> updateTask(@PathVariable Long taskId, @RequestBody TaskDto taskDTO) {
        TaskDto updatedTask = managerService.updateTask(taskId, taskDTO);
        if (updatedTask == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updatedTask);
    }

    @GetMapping("/projects/{id}")
    public ResponseEntity<ProjectDto> getProjectById(@PathVariable Long id) {
        ProjectDto project = managerService.getProjectById(id);
        if (project == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(project);
    }

    @GetMapping("/projects/{projectId}/tasks")
    public ResponseEntity<List<TaskDto>> getAllTasksByProjectId(@PathVariable Long projectId) {
        List<TaskDto> tasks = managerService.getTasksByProjectId(projectId);
        if (tasks == null || tasks.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(tasks);
    }


    @GetMapping("/tasks/{id}")
    public ResponseEntity<TaskDto> getTaskById(@PathVariable Long id) {
        TaskDto task = managerService.getTaskById(id);
        if (task == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(task);
    }

    @GetMapping("/managers")
    public ResponseEntity<List<UserDto>> getAllManagers() {
        List<UserDto> managers = managerService.getAllManagers();
        if (managers == null || managers.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(managers);
    }

    @GetMapping("/employees")
    public ResponseEntity<List<UserDto>> getAllEmployees() {
        List<UserDto> employees = managerService.getAllEmployees();
        if (employees == null || employees.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(employees);
    }


    @PostMapping(path="/task/comment/{taskId}")
    public ResponseEntity<CommentDto> createComment(@PathVariable Long taskId, @RequestParam String content) {
        CommentDto createdCommentDto = managerService.createComment(taskId, content);
        if(createdCommentDto == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCommentDto);
    }

    @GetMapping(path="/comments/{taskId}")
    public ResponseEntity<List<CommentDto>> getCommentByTaskId(@PathVariable Long taskId) {
        return ResponseEntity.ok(managerService.getCommentsByTaskId(taskId));
    }

    @GetMapping(path="/projects/{projectId}/tasks/search/{title}")
    public ResponseEntity<List<TaskDto>> searchTask(@PathVariable("projectId") Long projectId, @PathVariable("title") String title) {
        return ResponseEntity.ok(managerService.searchProjectTaskByTitle(projectId, title));
    }

    @GetMapping(path="/managers/{managerId}/projects/search/{name}")
    public ResponseEntity<List<ProjectDto>> searchProject(@PathVariable("managerId") Long managerId, @PathVariable("name") String name) {
        return ResponseEntity.ok(managerService.searchManagerProjectByName(managerId, name));
    }
}
