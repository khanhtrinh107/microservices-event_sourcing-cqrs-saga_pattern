package com.product.product_service_query.controller;

import com.product.product_service_query.model.Comment;
import com.product.product_service_query.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.ArrayList;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {
    private final CommentRepository commentRepository;

    @GetMapping("/{productId}")
    public ResponseEntity<?> getCommentByProductId(@PathVariable String productId) {
        return new ResponseEntity<>(commentRepository.findByProductIdOrderByCreatedAtDesc(productId).orElse(new ArrayList<>()), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> addComment(@RequestBody Comment comment) {
        comment.setCreatedAt(Instant.now());
        return new ResponseEntity<>(commentRepository.save(comment), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<?> updateComment(@RequestBody Comment comment) {
        return new ResponseEntity<>(commentRepository.save(comment), HttpStatus.OK);
    }
}
