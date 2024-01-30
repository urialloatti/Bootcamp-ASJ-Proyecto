package com.asj.suppliersApp.services.imp;

import com.asj.suppliersApp.dto.request.UserCredentialsRequestDTO;
import com.asj.suppliersApp.dto.request.UserRequestDTO;
import com.asj.suppliersApp.dto.response.UserResponseDTO;
import com.asj.suppliersApp.dto.response.UserValidationResponseDTO;
import com.asj.suppliersApp.entities.User;
import com.asj.suppliersApp.entities.UserRol;
import com.asj.suppliersApp.mappers.UserMapper;
import com.asj.suppliersApp.repositories.UserRepository;
import com.asj.suppliersApp.repositories.UserRolRepository;
import com.asj.suppliersApp.services.UsersService;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class UsersServiceImp implements UsersService {
    private final UserRepository userRep;
    private final UserRolRepository rolRep;

    public UsersServiceImp(UserRepository userRep, UserRolRepository rolRep) {
        this.userRep = userRep;
        this.rolRep = rolRep;
    }

    @Override
    public Optional<UserResponseDTO> createUser(UserRequestDTO request) {
        User user = UserMapper.getUserFromRequest(request);
        Optional<UserRol> rol;
        if (request.getRolId() == null) rol = this.rolRep.findById(2);
         else rol = this.rolRep.findById(request.getRolId());
        if (rol.isPresent()) user.setRol(rol.get());
        user.setAvailable(true);
        user.setCreatedAt(new Date());
        user.setUpdatedAt(new Date());
        user = userRep.save(user);
        return Optional.of(UserMapper.getUserResponse(user));
    }

    @Override
    public UserValidationResponseDTO validateUser(UserCredentialsRequestDTO request) {
        Optional<User> optUser = this.userRep.findByUsernameAndPasswordHash(request.getUsername(), request.getPasswordHash());
        if (optUser.isEmpty()){
            return new UserValidationResponseDTO(false);
        }
        return new UserValidationResponseDTO(true);
    }

    @Override
    public Optional<UserResponseDTO> loginUser(UserCredentialsRequestDTO request) {
        Optional<User> optUser = this.userRep.findByUsernameAndPasswordHash(request.getUsername(), request.getPasswordHash());
        if (optUser.isEmpty()){
            return Optional.empty();
        }
        return Optional.of(UserMapper.getUserResponse(optUser.get()));
    }

    @Override
    public Boolean checkUsernameExists(UserCredentialsRequestDTO request) {
        return this.userRep.existsByUsername(request.getUsername());
    }
}
