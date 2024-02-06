package com.asj.suppliersApp.entities;

import jakarta.persistence.*;

import java.util.Date;
@Entity
@Table(name = "suppliers")
public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    @Column(name = "code", nullable = false)
    private String code;
    @Column(name = "brand", nullable = false)
    private String brand;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "sector_id", referencedColumnName = "id", nullable = false)
    private Sector sector;
    @Column(name = "web", nullable = false)
    private String web;
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "phone_id", referencedColumnName = "id", nullable = false)
    private Phone phone;
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id", nullable = false)
    private Address address;
    @Column(name = "cuit", nullable = false)
    private String cuit;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "fiscal_c_id", referencedColumnName = "id", nullable = false)
    private FiscalCondition fiscalCondition;
    @Column(name = "logo", nullable = true, columnDefinition = "TEXT")
    private String logo;
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "contact_id", referencedColumnName = "id", nullable = false)
    private Contact contact;
    @Column(name = "is_available", nullable = false)
    private Boolean available;
    @Column(name = "created_at", nullable = false)
    private Date createdAt;
    @Column(name = "updated_at", nullable = false)
    private Date updatedAt;

    public Supplier() {
    }

    public Supplier(Integer id, String code, String brand, Sector sector, String web, Phone phone, Address address, String cuit, FiscalCondition fiscalCondition, String logo, Contact contact, Boolean available, Date createdAt, Date updatedAt) {
        this.id = id;
        this.code = code;
        this.brand = brand;
        this.sector = sector;
        this.web = web;
        this.phone = phone;
        this.address = address;
        this.cuit = cuit;
        this.fiscalCondition = fiscalCondition;
        this.logo = logo;
        this.contact = contact;
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

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public Sector getSector() {
        return sector;
    }

    public void setSector(Sector sector) {
        this.sector = sector;
    }

    public String getWeb() {
        return web;
    }

    public void setWeb(String web) {
        this.web = web;
    }

    public Phone getPhone() {
        return phone;
    }

    public void setPhone(Phone phone) {
        this.phone = phone;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public String getCuit() {
        return cuit;
    }

    public void setCuit(String cuit) {
        this.cuit = cuit;
    }

    public FiscalCondition getFiscalCondition() {
        return fiscalCondition;
    }

    public void setFiscalCondition(FiscalCondition fiscalCondition) {
        this.fiscalCondition = fiscalCondition;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public Contact getContact() {
        return contact;
    }

    public void setContact(Contact contact) {
        this.contact = contact;
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
