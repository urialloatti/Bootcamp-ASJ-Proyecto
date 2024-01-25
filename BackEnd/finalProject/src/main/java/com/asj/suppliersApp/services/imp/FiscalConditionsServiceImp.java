package com.asj.suppliersApp.services.imp;

import com.asj.suppliersApp.dto.response.SmallCrudResponseDTO;
import com.asj.suppliersApp.entities.FiscalCondition;
import com.asj.suppliersApp.repositories.FiscalConditionRepository;
import com.asj.suppliersApp.services.FiscalConditionsService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class FiscalConditionsServiceImp implements FiscalConditionsService {
    private final FiscalConditionRepository fiscalCondRep;

    public FiscalConditionsServiceImp(FiscalConditionRepository fiscalCondRep) {
        this.fiscalCondRep = fiscalCondRep;
    }

    @Override
    public List<SmallCrudResponseDTO> findAll() {
        List<FiscalCondition> list = fiscalCondRep.findAll();
        List<SmallCrudResponseDTO> response = new ArrayList<SmallCrudResponseDTO>();
        for (FiscalCondition fiscCond: list) {
            response.add(new SmallCrudResponseDTO(fiscCond.getId(), fiscCond.getCondition()));
        }
        return response;
    }
}
