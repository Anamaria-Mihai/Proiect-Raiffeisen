package com.example.demo.service;


import com.example.demo.model.Angajat;
import com.example.demo.model.Departament;
import com.example.demo.model.Proiect;
import com.example.demo.repository.AngajatRepository;
import com.example.demo.repository.DepartamentRepository;
import com.example.demo.repository.ProiectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AngajatService {

    private final AngajatRepository repository;
    private final ProiectRepository proiectRepository;
    private final DepartamentRepository departamentRepository;
    public Angajat addAngajat(Angajat angajat) {
        // validari
        if (angajat.getVarsta() < 18) {
            return null;
        }
        // call repository
        Proiect proiect = proiectRepository.findById(angajat.getProiecteId()).orElse(null);
        Departament departament = departamentRepository.findById(angajat.getDepartamentId()).orElse(null);
        if (proiect != null) angajat.setProiecte(proiect);
        if (departament != null) angajat.setDepartament(departament);
        return repository.save(angajat);
    }

    public Angajat getAngajat(Integer id) {
        return repository.getReferenceById(id);
    }

    public List<Angajat> getAllAngajati() {
        return repository.findAll();
    }

    public void deleteAngajat(Integer id) {
        repository.deleteById(id);
    }

    public Angajat updateAngajat(Angajat angajat) {
        Angajat angajatExistent = repository.findById(angajat.getId()).orElse(null);
        if (angajatExistent != null) {
            if (angajat.getNume() != null)
                angajatExistent.setNume(angajat.getNume());
            if (angajat.getEmail() != null)
                angajatExistent.setEmail(angajat.getEmail());
            if (angajat.getFunctie() != null)
                angajatExistent.setFunctie(angajat.getFunctie());
            if (angajat.getVarsta() != null)
                angajatExistent.setVarsta(angajat.getVarsta());
            if (angajat.getPrenume() != null)
                angajatExistent.setPrenume(angajat.getPrenume());
            if (angajat.getSalariu() != null)
                angajatExistent.setSalariu(angajat.getSalariu());
            if (angajat.getProiecteId() != null)
            {
                Proiect proiect = proiectRepository.findById(angajat.getProiecteId()).orElse(null);
                if (proiect != null) {
                    angajatExistent.setProiecte(proiect);
                    angajatExistent.setProiecteId(angajat.getProiecteId());
                }
            }
            if (angajat.getDepartamentId() != null)
            {
                Departament departament = departamentRepository.findById(angajat.getDepartamentId()).orElse(null);
                if (departament != null) {
                    angajatExistent.setDepartament(departament);
                    angajatExistent.setDepartamentId(angajat.getDepartamentId());
                }
            }
            return repository.save(angajatExistent);
        }
        else return null;
    }
}
