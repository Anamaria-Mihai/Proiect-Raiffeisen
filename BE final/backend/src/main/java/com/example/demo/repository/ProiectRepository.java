package com.example.demo.repository;

import com.example.demo.model.Angajat;
import com.example.demo.model.Proiect;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface ProiectRepository extends JpaRepository<Proiect, Integer> {
}
