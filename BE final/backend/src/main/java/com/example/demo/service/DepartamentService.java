
package com.example.demo.service;

import com.example.demo.model.Departament;
import com.example.demo.model.Proiect;
import com.example.demo.repository.AngajatRepository;
import com.example.demo.repository.DepartamentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartamentService {

    private final DepartamentRepository repository;
    public Departament afiseazaId(Integer id) {
        return repository.getReferenceById(id);
    }
    public List<Departament> afiseazaTot() {
        return repository.findAll();
    }

    public Departament add(Departament departament) {
        return repository.save(departament);
    }

    public void stergeId(Integer id) {
        repository.deleteById(id);
    }

    public Departament update(Departament departament) {
        Departament departamentExistent = repository.findById(departament.getId()).orElse(null);
        if (departamentExistent != null) {
            if (departament.getNume() != null)
                departamentExistent.setNume(departament.getNume());
            if (departament.getCost() != null)
                departamentExistent.setCost(departament.getCost());
            return repository.save(departamentExistent);
        }
        else return null;
    }
}
