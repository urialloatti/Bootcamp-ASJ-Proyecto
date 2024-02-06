package com.asj.suppliersApp.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "address")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    @Column(name = "address", nullable = false)
    private String address;
    @Column(name = "number", nullable = false)
    private int number;
    @Column(name = "city", nullable = false)
    private String city;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "province_id", referencedColumnName = "id", nullable = false)
    private Province province;
    @Column(name = "zip_code", nullable = false)
    private String zip_code;

    public Address() {
    }

    public Address(Integer id, String address, int number, String city, Province province, String zip_code) {
        this.id = id;
        this.address = address;
        this.number = number;
        this.city = city;
        this.province = province;
        this.zip_code = zip_code;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Province getProvince() {
        return province;
    }

    public void setProvince(Province province) {
        this.province = province;
    }

    public String getZip_code() {
        return zip_code;
    }

    public void setZip_code(String zip_code) {
        this.zip_code = zip_code;
    }
}
