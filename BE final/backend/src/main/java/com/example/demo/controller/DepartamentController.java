
package com.example.demo.controller;


import com.example.demo.model.Departament;
import com.example.demo.model.Proiect;
import com.example.demo.service.DepartamentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/departamente")
@CrossOrigin
public class DepartamentController {


    private final DepartamentService service;
    @PostMapping("/add")
    public ResponseEntity<Departament> addDepartament(@RequestBody Departament departament) {
        Departament response = service.add(departament);
        if (response == null) {
            ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Departament> afiseazaDepartament(@PathVariable Integer id) {
        Departament response = service.afiseazaId(id);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/all")
    public ResponseEntity<List<Departament>> afiseazaTot() {
        return ResponseEntity.ok(service.afiseazaTot());
    }

    @DeleteMapping("/byId")
    public ResponseEntity<String> stergeId(@RequestParam Integer id) {
        service.stergeId(id);
        return ResponseEntity.ok("Departamentul a fost sters cu succes!");
    }
    @PutMapping("/byId")
    public ResponseEntity<Departament> update(@RequestBody Departament departament) {
        return ResponseEntity.ok(service.update(departament));
    }
}