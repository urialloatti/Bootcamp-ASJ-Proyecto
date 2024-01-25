package com.asj.suppliersApp.services;

import com.asj.suppliersApp.dto.response.LocationResponseDTO;

import java.util.List;

public interface LocationsService {

    List<LocationResponseDTO> getList();
    Integer findCountryId(Integer province);
}
