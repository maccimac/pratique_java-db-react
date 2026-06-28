package com.example.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ThoughtRepository extends JpaRepository<Thought, Long> {
    List<Thought> findAllByOrderByCreatedAtDesc();
}
