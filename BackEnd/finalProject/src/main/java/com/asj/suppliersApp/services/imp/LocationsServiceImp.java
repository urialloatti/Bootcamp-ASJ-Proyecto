package com.asj.suppliersApp.services.imp;

import com.asj.suppliersApp.dto.response.LocationResponseDTO;
import com.asj.suppliersApp.dto.response.SmallCrudResponseDTO;
import com.asj.suppliersApp.entities.Country;
import com.asj.suppliersApp.entities.Province;
import com.asj.suppliersApp.repositories.CountryRepository;
import com.asj.suppliersApp.repositories.ProvinceRepository;
import com.asj.suppliersApp.services.LocationsService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LocationsServiceImp implements LocationsService {

    private final ProvinceRepository provinceRep;
    private final CountryRepository countryRep;

    public LocationsServiceImp(ProvinceRepository provinceRep, CountryRepository countryRep) {
        this.provinceRep = provinceRep;
        this.countryRep = countryRep;
    }

    @Override
    public List<LocationResponseDTO> getList() {
        List<Country> countries = countryRep.findAll();
        List<LocationResponseDTO> response = new ArrayList<LocationResponseDTO>();
        for (Country country: countries) {
            LocationResponseDTO current = new LocationResponseDTO();
            current.setCountryId(country.getId());
            current.setCountryName(country.getName());
            List<SmallCrudResponseDTO> provinces = new ArrayList<>();
            for(Province province: country.getProvinces()) {
                provinces.add(new SmallCrudResponseDTO(province.getId(), province.getName()));
            }
            current.setProvinces(provinces);
            response.add(current);
        }
        return response;
    }

    @Override
    public Integer findCountryId(Integer provinceId) {
        Optional<Province> province = provinceRep.findById(provinceId);
        if (province.isEmpty()) {
            return null;
        }
        return province.get().getCountry().getId();
    }
}
