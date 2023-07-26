package com.example.demo.repository;


import com.example.demo.model.Angajat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface AngajatRepository extends JpaRepository<Angajat, Integer> {
}
