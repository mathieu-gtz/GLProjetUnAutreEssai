package com.example.ProjectManager_springboot.dto;

import lombok.Data;

import java.util.Date;

@Data
public class CommentDto {

        private Long id;

        private String content;

        private Date createdAt;

        private Long userId;

        private Long taskId;

        private String postedBy;

}
