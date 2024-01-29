package com.asj.suppliersApp.services;

import com.asj.suppliersApp.dto.request.UserCredentialsRequestDTO;
import com.asj.suppliersApp.dto.request.UserRequestDTO;
import com.asj.suppliersApp.dto.response.UserResponseDTO;
import com.asj.suppliersApp.dto.response.UserValidationResponseDTO;

import java.util.Optional;

public interface UsersService {
    Optional<UserResponseDTO> createUser(UserRequestDTO request);
    UserValidationResponseDTO validateUser(UserCredentialsRequestDTO request);
    Optional<UserResponseDTO> loginUser (UserCredentialsRequestDTO request);
    Boolean checkUsernameExists(UserCredentialsRequestDTO request);

}
