package com.asj.suppliersApp.mappers;

import com.asj.suppliersApp.dto.bidirectional.ContactDTO;
import com.asj.suppliersApp.dto.bidirectional.PhoneDTO;
import com.asj.suppliersApp.dto.request.AddressRequestDTO;
import com.asj.suppliersApp.dto.request.SupplierRequestDTO;
import com.asj.suppliersApp.dto.response.AddressResponseDTO;
import com.asj.suppliersApp.dto.response.SupplierResponseDTO;
import com.asj.suppliersApp.entities.*;
import com.asj.suppliersApp.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

public class SupplierMapper {

    public static Supplier getSupplierFromRequest(SupplierRequestDTO requestDTO) {
        Supplier supplier = new Supplier();
        supplier.setBrand(requestDTO.getBrand());
        supplier.setWeb(requestDTO.getWeb());
        supplier.setPhone(getPhone(requestDTO.getPhone()));
        supplier.setCuit(requestDTO.getCuit());
        supplier.setLogo(requestDTO.getLogo());
        supplier.setContact(getContact(requestDTO.getContact()));
        return supplier;
    }

    public static Contact getContact(ContactDTO request) {
        Contact contact = new Contact();
        contact.setName(request.getName());
        contact.setSurname(request.getSurname());
        contact.setMail(request.getMail());
        contact.setRol(request.getRol());
        contact.setPhone(getPhone(request.getPhone()));
        return contact;
    }

    public static Phone getPhone(PhoneDTO request) {
        Phone phone = new Phone();
        phone.setCountryCode(request.getCountry());
        phone.setNumber(request.getNumber());
        return phone;
    }

    public static Address getAddress(AddressRequestDTO request, Province requestProvince) {
        Address address = new Address();
        address.setAddress(request.getAddress());
        address.setNumber(request.getAddressNumber());
        address.setProvince(requestProvince);
        address.setCity(request.getCity());
        address.setZip_code(request.getZipCode());
        return address;
    }

    public static SupplierResponseDTO getSupplierResponseDTO(Supplier supplier) {
        SupplierResponseDTO response = new SupplierResponseDTO();
        response.setId(supplier.getId());
        response.setCode(supplier.getCode());
        response.setBrand(supplier.getBrand());
        response.setSector(supplier.getSector().getSector());
        response.setWeb(supplier.getWeb());
        response.setPhone(getPhoneDTO(supplier.getPhone()));
        response.setFullAddress(getAddressResponseDTO(supplier.getAddress()));
        response.setCuit(supplier.getCuit());
        response.setFiscalCondition(supplier.getFiscalCondition().getCondition());
        response.setContact(getContactDTO(supplier.getContact()));
        response.setLogo(supplier.getLogo());
        return response;
    }
    private static PhoneDTO getPhoneDTO(Phone phone) {
        PhoneDTO response = new PhoneDTO();
        response.setCountry(phone.getCountryCode());
        response.setNumber(phone.getNumber());
        return response;
    }

    private static AddressResponseDTO getAddressResponseDTO(Address address) {
        AddressResponseDTO response = new AddressResponseDTO();
        response.setAddress(address.getAddress());
        response.setAddressNumber(address.getNumber());
        response.setCity(address.getCity());
        response.setCountry(address.getProvince().getCountry().getName());
        response.setProvince(address.getProvince().getName());
        response.setZipCode(address.getZip_code());
        return response;
    }

    private static ContactDTO getContactDTO (Contact contact) {
        ContactDTO response = new ContactDTO();
        response.setName(contact.getName());
        response.setSurname(contact.getSurname());
        response.setPhone(getPhoneDTO(contact.getPhone()));
        response.setMail(contact.getMail());
        response.setRol(contact.getRol());
        return response;
    }
}
