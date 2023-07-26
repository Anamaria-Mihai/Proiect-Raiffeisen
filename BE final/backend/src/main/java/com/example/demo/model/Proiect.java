package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@Entity
@Table(name = "proiecte")
@RequiredArgsConstructor
public class Proiect {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;
    private String nume;
    @Column(length = 5000)
    private String descriere;
    @Column(name = "alte_costuri")
    private Integer alteCosturi;
}
