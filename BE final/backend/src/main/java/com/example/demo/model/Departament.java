package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Table(name="departamente")
@RequiredArgsConstructor
@Data
    public class Departament {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    Integer id;
    String nume;
    Integer cost;
}
