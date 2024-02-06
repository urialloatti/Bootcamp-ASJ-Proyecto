package com.asj.suppliersApp.services;

import com.asj.suppliersApp.dto.request.UserCredentialsRequestDTO;
import com.asj.suppliersApp.dto.request.UserRequestDTO;
import com.asj.suppliersApp.dto.response.UserResponseDTO;
import com.asj.suppliersApp.dto.response.UserValidationResponseDTO;
import com.asj.suppliersApp.exceptions.BadRequestException;
import com.asj.suppliersApp.exceptions.ResourceNotFoundException;

import java.util.Optional;

public interface UsersService {
    UserResponseDTO loginUser(UserCredentialsRequestDTO request) throws ResourceNotFoundException;

    UserValidationResponseDTO validateUser(UserCredentialsRequestDTO request);

    UserResponseDTO createUser(UserRequestDTO request) throws ResourceNotFoundException, BadRequestException;

    Boolean checkUsernameExists(UserCredentialsRequestDTO request);

}
