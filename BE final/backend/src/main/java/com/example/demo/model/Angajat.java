package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;


@Data
@Entity
@Table(name = "angajati")
@RequiredArgsConstructor
public class Angajat {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;
    private String nume;
    private String prenume;
    private Integer varsta;
    private String functie;
    private Integer salariu;
    private String email;
    @ManyToOne
    @JoinColumn(name = "proiecte") // replace with your actual foreign key column name
    private Proiect proiecte;
    @Transient
    private Integer proiecteId;
    @ManyToOne
    @JoinColumn(name = "departamente")
    private Departament departament;
    @Transient
    private Integer departamentId;

    @JsonIgnore
    public Integer getProiectId() {
        if (proiecte != null) {
            return proiecte.getId();
        }
        return null;
    }



}
