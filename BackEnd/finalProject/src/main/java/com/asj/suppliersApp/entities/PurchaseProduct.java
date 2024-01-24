package com.asj.suppliersApp.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "purchase_products")
public class PurchaseProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "purchase_id", referencedColumnName = "id", nullable = false)
    private PurchaseOrder purchase;
    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id", nullable = false)
    private Product product;
    @Column(name = "price", nullable = false)
    private double price;
    @Column(name = "quantity", nullable = false)
    private int quantity;

    public PurchaseProduct() {
    }

    public PurchaseProduct(Integer id, PurchaseOrder purchase, Product product, double price, int quantity) {
        this.id = id;
        this.purchase = purchase;
       	this.product = product;
        this.price = price;
        this.quantity = quantity;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public PurchaseOrder getPurchase() {
        return purchase;
    }

    public void setPurchase(PurchaseOrder purchase) {
        this.purchase = purchase;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
