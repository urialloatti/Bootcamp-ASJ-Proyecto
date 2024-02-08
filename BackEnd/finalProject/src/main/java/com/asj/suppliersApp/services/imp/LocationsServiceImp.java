package com.asj.suppliersApp.services.imp;

import com.asj.suppliersApp.dto.response.LocationResponseDTO;
import com.asj.suppliersApp.dto.response.SmallCrudResponseDTO;
import com.asj.suppliersApp.entities.Country;
import com.asj.suppliersApp.entities.Province;
import com.asj.suppliersApp.exceptions.ResourceNotFoundException;
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
        for (Country country : countries) {
            response.add(this.getLocationResponseDTO(country));
        }
        return response;
    }

    @Override
    public Integer findCountryId(Integer provinceId) throws ResourceNotFoundException {
        Province province = provinceRep.findById(provinceId)
                .orElseThrow(() -> new ResourceNotFoundException("Provincia con el Id " + provinceId + " no encontrada."));
        return province.getCountry().getId();
    }

    private LocationResponseDTO getLocationResponseDTO(Country country) {
        LocationResponseDTO locationResponse = new LocationResponseDTO();
        locationResponse.setCountryId(country.getId());
        locationResponse.setCountryName(country.getName());
        List<SmallCrudResponseDTO> provinces = new ArrayList<>();
        for (Province province : country.getProvinces()) {
            provinces.add(new SmallCrudResponseDTO(province.getId(), province.getName()));
        }
        locationResponse.setProvinces(provinces);
        return locationResponse;
    }
}
