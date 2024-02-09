package com.asj.suppliersApp.entities;

import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "purchase_orders")
public class PurchaseOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    @Column(name = "date_arrives", nullable = false)
    private Date dateArrives;
    @Column(name = "requirements", nullable = false, columnDefinition = "TEXT")
    private String requirements;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "supplier_id", referencedColumnName = "id", nullable = false)
    private Supplier supplier;
    @OneToMany(mappedBy = "purchase", cascade = CascadeType.ALL)
    private List<PurchaseProduct> products;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;
    @Column(name = "state", nullable = false)
    private String state;
    @Column(name = "is_available", nullable = false)
    private Boolean available;
    @Column(name = "created_at", nullable = false)
    private Date createdAt;
    @Column(name = "updated_at", nullable = false)
    private Date updatedAt;

    public PurchaseOrder() {
    }

    public PurchaseOrder(Integer id, Date dateArrives, String requirements, Supplier supplier, List<PurchaseProduct> products, User user, String state, Boolean available, Date createdAt, Date updatedAt) {
        this.id = id;
        this.dateArrives = dateArrives;
        this.requirements = requirements;
        this.supplier = supplier;
        this.products = products;
        this.user = user;
        this.state = state;
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

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }

    public List<PurchaseProduct> getProducts() {
        return products;
    }

    public void setProducts(List<PurchaseProduct> products) {
        this.products = products;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
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

    @Override
    public String toString() {
        return "PurchaseOrder {" +
                "\n\tid=" + id +
                ", \n\tdateArrives=" + dateArrives +
                ", \n\trequirements='" + requirements + '\'' +
                ", \n\tsupplier=" + supplier +
                ", \n\tproducts=" + products +
                ", \n\tuser=" + user +
                ", \n\tstate='" + state + '\'' +
                ", \n\tavailable=" + available +
                ", \n\tcreatedAt=" + createdAt +
                ", \n\tupdatedAt=" + updatedAt +
                "\n} product lenght: " + products.size()
                 ;
    }
}
