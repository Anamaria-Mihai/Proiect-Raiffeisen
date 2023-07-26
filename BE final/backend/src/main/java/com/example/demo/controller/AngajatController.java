package com.example.demo.controller;


import com.example.demo.model.Angajat;
import com.example.demo.service.AngajatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/angajati")
@CrossOrigin
//@Slf4j
public class AngajatController {


    private final AngajatService service;
    @PostMapping("/add")
    public ResponseEntity<Angajat> addAngajat(@RequestBody Angajat angajat) {
        Angajat response = service.addAngajat(angajat);
        if (response == null) {
            ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Angajat> getAngajat(@PathVariable Integer id) {
        Angajat response = service.getAngajat(id);
        return ResponseEntity.ok(response);
    }


    @GetMapping("/all")
    public ResponseEntity<List<Angajat>> getAllAngajati() {
        return ResponseEntity.ok(service.getAllAngajati());
    }

    @DeleteMapping("/byId")
    public ResponseEntity<String> deleteAngajat(@RequestParam Integer id) {
        service.deleteAngajat(id);
        return ResponseEntity.ok("Angajatul a fost sters din db.");
    }

    @PutMapping("/byId")
    public ResponseEntity<Angajat> updateAngajat(@RequestBody Angajat angajat) {
        return ResponseEntity.ok(service.updateAngajat(angajat));
    }

}
