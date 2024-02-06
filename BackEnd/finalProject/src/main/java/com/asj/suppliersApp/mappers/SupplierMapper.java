package com.asj.suppliersApp.mappers;

import com.asj.suppliersApp.dto.response.ContactResponseDTO;
import com.asj.suppliersApp.dto.response.PhoneResponseDTO;
import com.asj.suppliersApp.dto.request.AddressRequestDTO;
import com.asj.suppliersApp.dto.request.ContactRequestDTO;
import com.asj.suppliersApp.dto.request.PhoneRequestDTO;
import com.asj.suppliersApp.dto.request.SupplierRequestDTO;
import com.asj.suppliersApp.dto.response.AddressResponseDTO;
import com.asj.suppliersApp.dto.response.SupplierResponseDTO;
import com.asj.suppliersApp.entities.*;

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
    public static Supplier updateSupplierFromRequest(Supplier supplier, SupplierRequestDTO requestDTO) {
        supplier.setBrand(requestDTO.getBrand());
        supplier.setWeb(requestDTO.getWeb());
        supplier.setPhone(updatePhone(supplier.getPhone() ,requestDTO.getPhone()));
        supplier.setCuit(requestDTO.getCuit());
        supplier.setLogo(requestDTO.getLogo());
        supplier.setContact(updateContact(supplier.getContact() ,requestDTO.getContact()));
        return supplier;
    }

    public static SupplierRequestDTO getRequestDTO(Supplier supplier) {
        AddressRequestDTO address = new AddressRequestDTO();
        address.setAddressNumber(supplier.getAddress().getNumber());
        address.setCity(supplier.getAddress().getCity());
        address.setProvinceId(supplier.getAddress().getProvince().getId());
        address.setZipCode(supplier.getAddress().getZip_code());
        address.setAddress(supplier.getAddress().getAddress());

        ContactRequestDTO contact = new ContactRequestDTO();
        contact.setName(supplier.getContact().getName());
        contact.setSurname(supplier.getContact().getSurname());
        contact.setMail(supplier.getContact().getMail());
        contact.setRol(supplier.getContact().getRol());
        contact.setPhone(new PhoneRequestDTO(supplier.getContact().getPhone().getCountryCode(), supplier.getContact().getPhone().getNumber()));

        SupplierRequestDTO request = new SupplierRequestDTO();
        request.setBrand(supplier.getBrand());
        request.setSectorId(supplier.getSector().getId());
        request.setWeb(supplier.getWeb());
        request.setPhone(new PhoneRequestDTO(supplier.getPhone().getCountryCode(), supplier.getPhone().getNumber()));
        request.setFullAddress(address);
        request.setCuit(supplier.getCuit());
        request.setFiscalConditionId(supplier.getFiscalCondition().getId());
        request.setContact(contact);
        request.setLogo(supplier.getLogo());

        return  request;
    }
    public static Phone getPhone(PhoneRequestDTO request) {
        Phone phone = new Phone();
        phone.setCountryCode(request.getCountry());
        phone.setNumber(request.getNumber());
        return phone;
    }

    public static Contact getContact(ContactRequestDTO request) {
        Contact contact = new Contact();
        contact.setName(request.getName());
        contact.setSurname(request.getSurname());
        contact.setMail(request.getMail());
        contact.setRol(request.getRol());
        contact.setPhone(getPhone(request.getPhone()));
        return contact;
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
    public static Phone updatePhone(Phone phone, PhoneRequestDTO request) {
        phone.setCountryCode(request.getCountry());
        phone.setNumber(request.getNumber());
        return phone;
    }

    public static Contact updateContact(Contact contact, ContactRequestDTO request) {
        contact.setName(request.getName());
        contact.setSurname(request.getSurname());
        contact.setMail(request.getMail());
        contact.setRol(request.getRol());
        contact.setPhone(updatePhone(contact.getPhone(), request.getPhone()));
        return contact;
    }

    public static Address updateAddress(Address address, AddressRequestDTO request, Province requestProvince) {
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
        response.setPicture(supplier.getLogo());
        response.setAvailable(supplier.getAvailable());
        return response;
    }
    private static PhoneResponseDTO getPhoneDTO(Phone phone) {
        PhoneResponseDTO response = new PhoneResponseDTO();
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

    private static ContactResponseDTO getContactDTO (Contact contact) {
        ContactResponseDTO response = new ContactResponseDTO();
        response.setName(contact.getName());
        response.setSurname(contact.getSurname());
        response.setPhone(getPhoneDTO(contact.getPhone()));
        response.setMail(contact.getMail());
        response.setRol(contact.getRol());
        return response;
    }
}
