package com.example.demo.service;

import com.example.demo.model.Angajat;
import com.example.demo.model.Proiect;
import com.example.demo.repository.AngajatRepository;
import com.example.demo.repository.ProiectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ProiectService {
    private final ProiectRepository repository;
    private final AngajatRepository angajatRepository;

    public Proiect getProiectById(Integer id) {
        return repository.getReferenceById(id);
    }

    public Proiect addProiect(Proiect proiect) { return repository.save(proiect);
    }

    public List<Proiect> getAll() {
        return repository.findAll();
    }

    public void deleteById(Integer id) {
        repository.deleteById(id);
    }

    public List<Angajat> getAllAngajati(Integer id) {
        List<Angajat> listaAngajati = angajatRepository.findAll();
        List<Angajat> listaAngajatiProiect = new ArrayList<>();
        for (Angajat angajat: listaAngajati)
            System.out.println(angajat);
        for (Angajat angajat: listaAngajati)
            if (angajat.getProiectId() != null && angajat.getProiectId().equals(id))
                listaAngajatiProiect.add(angajat);
        return listaAngajatiProiect;
    }

    public Proiect updateProiect(Proiect proiect) {
        Proiect proiectExistent = repository.findById(proiect.getId()).orElse(null);
        if (proiectExistent != null) {
            if (proiect.getNume() != null)
                proiectExistent.setNume(proiect.getNume());
            if (proiect.getDescriere() != null)
                proiectExistent.setDescriere(proiect.getDescriere());
            if (proiect.getAlteCosturi() != null)
                proiectExistent.setAlteCosturi(proiect.getAlteCosturi());
            return repository.save(proiectExistent);
        }
        else return null;
    }

}
