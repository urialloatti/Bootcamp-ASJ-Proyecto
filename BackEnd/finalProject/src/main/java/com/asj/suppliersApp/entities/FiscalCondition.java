package com.asj.suppliersApp.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "fiscal_condition")
public class FiscalCondition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    @Column(name = "condition", nullable = false)
    private String condition;

    public FiscalCondition() {
    }

    public FiscalCondition(Integer id, String condition) {
        this.id = id;
        this.condition = condition;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }
}
