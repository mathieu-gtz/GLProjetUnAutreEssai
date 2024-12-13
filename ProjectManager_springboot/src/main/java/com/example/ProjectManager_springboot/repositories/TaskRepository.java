package com.example.ProjectManager_springboot.repositories;

import com.example.ProjectManager_springboot.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUser_Id(Long employeeId);

    List<Task> findAllByTitleContaining(String title);

    List<Task> findAllByUser_IdAndTitleContaining(Long employeeId, String title);

    List<Task> findAllByProject_IdAndTitleContaining(Long projectId, String title);
}
