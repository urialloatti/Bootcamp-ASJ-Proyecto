package com.asj.suppliersApp.entities;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "purchase_orders")
public class PurchaseOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    @Column(name = "date_arrives", nullable = false)
    private Date dateArrives;
    @Column(name = "requirements", nullable = false)
    private String requirements;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "supplier_id", referencedColumnName = "id", nullable = false)
    private Supplier supplier;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;
    @Column(name = "is_available", nullable = false)
    private Boolean available;
    @Column(name = "created_at", nullable = false)
    private Date createdAt;
    @Column(name = "updated_at", nullable = false)
    private Date updatedAt;

    public PurchaseOrder() {
    }

    public PurchaseOrder(Integer id, Date dateArrives, String requirements, Supplier supplier, User user, Boolean available, Date createdAt, Date updatedAt) {
        this.id = id;
        this.dateArrives = dateArrives;
        this.requirements = requirements;
        this.supplier = supplier;
        this.user = user;
        this.available = available;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getDateArrives() {
        return dateArrives;
    }

    public void setDateArrives(Date dateArrives) {
        this.dateArrives = dateArrives;
    }

    public String getRequirements() {
        return requirements;
    }

    public void setRequirements(String requirements) {
        this.requirements = requirements;
    }

    public Supplier getsupplier() {
        return supplier;
    }

    public void setsupplier(Supplier supplier) {
        this.supplier = supplier;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
}
