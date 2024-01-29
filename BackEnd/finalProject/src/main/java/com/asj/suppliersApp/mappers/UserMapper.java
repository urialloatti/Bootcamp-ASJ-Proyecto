package com.asj.suppliersApp.mappers;

import com.asj.suppliersApp.dto.request.UserRequestDTO;
import com.asj.suppliersApp.dto.response.UserResponseDTO;
import com.asj.suppliersApp.entities.User;

public class UserMapper {
    public static UserResponseDTO getUserResponse(User user){
        UserResponseDTO response = new UserResponseDTO();
        response.setId(user.getId());
        response.setName(user.getName());
        response.setUsername(user.getUsername());
        response.setSurname(user.getSurname());
        response.setEmail(user.getEmail());
        response.setRol(user.getRol().getRol());
        return response;
    }

    public static User getUserFromRequest(UserRequestDTO request) {
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPasswordHash(request.getPasswordHash());
        user.setEmail(request.getEmail());
        user.setName(request.getName());
        user.setSurname(request.getSurname());
        return user;
    }
}
