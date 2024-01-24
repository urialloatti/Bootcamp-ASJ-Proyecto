package com.asj.suppliersApp.dto.response;

import java.util.Date;

public class PurchaseOrderResponseDTO {
    private Integer id;
    private Date dateArriving;
    private String shippingRequirements;
    private String supplierName;
    private PurchaseProductResponseDTO products;
    private String state;
    private double total;
    private Date createdAt;
}
