package com.asj.suppliersApp.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "countries")
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Integer id;
    @Column(name = "name", unique = true)
    private String name;
    @OneToMany(mappedBy = "country")
    private List<Province> provinces;

    public Country() {
    }

    public Country(Integer id, String name, List<Province> provinces) {
        this.id = id;
        this.name = name;
        this.provinces = provinces;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Province> getProvinces() {
        return provinces;
    }

    public void setProvinces(List<Province> provinces) {
        this.provinces = provinces;
    }
}
