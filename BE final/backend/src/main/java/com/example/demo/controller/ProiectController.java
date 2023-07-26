package com.example.demo.controller;


import com.example.demo.model.Angajat;
import com.example.demo.model.Proiect;
import com.example.demo.service.ProiectService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/proiecte")
@CrossOrigin
public class ProiectController {

    private final ProiectService service;
    @GetMapping("/{id}")
    ResponseEntity<Proiect> getProiect(@PathVariable Integer id) {
        Proiect response = service.getProiectById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/viewAngajati/{id}")
    public ResponseEntity<List<Angajat>> getAllAngajati(@PathVariable Integer id) {

        // Returnati toti angajatii.
        return ResponseEntity.ok(service.getAllAngajati(id));
    }


    @GetMapping("/all")
    public ResponseEntity<List<Proiect>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @DeleteMapping("/byId")
    public ResponseEntity<String> deleteById(@RequestParam Integer id) {
        service.deleteById(id);
        return ResponseEntity.ok("Proiectul a fost sters cu succes!");
    }

    @PutMapping("/byId")
    public ResponseEntity<Proiect> updateProiect(@RequestBody Proiect proiect) {
        return ResponseEntity.ok(service.updateProiect(proiect));
    }
    @PostMapping("/add")
    ResponseEntity<Proiect> addProiect(@RequestBody Proiect proiect) {
        Proiect response = service.addProiect(proiect);
        return ResponseEntity.ok(response);
    }

}
