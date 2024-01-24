package com.asj.suppliersApp.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class UpdateSupplierIdentifiersResponseDTO {
    private Integer countryId;
    private Integer provinceId;
    private Integer sectorId;
    private Integer fiscalConditionId;

    public UpdateSupplierIdentifiersResponseDTO() {
    }

    public UpdateSupplierIdentifiersResponseDTO(Integer countryId, Integer provinceId, Integer sectorId, Integer fiscalConditionId) {
        this.countryId = countryId;
        this.provinceId = provinceId;
        this.sectorId = sectorId;
        this.fiscalConditionId = fiscalConditionId;
    }

    public Integer getCountryId() {
        return countryId;
    }

    public void setCountryId(Integer countryId) {
        this.countryId = countryId;
    }

    public Integer getProvinceId() {
        return provinceId;
    }

    public void setProvinceId(Integer provinceId) {
        this.provinceId = provinceId;
    }

    public Integer getSectorId() {
        return sectorId;
    }

    public void setSectorId(Integer sectorId) {
        this.sectorId = sectorId;
    }

    public Integer getFiscalConditionId() {
        return fiscalConditionId;
    }

    public void setFiscalConditionId(Integer fiscalConditionId) {
        this.fiscalConditionId = fiscalConditionId;
    }
}
