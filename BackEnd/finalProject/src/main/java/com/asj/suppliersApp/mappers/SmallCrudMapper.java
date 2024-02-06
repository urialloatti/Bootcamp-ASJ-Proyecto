package com.asj.suppliersApp.mappers;

import com.asj.suppliersApp.dto.request.SmallCrudRequestDTO;
import com.asj.suppliersApp.dto.response.SmallCrudResponseDTO;
import com.asj.suppliersApp.entities.Category;
import com.asj.suppliersApp.entities.Sector;

public class SmallCrudMapper {
    public static SmallCrudResponseDTO getSmallCrudDTO(Sector sector) {
        SmallCrudResponseDTO response = new SmallCrudResponseDTO();
        response.setId(sector.getId());
        response.setName(sector.getSector());
        return response;
    }

    public static SmallCrudResponseDTO getSmallCrudDTO(Category category) {
        SmallCrudResponseDTO response = new SmallCrudResponseDTO();
        response.setId(category.getId());
        response.setName(category.getCategory());
        return response;
    }

}
