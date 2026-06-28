package com.example.backend;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/thoughts")
@CrossOrigin(origins = "http://localhost:5173")
public class ThoughtController {

    private final ThoughtRepository repo;

    public ThoughtController(ThoughtRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Thought> getAll() {
        return repo.findAllByOrderByCreatedAtDesc();
    }

    @PostMapping
    public ResponseEntity<Thought> create(@RequestBody ThoughtRequest req) {
        if (req.content() == null || req.content().isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        String trimmed = req.content().trim();
        if (trimmed.length() > 280) {
            return ResponseEntity.badRequest().build();
        }
        Thought t = new Thought();
        t.setContent(trimmed);
        return ResponseEntity.ok(repo.save(t));
    }

    record ThoughtRequest(String content) {}
}
